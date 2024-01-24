namespace :urhouse do
  desc 'Scrape urhouse.com.au for properties'
  task scrape: :environment do
    require 'net/http'
    require 'json'
    require 'yaml'
    require 'base64'

    config = YAML.load_file('config/config.yml').with_indifferent_access[:seed]

    filter = {
      type:"residential",
      city: config.dig(:city),
      dist: config.dig(:districts) || [],
      rent: {
        min: config.dig(:rent, :min), 
        max: config.dig(:rent, :max)
      },
      residential: {
        total_room: {
          max: config.dig(:beds),
        }
      }
    }

    endoded_filter = encode_filter(filter)
    base_url = "#{config[:base_url]}?filter=#{endoded_filter}"

    current_page = 1
    last_page = 1
    properties_data = []

    while current_page <= last_page
      success, last_page, properties = scrape_page(base_url, current_page)
      Rails.logger.info("Scraped page #{current_page} of #{last_page}")

      unless success
        Rails.logger.error("Failed to scrape page #{current_page}")
        break
      end

      properties_data += properties

      current_page += 1

      # sleep for 1 second to avoid being blocked
      sleep(0.3)
    end
    
    
    # Save data to a file
    Rails.logger.info("Saving #{properties_data.count} properties to file")
    output_file = "tmp/properties.json"
    File.delete(output_file) if File.exist?(output_file)
    File.open(output_file, 'w') do |file|
      file.write(JSON.pretty_generate(properties_data))
    end
  end
end

def scrape_page(base_url, current_page)
  search_params = {
    page: current_page,
    # ordering: "price",
    direction: "ASC",
    mode: "list"
  }

  query_string = to_query_string(search_params)
  url = "#{base_url}&#{query_string}"

  uri = URI(url)
  response = Net::HTTP.get(uri)
  response = JSON.parse(response).with_indifferent_access

  success = response[:success]
  unless success
    Rails.logger.error("Failed to scrape page #{current_page}: #{response[:message]}")
    return [success, 0, nil] unless success
  end

  raw_properties = response.dig(:data, :items)
  pagination = response.dig(:data, :pagination)
  pagination = pagination.present? ? pagination : {}
  
  last_page = pagination.keys.map(&:to_s).map(&:to_i).max || 0

  sorted_properties = raw_properties.sort_by { |pr| -pr[:rent].to_i }
  properties = parse_properties(sorted_properties.sample(6))

  [success, last_page, properties]
end

def parse_properties(properties)
  properties.map do |property|
    {
      id: property[:id],
      title: property[:title],
      rent_amount: property[:rent].to_i,

      city: property[:city],
      district: property[:dist],
      road: property[:road],
      mrt: property[:mrt_line],
      thumbnail_url: property[:image_url],
      bedrooms: property[:total_room].to_i,
    }
  end
end

def gen_pages_array(pagination)
  total_pages = pagination.key("last").to_i || 2
  (2..total_pages).to_a
end


def encode_filter(hash)
  # stringify hash
  str_filter = hash.to_json

  # url encode string
  str_filter = CGI.escapeURIComponent(str_filter)

  # base64 encode string
  str_filter = Base64.strict_encode64(str_filter)
end

def to_query_string(params)
    params.map { |key, value| "#{CGI.escape(key.to_s)}=#{CGI.escape(value.to_s)}" }.join('&')
end


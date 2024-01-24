module Paginated
  extend ActiveSupport::Concern

  included do
    include Pagy::Backend
      
    def pagee(collection, list_metadata = {})
      page = list_metadata[:page] || 1
      per_page = [list_metadata[:per_page] || 10, 100].min
      meta, items = pagy(collection, items: per_page, page: page)

      {
        metadata: {
          page: meta.page,
          per_page: per_page,
          total_pages: meta.pages,
          total: meta.count,
        },
        data: items
      }
    end
  end
end

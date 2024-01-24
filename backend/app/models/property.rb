class Property < ApplicationRecord
  belongs_to :currency
  belongs_to :address

  accepts_nested_attributes_for :address


  has_many :favorite_properties
end

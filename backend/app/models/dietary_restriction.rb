class DietaryRestriction < ApplicationRecord
    has_many :members, through: :member_diets
    has_many :member_diets

    validates :item_name, presence: true
end

class DietaryRestriction < ApplicationRecord
    has_many :members, through: :member_diets
    has_many :member_diets

    validates :item_name, presence: true
    validates :item_name, format: { without: /[^a-zA-Z]/, message: "can only contain letters" }
end

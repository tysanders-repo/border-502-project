require "date"

class Member < ApplicationRecord
    has_many :project_members, dependent: :destroy, foreign_key: "uin", primary_key: "uin"
    has_many :projects, through: :project_members
    
    has_many :member_diets, dependent: :destroy, foreign_key: "uin", primary_key: "uin"
    has_many :dietary_restrictions, through: :member_diets

    has_many :member_interests, dependent: :destroy, foreign_key: "uin", primary_key: "uin"
    has_many :interests, through: :member_interests

    before_validation :set_default_values, on: :create

    validates :uin, presence: true, uniqueness: true
    validates :first_name, :last_name, :major, :year, :phone, :birthday, presence: true

    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :tshirt_size, presence: true, inclusion: { in: %w[XS S M L XL XXL], message: "%{value} is not a valid size" }

    def set_default_values
        self.archived ||= false
        self.accepted ||= false
        self.join_date ||= Date.today
        self.paid_dues ||= false
        self.role ||= "member"
    end
end

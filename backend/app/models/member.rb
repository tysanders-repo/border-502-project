class Member < ApplicationRecord
    has_many :project, through: :project_members
    has_many :project_members
    
    validates :uin, presence: true, uniqueness: true
    validates :name, :role, :major, :year, :phone, :paid_dues, :join_date, :aggie_ring_day, :birthday, :graduation_day, :archived, :accepted, presence: true
    validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :tshirt_size, presence: true, inclusion: { in: %w(XS S M L XL XXL), message: "%{value} is not a valid size" }
end

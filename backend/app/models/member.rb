class Member < ApplicationRecord
    validates :uin, presence: true, uniqueness: true
    validates :name, presence: true
    validates :role, presence: true
    validates :major, presence: true
    validates :year, presence: true
    validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :phone, presence: true
    validates :tshirt_size, presence: true, inclusion: { in: %w(S M L XL XXL), message: "%{value} is not a valid size" }
    validates :paid_dues, presence: true
    validates :join_date, presence: true
    validates :aggie_ring_day, presence: true
    validates :birthday, presence: true
    validates :graduation_day, presence: true
    validates :archived, presence: true
    validates :accepted, presence: true
    validates :accomplishments, presence: true
end

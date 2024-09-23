class Interest < ApplicationRecord
    has_many :members, through: :member_interests
    has_many :member_interests

    validates :interest_type, inclusion: { in: %w(career company personal), message: "%{value} is not a valid interest type"}, presence: true
    validates :name, presence: true
end

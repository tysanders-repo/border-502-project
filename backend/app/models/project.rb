class Project < ApplicationRecord
    has_many :member
    validates :title, presence: true
end

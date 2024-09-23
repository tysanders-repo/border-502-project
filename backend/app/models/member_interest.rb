class MemberInterest < ApplicationRecord
    belongs_to :member, foreign_key: :uin
    belongs_to :interest

    validates :uin, :interest_id, presence: true
end

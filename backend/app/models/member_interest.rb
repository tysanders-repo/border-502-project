class MemberInterest < ApplicationRecord
    belongs_to :member, foreign_key: :uin
    belongs_to :interest, foreign_key: :interest_id

    validates :uin, :interest_id, presence: true
end

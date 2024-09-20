class MemberDiet < ApplicationRecord
    belongs_to :member, foreign_key: :uin
    belongs_to :dietary_restriction, foreign_key: :item_id

    validates :uin, :item_id, presence: true
end

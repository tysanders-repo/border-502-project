class ProjectMember < ApplicationRecord
    belongs_to :member, foreign_key: :uin
    belongs_to :project

    validates :uin, :project_id, presence: true
end

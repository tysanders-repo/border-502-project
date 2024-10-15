class ProjectMember < ApplicationRecord
    belongs_to :member, foreign_key: :uin
    belongs_to :project, foreign_key: :project_id

    validates :uin, :project_id, presence: true
end

class Project < ApplicationRecord
    has_many :members, through: :project_members
    has_many :project_members

    has_many_attached :images

    def image_urls
        images.map { |image| Rails.application.routes.url_helpers.rails_blob_url(image, only_path: false) }
    end
        
    validates :title, :description, presence: true
end

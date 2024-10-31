class Project < ApplicationRecord
    has_many :project_members, dependent: :destroy, foreign_key: "project_id", primary_key: "id"
    has_many :members, through: :project_members

    has_many_attached :images

    def image_urls
        images.map do |image|
          {
            id: image.id,
            url: Rails.application.routes.url_helpers.rails_blob_url(image, only_path: false)
          }
        end
      end


    validates :title, :description, presence: true
end

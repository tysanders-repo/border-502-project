class ProjectsController < ApplicationController
  # skip_before_action :authenticate_request, only: [:show, :index]
  skip_before_action :authenticate_request
  before_action :set_project, only: %i[show update destroy]

  # GET /projects
  def index
    @projects = Project.includes(:members).all

    render json: @projects.as_json(
      methods: :image_urls, # Include project image URLs
      include: {
        members: {
          only: [ :uin, :first_name, :last_name, :email ]
        }
      }
    )
  end
  # GET /projects/1
  def show
    @project = Project.includes(:members).find(params[:id])

    render json: @project.as_json(
      methods: :image_urls,
      include: {
        members: {
          only: [ :uin, :first_name, :last_name, :email ]
        }
      }
    )
  end

  # POST /projects
  def create
    @project = Project.new(project_params)

    if @project.save
      render json: @project.as_json(methods: :image_urls), status: :created, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  def update
    # Find the project
    @project = Project.find(params[:id])

    Rails.logger.debug("Received params: #{params.inspect}")
    
    # Parse and set timeline data
    if params[:project][:timeline].present?
      timeline_data = params[:project][:timeline].map do |milestone|
        JSON.parse(milestone) rescue milestone # Parse each milestone JSON or keep as is if already parsed
      end
      params[:project][:timeline] = timeline_data
    end
    
    # Attempt to update the project attributes (excluding images and remove_images)
    if @project.update(project_params.except(:images, :remove_images))


      # Attach new images if present
      if params[:project][:images].present?
        params[:project][:images].each do |image|
          @project.images.attach(image) if image.is_a?(ActionDispatch::Http::UploadedFile)
        end
      end

      # Remove specified images using their blob IDs
      if params[:project][:remove_images].present?
        params[:project][:remove_images].each do |blob_id|
          # Find the attachment by blob ID
          attachment = @project.images.attachments.find_by(blob_id: blob_id)

          # Check if the attachment exists
          if attachment
            # Purge the attachment (removes from active_storage_attachments and active_storage_blobs)
            attachment.purge
          else
            Rails.logger.warn("Attachment not found for blob ID: #{blob_id}")
          end
        end
      end

      render json: @project.as_json(methods: :image_urls)
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
    head :no_content # Use head to indicate successful deletion
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def project_params
    params.require(:project).permit(:title, :description, :date, timeline: [:id, :date, :title, :status], images: [], remove_images: [])
  end
end

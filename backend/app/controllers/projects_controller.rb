class ProjectsController < ApplicationController
  before_action :set_project, only: %i[show update destroy]

  # GET /projects
  def index
    @projects = Project.all

    render json: @projects.as_json(methods: :image_urls) # Include image URLs in the index action
  end

  # GET /projects/1
  def show
    render json: @project.as_json(methods: :image_urls)
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

  # PATCH/PUT /projects/1
  def update
    if @project.update(project_params)
      render json: @project.as_json(methods: :image_urls) # Include image URLs in the update response
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
    params.require(:project).permit(:title, :description, :date, :timeline, images: [])
  end
end

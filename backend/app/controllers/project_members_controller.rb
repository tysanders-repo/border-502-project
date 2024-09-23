class ProjectMembersController < ApplicationController
  before_action :set_project_member, only: %i[ show update destroy ]

  # GET /project_members
  def index
    @project_members = ProjectMember.all

    render json: @project_members
  end

  # GET /project_members/1
  def show
    render json: @project_member
  end

  # POST /project_members
  def create
    @project_member = ProjectMember.new(project_member_params)

    if @project_member.save
      render json: @project_member, status: :created, location: @project_member
    else
      render json: @project_member.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /project_members/1
  def update
    if @project_member.update(project_member_params)
      render json: @project_member
    else
      render json: @project_member.errors, status: :unprocessable_entity
    end
  end

  # DELETE /project_members/1
  def destroy
    @project_member.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project_member
      @project_member = ProjectMember.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def project_member_params
      params.require(:project_member).permit(:uin, :project_id)
    end
end

class MembersController < ApplicationController
  before_action :set_member, only: %i[ show update destroy ]

  # GET /members
  def index
    @members = Member.all

    render json: @members
  end

  # GET /members/1
  def show
    render json: @member
  end

  # POST /members
  def create
    @member = Member.new(member_params)

    if @member.save
      render json: @member, status: :created, location: @member
    else
      render json: @member.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /members/1
  def update
    # case current_user_role
    # when 'president'
    #   permitted_params = president_member_params
    # when 'treasurer'
    #   permitted_params = treasurer_member_params
    # when 'vice_president'
    #   permitted_params = vice_president_member_params
    # else
    #   permitted_params = member_params
    # end

    permitted_params = member_params
  
    if @member.update(permitted_params)
      render json: @member
    else
      render json: @member.errors, status: :unprocessable_entity
    end
  end

  # DELETE /members/1
  def destroy
    @member.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_member
      @member = Member.find_by!(uin: params[:uin])
    end

    # Only allow a list of trusted parameters through.
    def member_params
      params.require(:member).permit(:uin, :name, :major, :year, :email, :phone, :tshirt_size, :aggie_ring_day, :birthday, :graduation_day)
    end

    # def vice_president_member_params
    #   params.require(:member).permit(:role, :accepted, :accomplishments)
    # end

    # def president_member_params
    #   params.require(:member).permit(:role, :archived, :accepted, :accomplishments)
    # end

    def treasurer_member_params
      params.require(:member).permit(:paid_dues)
    end

    def internal_relations_member_params
      params.require(:member).permit(:archived, :accepted)
    end

    def current_user_role
      #nothing yet, but should add later
    end
end

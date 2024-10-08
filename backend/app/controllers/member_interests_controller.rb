class MemberInterestsController < ApplicationController
  before_action :set_member_interest, only: %i[ show update destroy ]

  # GET /member_interests
  def index
    @member_interests = MemberInterest.all

    render json: @member_interests
  end

  # GET /member_interests/1
  def show
    render json: @member_interest
  end

  def by_uin_career
    @member_interests = MemberInterest.joins(:interest)
    .select('member_interests.id, member_interests.uin, member_interests.interest_id, interests.interest_type, interests.name')
    .where(uin: params[:uin], 'interests.interest_type': 'career')
    
    if @member_interests.present?
      render json: @member_interests
    else
      render json: { error: 'No career interests found for the specified UIN' }, status: :not_found
    end
  end

  def by_uin_company
    @member_interests = MemberInterest.joins(:interest)
    .select('member_interests.id, member_interests.uin, member_interests.interest_id, interests.interest_type, interests.name')
    .where(uin: params[:uin], 'interests.interest_type': 'company')
    
    if @member_interests.present?
      render json: @member_interests
    else
      render json: { error: 'No company interests found for the specified UIN' }, status: :not_found
    end
  end

  def by_uin_personal
    @member_interests = MemberInterest.joins(:interest)
    .select('member_interests.id, member_interests.uin, member_interests.interest_id, interests.interest_type, interests.name')
    .where(uin: params[:uin], 'interests.interest_type': 'personal')
    
    if @member_interests.present?
      render json: @member_interests
    else
      render json: { error: 'No personal interests found for the specified UIN' }, status: :not_found
    end
  end

  def delete_by_uin
    @member_interests = MemberInterest.where(uin: params[:uin])
  
    if @member_interests.present?
      @member_interests.destroy_all
      render json: { message: 'All member interests for the specified UIN have been deleted' }, status: :ok
    else
      render json: { error: 'No member interests found for the specified UIN' }, status: :not_found
    end
  end

  def exists
    @member_interest = MemberInterest.find_by(uin: params[:uin], interest_id: params[:interest_id])
  
    if @member_interest
      render json: { exists: true }, status: :ok
    else
      render json: { exists: false }, status: :ok
    end
  end

  # POST /member_interests
  def create
    @member_interest = MemberInterest.new(member_interest_params)

    if @member_interest.save
      render json: @member_interest, status: :created, location: @member_interest
    else
      render json: @member_interest.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /member_interests/1
  def update
    if @member_interest.update(member_interest_params)
      render json: @member_interest
    else
      render json: @member_interest.errors, status: :unprocessable_entity
    end
  end

  # DELETE /member_interests/1
  def destroy
    @member_interest.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_member_interest
      @member_interest = MemberInterest.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def member_interest_params
      params.require(:member_interest).permit(:uin, :interest_id)
    end
end

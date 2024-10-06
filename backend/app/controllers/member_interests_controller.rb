class MemberInterestsController < ApplicationController
  before_action :set_member_interest, only: %i[ show update destroy ]
  skip_before_action :authenticate_request, only: [:create]
  # GET /member_interests
  def index
    @member_interests = MemberInterest.all

    render json: @member_interests
  end

  # GET /member_interests/1
  def show
    render json: @member_interest
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

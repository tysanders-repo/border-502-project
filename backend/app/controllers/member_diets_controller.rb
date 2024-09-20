class MemberDietsController < ApplicationController
  before_action :set_member_diet, only: %i[ show update destroy ]

  # GET /member_diets
  def index
    @member_diets = MemberDiet.all

    render json: @member_diets
  end

  # GET /member_diets/1
  def show
    render json: @member_diet
  end

  # POST /member_diets
  def create
    @member_diet = MemberDiet.new(member_diet_params)

    if @member_diet.save
      render json: @member_diet, status: :created, location: @member_diet
    else
      render json: @member_diet.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /member_diets/1
  def update
    if @member_diet.update(member_diet_params)
      render json: @member_diet
    else
      render json: @member_diet.errors, status: :unprocessable_entity
    end
  end

  # DELETE /member_diets/1
  def destroy
    @member_diet.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_member_diet
      @member_diet = MemberDiet.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def member_diet_params
      params.require(:member_diet).permit(:uin, :item_id)
    end
end

class MemberDietsController < ApplicationController
  before_action :set_member_diet, only: %i[ show update destroy ]
  skip_before_action :authenticate_request
  # GET /member_diets
  def index
    @member_diets = MemberDiet.all

    render json: @member_diets
  end

  # GET /member_diets/1
  def show
    render json: @member_diet
  end

  def by_uin
    @member_diets = MemberDiet.joins(:dietary_restriction)
    .select('member_diets.id, member_diets.uin, member_diets.item_id, dietary_restrictions.item_name')
    .where(uin: params[:uin])
    
    if @member_diets.present?
      render json: @member_diets
    else
      render json: { error: 'No member diets found for the specified UIN' }, status: :not_found
    end
  end

  def delete_by_uin
    @member_diets = MemberDiet.where(uin: params[:uin])
  
    if @member_diets.present?
      @member_diets.destroy_all
      render json: { message: 'All member diets for the specified UIN have been deleted' }, status: :ok
    else
      render json: { error: 'No member diets found for the specified UIN' }, status: :not_found
    end
  end

  def exists
    @member_diet = MemberDiet.find_by(uin: params[:uin], item_id: params[:item_id])
  
    if @member_diet
      render json: { exists: true }, status: :ok
    else
      render json: { exists: false }, status: :ok
    end
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

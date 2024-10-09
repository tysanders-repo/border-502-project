class DietaryRestrictionsController < ApplicationController
  before_action :set_dietary_restriction, only: %i[ show update destroy ]
  skip_before_action :authenticate_request, only: [:create]
  # GET /dietary_restrictions
  def index
    @dietary_restrictions = DietaryRestriction.all

    render json: @dietary_restrictions
  end

  # GET /dietary_restrictions/1
  def show
    render json: @dietary_restriction
  end

  # POST /dietary_restrictions
  def create
    @dietary_restriction = DietaryRestriction.new(dietary_restriction_params)

    if @dietary_restriction.save
      render json: @dietary_restriction, status: :created, location: @dietary_restriction
    else
      render json: @dietary_restriction.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /dietary_restrictions/1
  def update
    if @dietary_restriction.update(dietary_restriction_params)
      render json: @dietary_restriction
    else
      render json: @dietary_restriction.errors, status: :unprocessable_entity
    end
  end

  # DELETE /dietary_restrictions/1
  def destroy
    @dietary_restriction.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dietary_restriction
      @dietary_restriction = DietaryRestriction.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def dietary_restriction_params
      params.require(:dietary_restriction).permit(:item_name)
    end
end

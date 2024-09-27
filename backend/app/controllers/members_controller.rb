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
    @member = Member.new(create_params)

    if @member.save
      render json: @member, status: :created, location: @member
    else
      render json: @member.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /members/1
  def update
    if @member.update(update_params)
      render json: @member
    else
      render json: @member.errors, status: :unprocessable_entity
    end
  end

  # DELETE /members/1
  def destroy
    if @member.archived
      # If the member is already archived, proceed with destroying the record
      @member.destroy!
    else
      # If the member is not archived, set archived to true instead of destroying
      @member.update!(archived: true)
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_member
      @member = Member.find_by!(uin: params[:uin])
    end

    # Only allow a list of trusted parameters through.
    def create_params
      params.require(:member).permit(:uin, :first_name, :last_name, :major, :year, :email, :phone, :tshirt_size, :aggie_ring_day, :birthday, :graduation_day)
    end

    def update_params
      case request.headers["Role"]
      when "president"
        params.require(:member).permit(:role, :archived, :accepted, :accomplishments)
      when "vice_president"
        params.require(:member).permit(:role, :accepted, :accomplishments)
      when "treasurer"
        params.require(:member).permit(:paid_dues)
      when "internal_relations"
        params.require(:member).permit(:archived, :accepted)
      else
        params.require(:member).permit(:uin, :first_name, :last_name, :major, :year, :email, :phone, :tshirt_size, :aggie_ring_day, :birthday, :graduation_day)
      end
    end
end

class MembersController < ApplicationController
  before_action :set_member, only: %i[ show update destroy ]
  # skip_before_action :authenticate_request
  # GET /members
  def index
    @members = Member.includes(
      member_interests: :interest,
      member_diets: :dietary_restriction 
    ).all
  
    members_with_grouped_interests = @members.map do |member|
      grouped_interests = member.member_interests.includes(:interest).group_by do |mi|
        mi.interest.interest_type
      end
      member.as_json(except: [:created_at, :updated_at]).merge(
          interests: grouped_interests.transform_values do |interests|
            interests.map { |mi| { id: mi.interest.id, name: mi.interest.name } }
          end,
          dietary_restrictions: member.member_diets.map do |diet|
            { id: diet.dietary_restriction.id, item_name: diet.dietary_restriction.item_name }
          end
        )
    end
  
    render json: members_with_grouped_interests
  end
  
  # GET /members/1
  def show
    @member = Member.includes(
      member_interests: :interest,
      member_diets: :dietary_restriction
    ).find(params[:uin])
  
    grouped_interests = @member.member_interests.includes(:interest).group_by do |mi|
      mi.interest.interest_type
    end
  
    # Directly include member data along with grouped interests and dietary restrictions
    member_with_details = @member.as_json(except: [:created_at, :updated_at]).merge(
      interests: grouped_interests.transform_values do |interests|
        interests.map { |mi| { id: mi.interest.id, name: mi.interest.name } }
      end,
      dietary_restrictions: @member.member_diets.map do |diet|
        { id: diet.dietary_restriction.id, item_name: diet.dietary_restriction.item_name }
      end
    )
  
    render json: member_with_details
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

  # GET /member/role
  def role
    render json: @current_member
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
        params.require(:member).permit(:role, :archived, :accepted, :accomplishments, :paid_dues)
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

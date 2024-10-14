require 'rails_helper'

RSpec.describe Member, type: :model do
  let(:member) { Member.new(valid_attributes) }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(member).to be_valid
    end

    it "is not valid without a UIN" do
      member.uin = nil
      expect(member).not_to be_valid
    end

    it "is not valid without a first name" do
      member.first_name = nil
      expect(member).not_to be_valid
    end

    it "is not valid without a last name" do
      member.last_name = nil
      expect(member).not_to be_valid
    end

    it "is not valid without a major" do
      member.major = nil
      expect(member).not_to be_valid
    end

    it "is not valid without a year" do
      member.year = nil
      expect(member).not_to be_valid
    end

    it "is not valid without a phone number" do
      member.phone = nil
      expect(member).not_to be_valid
    end

    it "is not valid without an email" do
      member.email = nil
      expect(member).not_to be_valid
    end

    it "is not valid with an invalid email format" do
      member.email = "invalid_email"
      expect(member).not_to be_valid
    end

    it "is not valid without a t-shirt size" do
      member.tshirt_size = nil
      expect(member).not_to be_valid
    end

    it "is not valid with an invalid t-shirt size" do
      member.tshirt_size = "invalid_size"
      expect(member).not_to be_valid
    end

    it "is not valid with a duplicate UIN" do
      Member.create!(valid_attributes) # Create a member to test against
      member.uin = 123456789
      expect(member).not_to be_valid
    end
  end

  describe "associations" do
    it "has many projects through project_members" do
      association = described_class.reflect_on_association(:projects)
      expect(association.macro).to eq :has_many
    end

    it "has many project_members" do
      association = described_class.reflect_on_association(:project_members)
      expect(association.macro).to eq :has_many
    end

    it "has many dietary_restrictions through member_diets" do
      association = described_class.reflect_on_association(:dietary_restrictions)
      expect(association.macro).to eq :has_many
    end

    it "has many member_diets" do
      association = described_class.reflect_on_association(:member_diets)
      expect(association.macro).to eq :has_many
    end

    it "has many interests through member_interests" do
      association = described_class.reflect_on_association(:interests)
      expect(association.macro).to eq :has_many
    end

    it "has many member_interests" do
      association = described_class.reflect_on_association(:member_interests)
      expect(association.macro).to eq :has_many
    end
  end

  describe "default values" do
    it "sets default values on create" do
      member.save
      expect(member.archived).to be_falsey
      expect(member.accepted).to be_falsey
      expect(member.join_date).to eq(Date.today)
      expect(member.paid_dues).to be_falsey
      expect(member.role).to eq("member")
    end
  end

  # Define valid attributes for the member
  def valid_attributes
    {
      uin: 123456789,
      first_name: "John",
      last_name: "Doe",
      major: "Computer Science",
      year: "Senior",
      phone: "123-456-7890",
      email: "john@example.com",
      tshirt_size: "M",
      aggie_ring_day: Date.today,
      birthday: Date.today,
      graduation_day: Date.today,
      archived: false,
      accepted: false,
      join_date: Date.today,
      paid_dues: false,
      role: "member"
    }
  end
end

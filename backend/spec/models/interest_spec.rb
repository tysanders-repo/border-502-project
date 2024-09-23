require 'rails_helper'

RSpec.describe Interest, type: :model do
  let(:interest) { Interest.new(valid_attributes) }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(interest).to be_valid
    end

    it "is not valid without an interest_type" do
      interest.interest_type = nil
      expect(interest).not_to be_valid
    end

    it "is not valid with an invalid interest_type" do
      interest.interest_type = "invalid_type"
      expect(interest).not_to be_valid
    end

    it "is not valid without a name" do
      interest.name = nil
      expect(interest).not_to be_valid
    end
  end

  describe "associations" do
    it "has many members through member_interests" do
      association = described_class.reflect_on_association(:members)
      expect(association.macro).to eq :has_many
    end

    it "has many member_interests" do
      association = described_class.reflect_on_association(:member_interests)
      expect(association.macro).to eq :has_many
    end
  end

  # Define valid attributes for the interest
  def valid_attributes
    {
      interest_type: "career",
      name: "Software Development"
    }
  end
end


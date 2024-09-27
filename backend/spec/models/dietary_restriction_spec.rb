require 'rails_helper'

RSpec.describe DietaryRestriction, type: :model do
  let(:dietary_restriction) { DietaryRestriction.new(valid_attributes) }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(dietary_restriction).to be_valid
    end

    it "is not valid without an item_name" do
      dietary_restriction.item_name = nil
      expect(dietary_restriction).not_to be_valid
    end

    it "is not valid with item_name containing numbers or special characters" do
      dietary_restriction.item_name = "Peanut123"
      expect(dietary_restriction).not_to be_valid
      expect(dietary_restriction.errors[:item_name]).to include("can only contain letters")
    end

    it "is valid with item_name containing only letters" do
      dietary_restriction.item_name = "Peanut"
      expect(dietary_restriction).to be_valid
    end
  end

  describe "associations" do
    it "has many members through member_diets" do
      association = described_class.reflect_on_association(:members)
      expect(association.macro).to eq :has_many
    end

    it "has many member_diets" do
      association = described_class.reflect_on_association(:member_diets)
      expect(association.macro).to eq :has_many
    end
  end

  # Define valid attributes for the dietary restriction
  def valid_attributes
    {
      item_name: "Peanut"
    }
  end
end

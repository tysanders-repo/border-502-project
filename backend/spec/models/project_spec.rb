require 'rails_helper'

RSpec.describe Project, type: :model do
  let(:project) { Project.new(valid_attributes) }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(project).to be_valid
    end

    it "is not valid without a title" do
      project.title = nil
      expect(project).not_to be_valid
    end

    it "is not valid without a description" do
      project.description = nil
      expect(project).not_to be_valid
    end
  end

  describe "associations" do
    it "has many members through project_members" do
      association = described_class.reflect_on_association(:members)
      expect(association.macro).to eq :has_many
    end

    it "has many project_members" do
      association = described_class.reflect_on_association(:project_members)
      expect(association.macro).to eq :has_many
    end
  end

  # Define valid attributes for the project
  def valid_attributes
    {
      title: "Sample Project",
      description: "This is a description of the sample project."
    }
  end
end


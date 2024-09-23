require "rails_helper"

RSpec.describe DietaryRestrictionsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/dietary_restrictions").to route_to("dietary_restrictions#index")
    end

    it "routes to #show" do
      expect(get: "/dietary_restrictions/1").to route_to("dietary_restrictions#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/dietary_restrictions").to route_to("dietary_restrictions#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/dietary_restrictions/1").to route_to("dietary_restrictions#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/dietary_restrictions/1").to route_to("dietary_restrictions#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/dietary_restrictions/1").to route_to("dietary_restrictions#destroy", id: "1")
    end
  end
end

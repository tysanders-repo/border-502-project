require "rails_helper"

RSpec.describe MemberInterestsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/member_interests").to route_to("member_interests#index")
    end

    it "routes to #show" do
      expect(get: "/member_interests/1").to route_to("member_interests#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/member_interests").to route_to("member_interests#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/member_interests/1").to route_to("member_interests#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/member_interests/1").to route_to("member_interests#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/member_interests/1").to route_to("member_interests#destroy", id: "1")
    end
  end
end

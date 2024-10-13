require "rails_helper"

RSpec.describe InterestsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/interests").to route_to("interests#index")
    end

    it "routes to #show" do
      expect(get: "/interests/1").to route_to("interests#show", id: "1")
    end

    it 'routes to #career_interests' do
      expect(get: '/interests/type/career').to route_to('interests#career_interests')
    end

    it 'routes to #company_interests' do
      expect(get: '/interests/type/company').to route_to('interests#company_interests')
    end

    it 'routes to #personal_interests' do
      expect(get: '/interests/type/personal').to route_to('interests#personal_interests')
    end

    it "routes to #create" do
      expect(post: "/interests").to route_to("interests#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/interests/1").to route_to("interests#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/interests/1").to route_to("interests#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/interests/1").to route_to("interests#destroy", id: "1")
    end
  end
end

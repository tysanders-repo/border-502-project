require "rails_helper"

RSpec.describe MemberDietsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/member_diets").to route_to("member_diets#index")
    end

    it "routes to #show" do
      expect(get: "/member_diets/1").to route_to("member_diets#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/member_diets").to route_to("member_diets#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/member_diets/1").to route_to("member_diets#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/member_diets/1").to route_to("member_diets#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/member_diets/1").to route_to("member_diets#destroy", id: "1")
    end

    it 'routes GET /member_diets/exists/:uin/:item_id to member_diets#exists' do
      expect(get: '/member_diets/exists/123/1').to route_to(
        controller: 'member_diets',
        action: 'exists',
        uin: '123',
        item_id: '1'
      )
    end

    it 'routes GET /member_diets/uin/:uin to member_diets#by_uin' do
      expect(get: '/member_diets/uin/123').to route_to(
        controller: 'member_diets',
        action: 'by_uin',
        uin: '123'
      )
    end

    it 'routes DELETE /member_diets/uin/:uin to member_diets#delete_by_uin' do
      expect(delete: '/member_diets/uin/123').to route_to(
        controller: 'member_diets',
        action: 'delete_by_uin',
        uin: '123'
      )
    end
  end
end

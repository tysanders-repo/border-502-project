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

    it 'routes GET /member_interests/exists/:uin/:interest_id to member_interests#exists' do
      expect(get: '/member_interests/exists/123/1').to route_to(
        controller: 'member_interests',
        action: 'exists',
        uin: '123',
        interest_id: '1'
      )
    end

    it 'routes GET /member_interests/uin/career/:uin to member_interests#by_uin_career' do
      expect(get: '/member_interests/uin/career/123').to route_to(
        controller: 'member_interests',
        action: 'by_uin_career',
        uin: '123'
      )
    end

    it 'routes GET /member_interests/uin/company/:uin to member_interests#by_uin_company' do
      expect(get: '/member_interests/uin/company/123').to route_to(
        controller: 'member_interests',
        action: 'by_uin_company',
        uin: '123'
      )
    end

    it 'routes GET /member_interests/uin/personal/:uin to member_interests#by_uin_personal' do
      expect(get: '/member_interests/uin/personal/123').to route_to(
        controller: 'member_interests',
        action: 'by_uin_personal',
        uin: '123'
      )
    end

    it 'routes DELETE /member_interests/uin/:uin to member_interests#delete_by_uin' do
      expect(delete: '/member_interests/uin/123').to route_to(
        controller: 'member_interests',
        action: 'delete_by_uin',
        uin: '123'
      )
    end
  end
end

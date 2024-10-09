class ApplicationController < ActionController::API
  include Authentication
  before_action :authenticate_request
end

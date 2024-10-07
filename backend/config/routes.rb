Rails.application.routes.draw do
  resources :member_diets
  resources :member_interests
  resources :interests
  resources :dietary_restrictions
  resources :project_members
  resources :projects
  resources :members, param: :uin
  namespace :api do
    resources :users
  end

  resources :member_diets do
    collection do
      get 'exists/:uin/:item_id', to: 'member_diets#exists', as: 'exists'
      get 'uin/:uin', to: 'member_diets#by_uin', as: 'by_uin'
      delete 'uin/:uin', to: 'member_diets#delete_by_uin', as: 'delete_by_uin'
    end
  end

  resources :member_interests do
    collection do
      get 'exists/:uin/:interest_id', to: 'member_interests#exists', as: 'exists'
      get 'uin/career/:uin', to: 'member_interests#by_uin_career', as: 'by_uin_career'
      get 'uin/company/:uin', to: 'member_interests#by_uin_company', as: 'by_uin_company'
      get 'uin/personal/:uin', to: 'member_interests#by_uin_personal', as: 'by_uin_personal'
      delete 'uin/:uin', to: 'member_interests#delete_by_uin', as: 'delete_by_uin'
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end

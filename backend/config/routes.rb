Rails.application.routes.draw do
  devise_for(:users, 
  path: '', 
  path_names: {
    sign_in: 'api/v1/login',
    sign_out: 'api/v1/login',
    registration: 'api/v1/signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  },
  defaults: { format: :json }
  )
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  
  mount API::Base, at: "/"

  # Defines the root path route ("/")
  # root "posts#index"
end

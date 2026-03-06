Rails.application.routes.draw do
  devise_for :users,
    path: "api/v1/auth",
    path_names: {
      sign_in: "sign_in",
      sign_out: "sign_out",
      registration: "sign_up"
    },
    controllers: {
      sessions: "api/v1/auth/sessions",
      registrations: "api/v1/auth/registrations"
    }

  namespace :api do
    namespace :v1 do
      namespace :auth do
        get "me", to: "users#me"
      end

      resources :cocktails, only: [:index, :show, :create, :update, :destroy] do
        collection do
          get :random
        end
        member do
          post :upload_image
        end
      end
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end

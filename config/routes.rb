Rails.application.routes.draw do
  resources :examples
  resources :projects, constraints: lambda {|req| req.format == :json}
  resources :employees, constraints: lambda {|req| req.format == :json}

  get "*path", to: "site#index"
  root 'site#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end

if Rails.env.production?
  Rack::Timeout.timeout = 20  # seconds
elsif Rails.env.development?
  Rack::Timeout.timeout = 600 # seconds
end

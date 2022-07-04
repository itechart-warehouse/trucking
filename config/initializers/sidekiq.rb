require 'sidekiq/web'

REDIS_DEFAULT_URL = ENV['REDIS_DEFAULT_URL']
REDIS_DEFAULT_NAMESPACE = ENV['REDIS_DEFAULT_NAMESPACE']

if Rails.env.production?
  Sidekiq::Web.use Rack::Auth::Basic do |username, password|
    ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(username),
                                                ::Digest::SHA256.hexdigest(ENV['SIDEKIQ_WEB_USERNAME'])) &
      ActiveSupport::SecurityUtils.secure_compare(::Digest::SHA256.hexdigest(password),
                                                  ::Digest::SHA256.hexdigest(ENV['SIDEKIQ_WEB_PASSWORD']))
  end
end

Sidekiq.configure_server do |config|
  config.redis = { url: ENV.fetch('REDIS_URL', REDIS_DEFAULT_URL),
                   namespace: ENV.fetch('REDIS_NAMESPACE', REDIS_DEFAULT_NAMESPACE) }
end

Sidekiq.configure_client do |config|
  config.redis = { url: ENV.fetch('REDIS_URL', REDIS_DEFAULT_URL),
                   namespace: ENV.fetch('REDIS_NAMESPACE', REDIS_DEFAULT_NAMESPACE) }
end

# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.8'

gem 'active_model_serializers', '~> 0.10.0'
gem 'audited', '~> 4.9'
gem 'autoprefixer-rails'
gem 'bootsnap', '>= 1.10.1'
gem 'cancancan', '~> 3.3'
gem 'coffee-rails', '~> 4.2'
gem 'devise', '~> 4.8', '>= 4.8.1'
gem 'duktape'
gem 'hirb'
gem 'jbuilder', '~> 2.7'
gem 'msgpack', '1.4.3'
gem 'pg', '~> 1.2', '>= 1.2.3'
gem 'puma', '~> 3.11'
gem 'rack-cors'
gem 'rails', '~> 5.2.6'
gem 'react-rails'
gem 'sass-rails', '~> 5.0'
gem 'simplecov', require: false, group: :test
gem 'turbolinks', '~> 5'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'
# Rich text gem
gem 'actiontext', github: 'rails/actiontext', branch: 'archive', require: 'action_text'
gem 'bootstrap', '~> 4.0.0'
gem 'redis-namespace', '~> 1.5', '>= 1.5.2'
gem 'sidekiq', '~> 4.1', '>= 4.1.2'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails', '~> 6.2'
  gem 'rspec-rails', '~> 5.0.0'
end

group :development do
  gem 'letter_opener'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'rubocop', require: false
  gem 'rubocop-rails', require: false
  gem 'selenium-webdriver'
  gem 'webdrivers', '~> 5.0', require: false
end

group :production do
  gem 'exception_notification'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

gem 'bundler'

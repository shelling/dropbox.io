require "bundler/setup"
Bundler.require

class App < Sinatra::Base

    configure :development do
        register Sinatra::Reloader
    end

    register Sinatra::ConfigFile
    register Sinatra::RespondWith
    config_file "config/application.yml"

    set :database, YAML.load_file("config/database.yml")[ENV['RACK_ENV']].symbolize_keys

    Sequel.connect(settings.database.symbolize_keys)
    Sequel::Model.plugin :timestamps, :update_on_create => true
    Sequel::Model.plugin :validation_helpers

    enable :logging

    helpers do
        include Rack::Utils
        alias_method :h, :escape_html
    end

    helpers Sinatra::ContentFor

    not_found do
        "not found"
    end

    get "/" do
        haml :index
    end

end

["lib", "models", "workers", "routes"].each do |path|
    Dir["#{path}/*.rb"].each do |file|
        require_relative file
    end
end


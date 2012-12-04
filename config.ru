$:.unshift "."

require "environments"

map "/assets" do
    environment = Sprockets::Environment.new
    environment.append_path "assets/stylesheets"
    environment.append_path "assets/javascripts"
    run environment
end

run App

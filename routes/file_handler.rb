class App < Sinatra::Base

    get "/file/?" do
        json MogFile.all
    end

    get "/file/:uuid/?" do
        @mog_file = MogFile.where(mogkey: params[:uuid]).first
        if @mog_file
            @mog_file.to_json
        else
            not_found
        end
    end

    get "/file/:uuid/original" do
        @mog_file = MogFile.where(mogkey: params[:uuid]).first
        if @mog_file
            headers "X-REPROXY-URL"  => @mog_file.path[0],
                    "Content-Type"   => @mog_file.mimetype
        else
            not_found
        end
    end

    post "/file/?" do
        json params[:files].map { |f|
            @mogfile = MogFile.new(f)
            @mogfile.save
            @mogfile
        }
    end

    put "/file/:uuid" do
        @mog_file = MogFile.where(mogkey: params[:uuid]).first
        if @mog_file
            @mog_file.update JSON.parse(request.body.read).symbolize_keys
            1.to_json
        else
            not_found
        end
    end

    delete "/file/:uuid" do
        @mog_file = MogFile.where(mogkey: params[:uuid]).first
        if @mog_file
            @mog_file.destroy
            1.to_json
        else
            not_found
        end
    end

end

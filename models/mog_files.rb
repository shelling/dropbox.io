class MogFile < Sequel::Model

    attr_accessor :tempfile

    @@keyman = UUID.new
    @@mogclient = MogileFS::MogileFS.new(App.settings.mogilefs.symbolize_keys)

    def path
        @@mogclient.get_paths(self.mogkey)
    end

    def info
        @@mogclient.file_info(self.mogkey)
    end

    def initialize_set(attrs)
        self.mogkey   = @@keyman.generate
        self.tempfile = attrs[:tempfile]
        self.mimetype = attrs[:type]
        attrs.delete_if { |k,v| not self.class.columns.include? k }
        super
    end

    def before_save
        if tempfile
            @@mogclient.store_file(mogkey, nil, tempfile)
        end
        super
    end

    def before_destroy
        @@mogclient.delete(mogkey)
        super
    end

end

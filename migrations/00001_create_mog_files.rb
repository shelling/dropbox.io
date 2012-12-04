Sequel.migration do
    change do
        create_table :mog_files, :charset => :utf8 do
            primary_key :id
            String      :filename,      :null => false
            String      :mogkey,        :null => false,     :size => 36,    :uniq => true
            String      :mimetype,                          :size => 40
            DateTime    :created_at,    :null => false
            DateTime    :updated_at,    :null => false
        end
    end
end

DropboxIO.Model.File = Backbone.Model.extend({
    initialize: function() {
    },
    idAttribute: "mogkey",
    urlRoot: "/file",
    info: function() {
        if (this.get("mogkey")) {
            return _.extend( this.toJSON(), {
                original: this.url() + "/original"
            });
        }
    }
});

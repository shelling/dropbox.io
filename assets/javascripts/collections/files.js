DropboxIO.Collection.Files = Backbone.Collection.extend({
    initialize: function() {
    },
    model: DropboxIO.Model.File,
    url: "/file/list",
});

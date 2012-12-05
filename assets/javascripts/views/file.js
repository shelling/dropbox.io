DropboxIO.View.File = Backbone.View.extend({
    initialize: function() {
        $(".filelist").append(this.$el);
    },
    tagName: "li",
    render: function() {
        this.$el.html(
            DropboxIO.Template["file"](this.model.toJSON())
        );
    }
});

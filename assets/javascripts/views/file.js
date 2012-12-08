DropboxIO.View.File = Backbone.View.extend({
    initialize: function() {
        $(".filelist").append(this.$el);
    },
    tagName: "tr",
    events: {
        "click a.destroy": "destroy"
    },
    destroy: function(e) {
        e.preventDefault();
        var that = this;
        this.model.destroy({
            success: function(model, response) {
                that.$("td").fadeOut(1000, function() {
                    that.remove();
                });
            },
            error: function(model, xhr) {
            }
        });
    },
    render: function() {
        this.$el.html(
            DropboxIO.Template["file"](this.model.info())
        );
    }
});

var DropboxIO = {
    Model: {},
    Collection: {},
    View: {},
    Router: {},
    initialize: function() {
    }
};

DropboxIO.Model.File = Backbone.Model.extend({
    initialize: function() {
    },
});

DropboxIO.Collection.Files = Backbone.Collection.extend({
    initialize: function() {
    },
    model: DropboxIO.Model.File,
    url: "/file/list",
});

$(document).ready(function() {

    var FU = $("#fileupload");

    FU.fileupload({
        autoUpload: true,
        dataType: "json",
        multipart: true,
        type: "post",
        url: "/file",
        done: function(e, data) {
            new DropboxIO.Collection.Files(data.result).each(function(file) {
                $(".filelist").append(
                    $("<li>").html(file.get("filename"))
                );
            });
            $(this).find(".fileupload-progress")
                   .addClass("fade")
                   .find(".bar")
                   .css("width", "0%")
        },
        progressall: function(e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $(this).find(".fileupload-progress")
                   .removeClass("fade")
                   .find(".bar")
                   .css("width", progress + "%")
        }
    });

    // Get information of files have been uploaded
    FU.each(function () {
        new DropboxIO.Collection.Files().fetch({
            success: function(self, response) {
                self.each(function(file) {
                    $(".filelist").append(
                        $("<li>").html(file.get("filename"))
                    );
                });
            },
            error: function(self, xhr) {
            }
        });
    });

});

//=require handlebars.runtime
//=require handlebars
//=require dropboxio
//=require_tree ./models
//=require_tree ./collections
//=require_tree ../templates

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
                    DropboxIO.Template["file"](file.toJSON())
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
                        DropboxIO.Template["file"](file.toJSON())
                    );
                });
            },
            error: function(self, xhr) {
            }
        });
    });

});

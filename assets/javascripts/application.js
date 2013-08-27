//=require handlebars.runtime
//=require handlebars
//=require dropboxio
//=require_tree ./models
//=require_tree ./collections
//=require_tree ./views
//=require_tree ../templates

$(document).ready(function() {

    $.ajaxSetup({ cache: false });

    var FU = $("#fileupload");

    FU.fileupload({
        autoUpload: true,
        dataType: "json",
        multipart: true,
        type: "post",
        url: "/file",
        start: function(e) {
            this.ladda = this.ladda || Ladda.create($(this).find(".ladda-button")[0]);
            this.ladda.start();
        },
        fail: function(e) {
            this.ladda.stop();
        },
        done: function(e, data) {
            new DropboxIO.Collection.Files(data.result).each(function(file) {
                new DropboxIO.View.File({model: file}).render();
            });
            this.ladda.stop();
        },
        progressall: function(e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            this.ladda.setProgress(progress/100);
        }
    });

    // Get information of files have been uploaded
    FU.each(function () {
        new DropboxIO.Collection.Files().fetch({
            success: function(self, response) {
                self.each(function(file) {
                    new DropboxIO.View.File({model: file}).render();
                });
            },
            error: function(self, xhr) {
            }
        });
    });

});

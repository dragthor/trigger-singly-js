var AppRouter = Backbone.Router.extend({

    routes:{
        "":"signin",
        "signin": "signin",
        "overview": "overview",
        "settings": "settings"
    },

    initialize: function () {
        this.firstPage = true;
    },

    signin: function () {
        $.mobile.showPageLoadingMsg();

        var webView = this;

        webView.changePage(new TriggerSingly.Views.SignIn( {} ));

        $.mobile.hidePageLoadingMsg(); 
    },

    settings: function() {
        $.mobile.showPageLoadingMsg();

        var webView = this;

        var opts = { success: function() {
            webView.changePage(new TriggerSingly.Views.Settings( { profile: profile } ));

            $.mobile.hidePageLoadingMsg();
            
            }, error: function(err) {
                // Handle error.
                $.mobile.hidePageLoadingMsg();
            }
        };

        var profile = new TriggerSingly.Models.ProfileItems([], opts);
    },

    overview: function () {
        $.mobile.showPageLoadingMsg();

        var webView = this;

        var opts = { success: function() {
            webView.changePage(new TriggerSingly.Views.Overview( { friends: allfriends } ));

            $.mobile.hidePageLoadingMsg();

            }, error: function(err) {
                // Handle error.
                $.mobile.hidePageLoadingMsg();
            }
        };

        var allfriends = new TriggerSingly.Models.FriendItems([], opts);
    },

    changePage:function (page) {
        $(page.el).attr('data-role', 'page');

        page.render();
        
        $('body').append($(page.el));

        var transition = $.mobile.defaultPageTransition;
        
        // We don't want to fade the first page. Slide, and risk the annoying "jump to top".
        if (this.firstPage) {
            transition = "none";
            this.firstPage = false;
        }

        $.mobile.changePage($(page.el), { changeHash:false, transition: transition });
    }
});

$(document).ready(function () {
    TriggerSingly.Router = new AppRouter();

    Backbone.history.start();
});
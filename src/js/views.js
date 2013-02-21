TriggerSingly.Views.SignIn = Backbone.View.extend({

    render: function (eventName) {
        forge.topbar.setTitle("Sign In");
        forge.topbar.removeButtons(function() {}, function(err) {});

        var template = _.template($("#signInPage").html());

        $(this.el).html(template);

        forge.topbar.removeButtons(function() {}, function(err) {});
        
        return this;
    },

    events: {
        "tap #btnTwitter": "handleTwitter",
        "tap #btnFacebook": "handleFacebook"
    },

    handleTwitter: function (e) {
        e.preventDefault();

        TriggerSingly.Utils.SinglySignIn("twitter");
    },

    handleFacebook: function (e) {
        e.preventDefault();

        TriggerSingly.Utils.SinglySignIn("facebook");
    },

    initialize: function (options) {
        _.bindAll(this, "render");

        this.render();
    }
});

TriggerSingly.Views.Overview = Backbone.View.extend({
    friends: null,

    render: function (eventName) {
        forge.topbar.setTitle("Overview");
        forge.topbar.removeButtons(function() {}, function(err) {});

        var params = { friends: this.friends.models };
    
        var template = _.template($("#overviewPage").html(), params);

        $(this.el).html(template);

        forge.topbar.addButton({
            icon: "img/20-gear-2@2x.png",
            position: "right"
        }, function () {
            TriggerSingly.Router.navigate('settings', { trigger: true });
        });

        return this;
    },

    initialize: function (options) {
        _.bindAll(this, "render");

        this.friends = options.friends;
        this.render();
    }
});

TriggerSingly.Views.Settings = Backbone.View.extend({
    profile: null,

    render: function (eventName) {
        forge.topbar.setTitle("Settings");
        forge.topbar.removeButtons(function() {}, function(err) {});

        var params = { profiles: this.profile.models };

        var template = _.template($("#settingsPage").html(), params);

        $(this.el).html(template);
        
        forge.topbar.addButton({
            icon: "img/112-group@2x.png",
            position: "left"
        }, function () {
            TriggerSingly.Router.navigate('overview', { trigger: true });
        });

        return this;
    },

    events: {
        "tap #btnSignout": "handleSignout",
        "tap #btnTwitter": "handleTwitter",
        "tap #btnFacebook": "handleFacebook"
    },

    handleSignout: function (e) {
        e.preventDefault();

        $.mobile.showPageLoadingMsg();

        forge.prefs.clearAll(function() {
            $.mobile.hidePageLoadingMsg();

            TriggerSingly.Router.navigate('signin', { trigger: true });
        }, function(err) {
            // Todo: handle.
        });
    },

    handleTwitter: function (e) {
        e.preventDefault();

        TriggerSingly.Utils.SinglySignIn("twitter");
    },

    handleFacebook: function (e) {
        e.preventDefault();

        TriggerSingly.Utils.SinglySignIn("facebook");
    },

    initialize: function (options) {
        _.bindAll(this, "render");

        this.profile = options.profile;
        this.render();
    }
});
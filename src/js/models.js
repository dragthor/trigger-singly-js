TriggerSingly.Models.Friend = Backbone.Model.extend();

TriggerSingly.Models.FriendItems = Backbone.Collection.extend({

    model: TriggerSingly.Models.Friend,

    initialize: function(models, options) {
      var that = this;
      var success = options.success;
      var error = options.error;
      
      forge.prefs.get("singly.authToken", function(value) {
        var authToken = value;

        forge.request.get("https://api.singly.com/friends/all?limit=10&access_token=" + authToken,
          function(content) {
            that.add(content);
            success();
          },
          function(err) {
            error(err);
        });  
      }, function(err) {
          // Todo: handle storage fail accordingly.
      });
    }
});

TriggerSingly.Models.Profile = Backbone.Model.extend();

TriggerSingly.Models.ProfileItems = Backbone.Collection.extend({

    model: TriggerSingly.Models.Profile,

    initialize: function(models, options) {
      var that = this;
      var success = options.success;
      var error = options.error;

      forge.prefs.get("singly.authToken", function(value) {
        var authToken = value;

        forge.request.get("https://api.singly.com/profile?access_token=" + authToken,
          function(content) {
            that.add(content);
            success();
          },
          function(err) {
            error(err);
        });
      }, function(err) {
        // Todo: handle storage fail accordingly.
      });
    }
});
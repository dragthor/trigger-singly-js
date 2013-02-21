TriggerSingly.Utils.objectifyString = function (queryString) {
	var object = {};

    if (queryString == undefined) return object;
    if (queryString == null) return object;
    if (queryString.length === 0) return object;
    if ($.trim(queryString).length === 0) return object;

    try {
        var working = decodeURIComponent($.trim(queryString));

        if (working.charAt(0) == "#") {
            working = working.substring(1);
        } else {
            var question = working.indexOf("#");

            if (question > -1) {
                working = working.substring(question + 1);
            }
        }

        var keyValues = working.split("&");

        $.each(keyValues, function (index, value) {
            var objectProperty = value.split("=");

            var name = $.trim(objectProperty[0]);
            var value = $.trim(objectProperty[1]);

            if (value.length === 0) value = "";

            object[name] = value;
        });
    } catch (err) { }

    return object;
};

TriggerSingly.Utils.SinglySignIn = function(service) {
    // Build the Singly request.
    var surl = "https://api.singly.com/oauth/authorize?client_id=" + 
        TriggerSingly.Utils.Singly.ClientId + "&service=" + service + "&redirect_uri=" + 
        TriggerSingly.Utils.Singly.RedirectUrl + "&scope=" + 
        TriggerSingly.Utils.Singly.Scope + "&response_type=token";
    
    forge.tabs.openWithOptions({
        url: surl,
        pattern: TriggerSingly.Utils.Singly.SuccessPattern
    }, function (data) {
        try {
            var auth = TriggerSingly.Utils.objectifyString(data.url);

            if (auth['access_token'] != undefined && auth['account'] != undefined) {
                if (auth['access_token'].length > 0 && auth['account'].length > 0) {
                    // Todo: Save/create user account id using Parse.

                    // Save auth token as user prefs.
                    forge.prefs.set("singly.authToken", auth['access_token'], function() {
                        TriggerSingly.Router.navigate("overview", { trigger: true });
                    }, function(err) {
                        // Todo: Handle error.
                    });
                }
            }

            // Todo: Navigate to authorization failed view.
        } catch (err) {
            // Todo: Navigate to error view.
        }
    });
};
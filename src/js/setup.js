// {{ name }}
_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
    evaluate: /\{\{(.+?)\}\}/g
};

var TriggerSingly = {};

TriggerSingly.Utils = {};
TriggerSingly.Router = null;
TriggerSingly.Models = {};
TriggerSingly.Views = {};

TriggerSingly.Utils.Singly = {};
TriggerSingly.Utils.Singly.ClientId = "";
TriggerSingly.Utils.Singly.RedirectUrl = "http%3A%2F%2Fdragthor.github.com%2F";
TriggerSingly.Utils.Singly.Scope = "email";
TriggerSingly.Utils.Singly.SuccessPattern = "http://dragthor.github.com/*";
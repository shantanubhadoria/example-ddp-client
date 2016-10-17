"use strict";
var open_ddp_client_1 = require("open-ddp-client");
var websocket_1 = require("websocket");
var Meteor = (function () {
    function Meteor() {
    }
    Meteor.init = function (url) {
        if (url === void 0) { url = "ws://127.0.0.1:3000/websocket"; }
        var client = new websocket_1.client();
        var ddpClient = open_ddp_client_1.DDPClient.instance;
        ddpClient.keyValueStore = new Map();
        client.on("connectFailed", function (error) {
            return true;
        });
        client.on("connect", function (connection) {
            ddpClient.sendMessageCallback = function (message) {
                connection.sendUTF(message);
            };
            connection.on("message", function (message) {
                if (message.type === "utf8") {
                    ddpClient.subscription.next(message.utf8Data);
                }
            });
            Meteor.subscribe('meteor.loginServiceConfiguration');
            Meteor.subscribe('meteor_autoupdate_clientVersions');
            ddpClient.connected();
        });
        client.connect(url);
    };
    Meteor.collection = open_ddp_client_1.Collection;
    Meteor.subscribe = open_ddp_client_1.Subscriptions.instance.subscribe.bind(open_ddp_client_1.Subscriptions.instance);
    Meteor.unsubscribe = open_ddp_client_1.Subscriptions.instance.unsubscribe.bind(open_ddp_client_1.Subscriptions.instance);
    Meteor.call = open_ddp_client_1.Methods.instance.call.bind(open_ddp_client_1.Methods.instance);
    Meteor.loginWithPassword = open_ddp_client_1.Accounts.instance.loginWithPassword.bind(open_ddp_client_1.Accounts.instance);
    Meteor.AutoupdateClientVersions = new Meteor.collection("meteor_autoupdate_clientVersions");
    Meteor.AccountsLoginServiceConfigurations = new Meteor.collection("meteor_accounts_loginServiceConfigurations");
    Meteor.Users = new Meteor.collection("users");
    return Meteor;
}());
exports.Meteor = Meteor;
;

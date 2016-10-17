"use strict";
var meteor_1 = require("./meteor");
meteor_1.Meteor.init();
meteor_1.Meteor.loginWithPassword("shantanubhadoria", "hahanicetry", function () {
    console.log("Logged In");
    var Companies = new meteor_1.Meteor.collection("companies");
    meteor_1.Meteor.subscribe("companies");
    Companies.collection.subscribe(function (value) { return console.log(value); });
    meteor_1.Meteor.AutoupdateClientVersions.collection.subscribe(function (value) { return console.log(value); });
    meteor_1.Meteor.AccountsLoginServiceConfigurations.collection.subscribe(function (value) { return console.log(value); });
    meteor_1.Meteor.Users.collection.subscribe(function (value) { return console.log(value); });
});

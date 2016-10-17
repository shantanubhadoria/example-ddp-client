import { Meteor } from "./meteor";

Meteor.init();

Meteor.loginWithPassword("shantanubhadoria", "hahanicetry", () => {
  console.log("Logged In");

  let Companies = new Meteor.collection("companies");
  Meteor.subscribe("companies");
  Companies.collection.subscribe(value => console.log(value));
  Meteor.AutoupdateClientVersions.collection.subscribe(value => console.log(value));
  Meteor.AccountsLoginServiceConfigurations.collection.subscribe(value => console.log(value));
  Meteor.Users.collection.subscribe(value => console.log(value));
});

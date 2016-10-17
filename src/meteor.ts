import { Accounts, Collection, DDPClient, Methods, Subscriptions } from "open-ddp-client";
import { client as WebSocket } from "websocket";

export class Meteor {
  public static instance: Meteor;
  public static collection = Collection;

  public static subscribe = Subscriptions.instance.subscribe.bind(Subscriptions.instance);
  public static unsubscribe = Subscriptions.instance.unsubscribe.bind(Subscriptions.instance);

  public static call = Methods.instance.call.bind(Methods.instance);

  public static loginWithPassword = Accounts.instance.loginWithPassword.bind(Accounts.instance);

  // Collections
  public static AutoupdateClientVersions =  new Meteor.collection("meteor_autoupdate_clientVersions");
  public static AccountsLoginServiceConfigurations =  new Meteor.collection("meteor_accounts_loginServiceConfigurations");
  public static Users =  new Meteor.collection("users");

  public static init(url: string = "ws://127.0.0.1:3000/websocket") {
    let client = new WebSocket();
    let ddpClient = DDPClient.instance;

    ddpClient.keyValueStore = new Map<string, any>();

    client.on("connectFailed", (error) => {
      // Trigger error
      return true;
    });

    client.on("connect", (connection) => {
      ddpClient.sendMessageCallback = (message: string) => {
        connection.sendUTF(message);
      };

      connection.on("message", (message) => {
        if (message.type === "utf8") {
          ddpClient.subscription.next(message.utf8Data);
        }
      });

      Meteor.subscribe('meteor.loginServiceConfiguration');
      Meteor.subscribe('meteor_autoupdate_clientVersions');
      ddpClient.connected();

    });

    client.connect(url);
  }
};

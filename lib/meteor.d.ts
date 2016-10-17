import { Collection } from "open-ddp-client";
export declare class Meteor {
    static instance: Meteor;
    static collection: typeof Collection;
    static subscribe: any;
    static unsubscribe: any;
    static call: any;
    static loginWithPassword: any;
    static AutoupdateClientVersions: Collection;
    static AccountsLoginServiceConfigurations: Collection;
    static Users: Collection;
    static init(url?: string): void;
}

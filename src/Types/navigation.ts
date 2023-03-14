import {
    Category,
    Client,
    Resource
} from "rr-apilib";

export type NavigationParamList = {
    NavBar: { client: Client };
    Login: { client: Client };
    Register: { client: Client };
    ResourceDetails: { client: Client, resource: Resource };
    CategoryDetails: { client: Client, category: Category };
    CreateResourceScreen: { client: Client };
    EditResourceScreen: { client: Client, resource: Resource };
    Test: { client: Client };
    Resources: { client: Client };
    Categories: { client: Client };
    ShareResource: { client: Client };
    Profile: { client: Client };
}
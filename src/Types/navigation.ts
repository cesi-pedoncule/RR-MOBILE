import {
    Category,
    Client,
    Resource,
    User
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
    Users: { client: Client };
    UserDetails: { client: Client, user: User };
    SendResetPassword: { client: Client };
    AdminMenu: { client: Client };
    AdminUsers: { client: Client };
    AdminUser: { client: Client, user: User};
}
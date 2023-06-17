import React from "react";
import { View } from "react-native";
import TopbarStyles from "../../Styles/Components/Input/TopbarStyles";
import SearchBar from "./SearchBar";
import { Client } from "rr-apilib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "../Button/IconButton";

interface Props {
    onChangeSearch?: (text: string) => void;
    value?: string;
    hideSearchBar?: boolean;
    hideLogout?: boolean;
    hideHomeButton?: boolean;
    client?: Client;
    navigation: any;
}

export default function TopBar({onChangeSearch, value, hideSearchBar=false, hideLogout=true, hideHomeButton = true, client, navigation}: Props) {

    const onClickDisconnect = async () => {
        client?.auth.logout();
        // Remove token and refresh token from storage
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refresh_token');
        navigation.navigate('Login');
    }

    return (
        <View style={TopbarStyles.topBarBackground}>
            {
                !hideHomeButton ? <IconButton iconStyle={TopbarStyles.buttonBackground} callBack={() => navigation.navigate('Resources', { client })} iconSize={24} iconName={"bookshelf"}/>
                :
                <IconButton iconStyle={TopbarStyles.buttonBackground} callBack={() => navigation.navigate('Users', { client })} iconSize={24} iconName={"account-multiple"}/>
            }
            {
                !hideSearchBar && onChangeSearch && <SearchBar value={value} onChangeSearch={onChangeSearch}/>
            }
            {
                !hideLogout && <IconButton iconStyle={TopbarStyles.disconnectContainer} callBack={onClickDisconnect} iconSize={24} iconName={"logout"}/>
            }
        </View>
    );
}
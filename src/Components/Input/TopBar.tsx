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
    client?: Client;
    navigation: any;
}

export default function TopBar({onChangeSearch, value, hideSearchBar=false, hideLogout=true, client, navigation}: Props) {

    const onClickDisconnect = async () => {
        client?.auth.logout();
        // Remove token and refresh token from storage
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refresh_token');
        navigation.navigate('Login');
    }

    const onPressButton = () => {
        navigation.navigate('Resources', { client });
    }

    return (
        <View style={TopbarStyles.topBarBackground}>
            <IconButton iconStyle={TopbarStyles.btnHomeBackground} callBack={onPressButton} iconSize={24} iconName={"bookshelf"}/>
            {
                !hideSearchBar && onChangeSearch && <SearchBar value={value} onChangeSearch={onChangeSearch}/>
            }
            {
                !hideLogout && <IconButton iconStyle={TopbarStyles.disconnectContainer} callBack={onClickDisconnect} iconSize={24} iconName={"logout"}/>
            }
        </View>
    );
}
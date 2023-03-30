import React from "react";
import { View } from "react-native";
import TopbarStyles from "../../Styles/Components/Input/TopbarStyles";
import SearchBar from "./SearchBar";
import { Client } from "rr-apilib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "../Button/IconButton";

interface Props {
    onChangeSearch?: (text: string) => void;
    hideSearchBar?: boolean;
    hideLogout?: boolean;
    client?: Client;
    navigation: any;
}

export default function TopBar({onChangeSearch, hideSearchBar=false, hideLogout=true, client, navigation}: Props) {
    //const navigations = useNavigation<StackNavigationProp<TopBarStackParamList>>();

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
            <IconButton iconStyle={TopbarStyles.btnHomeBackground} iconCallBack={onPressButton} iconSize={24} iconName={"bookshelf"}/>
            {
                !hideSearchBar && onChangeSearch ? <SearchBar onChangeSearch={onChangeSearch} /> : null
            }
            {
                !hideLogout && (
                    <IconButton iconStyle={TopbarStyles.disconnectContainer} iconCallBack={onClickDisconnect} iconSize={24} iconName={"logout"}/>
                )
            }
        </View>
    );
}
import React from "react";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import TopbarStyles from "../../Styles/Components/Input/TopbarStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ResourcesButton from "../Button/ResourcesButton";
import SearchBar from "./SearchBar";
import { Client } from "rr-apilib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../Styles/Colors";

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

    return (
        <View style={TopbarStyles.topBarBackground}>
            <ResourcesButton style={TopbarStyles.btnHomeBackground} navigation={navigation}/>
            {
                !hideSearchBar && onChangeSearch ? <SearchBar onChangeSearch={onChangeSearch} /> : null
            }
            {
                !hideLogout && (
                    <TouchableOpacity style={TopbarStyles.disconnectContainer} onPress={onClickDisconnect}>
                        <MaterialCommunityIcons name="logout" size={24} color={COLORS.Black} />
                    </TouchableOpacity>
                )
            }
        </View>
    );
}
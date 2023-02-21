import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { TouchableHighlight, View } from "react-native";
import TopbarStyles from "../../Styles/Components/Input/TopbarStyles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeButton from "../Button/ResourcesButton";
import SearchBar from "./SearchBar";

interface Props {
    onChangeSearch?: (text: string) => void;
    hideSearchBar?: boolean;
    hideLogout?: boolean;
}

type TopBarStackParamList = {
    Login: undefined;
};

export default function TopBar({onChangeSearch, hideSearchBar=false, hideLogout=true}: Props) {
    const navigation = useNavigation<StackNavigationProp<TopBarStackParamList>>();

    const onClickDisconnect = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={TopbarStyles.topBarBackground}>
            <HomeButton style={TopbarStyles.btnHomeBackground}/>
            {
                !hideSearchBar && onChangeSearch ? <SearchBar onChangeSearch={onChangeSearch} /> : null
            }
            {
                !hideLogout && (
                    <TouchableHighlight style={TopbarStyles.disconnectContainer} underlayColor="#FFFFFF" onPress={onClickDisconnect}>
                        <MaterialCommunityIcons name="logout" size={24} color="black" />
                    </TouchableHighlight>
                )
            }
        </View>
    );
}
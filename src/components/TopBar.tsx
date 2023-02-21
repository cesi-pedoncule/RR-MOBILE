import React from "react";
import { View } from "react-native";
import TopbarStyles from "../styles/Component/TopbarStyles";
import HomeButton from "./Button/ResourcesButton";
import SearchBar from "./Input/SearchBar";

interface Props {
    hideSearchBar?: boolean;
}

export default function TopBar({hideSearchBar=false}: Props) {
    return (
        <View style={TopbarStyles.topBarBackground}>
            <HomeButton style={TopbarStyles.btnHomeBackground}/>
            {
                !hideSearchBar ? <SearchBar /> : null
            }
        </View>
    );
}
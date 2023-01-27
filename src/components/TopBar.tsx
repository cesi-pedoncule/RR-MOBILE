import React from "react";
import { View } from "react-native";
import TopbarStyles from "../styles/TopbarStyles";
import HomeButton from "./HomeButton";
import SearchBar from "./SearchBar";

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
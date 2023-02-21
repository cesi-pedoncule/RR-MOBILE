import React from "react";
import { View } from "react-native";
import TopbarStyles from "../styles/Component/TopbarStyles";
import HomeButton from "./Button/HomeButton";
import SearchBar from "./Input/SearchBar";

interface Props {
    onChangeSearch: (text: string) => void;
    hideSearchBar?: boolean;
}

export default function TopBar({onChangeSearch, hideSearchBar=false}: Props) {
    return (
        <View style={TopbarStyles.topBarBackground}>
            <HomeButton style={TopbarStyles.btnHomeBackground}/>
            {
                !hideSearchBar ? <SearchBar onChangeSearch={onChangeSearch} /> : null
            }
        </View>
    );
}
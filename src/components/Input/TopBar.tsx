import React from "react";
import { View } from "react-native";
import TopbarStyles from "../../styles/Component/Input/TopbarStyles";
import HomeButton from "../Button/ResourcesButton";
import SearchBar from "./SearchBar";

interface Props {
    onChangeSearch?: (text: string) => void;
    hideSearchBar?: boolean;
}

export default function TopBar({onChangeSearch, hideSearchBar=false}: Props) {
    return (
        <View style={TopbarStyles.topBarBackground}>
            <HomeButton style={TopbarStyles.btnHomeBackground}/>
            {
                !hideSearchBar && onChangeSearch ? <SearchBar onChangeSearch={onChangeSearch} /> : null
            }
        </View>
    );
}
import React from "react";
import { TextInput, View } from "react-native";
import TopbarStyles from "../../styles/Component/TopbarStyles";

export default function SearchBar() {
    return (
        <View style={TopbarStyles.searchBarBackground}>
            <TextInput placeholder='Rechercher' style={TopbarStyles.searchBar} />
        </View>
    );
}
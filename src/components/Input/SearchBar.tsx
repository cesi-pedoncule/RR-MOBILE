import React from "react";
import { TextInput, View } from "react-native";
import TopbarStyles from "../../styles/Component/TopbarStyles";

interface Props {
    onChangeSearch: (text: string) => void;
}

export default function SearchBar({onChangeSearch}: Props) {
    return (
        <View style={TopbarStyles.searchBarBackground}>
            <TextInput placeholder='Rechercher' style={TopbarStyles.searchBar} onChangeText={onChangeSearch} />
        </View>
    );
}
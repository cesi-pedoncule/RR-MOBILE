import React from "react";
import { TextInput, View } from "react-native";
import TopbarStyles from "../../Styles/Components/Input/TopbarStyles";

interface Props {
    value?: string;
    onChangeSearch: (text: string) => void;
}

export default function SearchBar({ value, onChangeSearch }: Props) {
    return (
        <View style={TopbarStyles.searchBarBackground}>
            <TextInput 
                placeholder='Rechercher' 
                style={TopbarStyles.searchBar} 
                onChangeText={onChangeSearch}
                value={value}
            />
        </View>
    );
}
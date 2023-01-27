import React from "react";
import { View, Text } from 'react-native'
import { Client } from "rr-apilib";
import NavBar from "../components/NavBar";
import commonStyles from "../styles/commonStyles";

export default function CategoriesScreen({ route }: any) {
    const client = route.params as Client;

    return (
        <View style={commonStyles.container}>
            <Text>CategoriesScreen</Text>
            <NavBar client={client}/>
        </View>
    )
}
import React from "react";
import { View, Text } from 'react-native'
import { Client } from "rr-apilib";
import NavBar from "../components/NavBar";
import commonStyles from "../styles/commonStyles";

export default function ProfilScreen({route}: any) {
    const client = route.params as Client;
    
    return (
        <View style={commonStyles.container}>
            <Text>ProfilScreen</Text>
            <NavBar client={client} />
        </View>
    )
}
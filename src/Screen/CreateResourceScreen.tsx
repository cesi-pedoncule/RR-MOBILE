import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CommonStyles from '../Styles/CommonStyles'
import TopBar from '../Components/Input/TopBar'
import NavBar from '../Components/NavBar'
import { Client } from 'rr-apilib'

export default function CreateResourceScreen({route} : any) {
    const client = route.params as Client;

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true}/>
            <View style={CommonStyles.content}>
                <ScrollView style={CommonStyles.scrollView}>
                    
                </ScrollView>
                <NavBar client={client}/>
            </View>
        </View>
    )
}
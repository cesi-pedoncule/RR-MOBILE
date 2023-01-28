import React, { useState } from "react";
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native'
import { Client } from "rr-apilib";
import NavBar from "../components/NavBar";
import commonStyles from "../styles/commonStyles";
import ButtonShowMoreItems from "../components/buttonShowMoreItems";
import ResourceCard from "../components/ResourceCard";
import TopBar from "../components/TopBar";

export default function RessourcesScreen({ route }: any) {
    const client = route.params as Client;
    const [showMoreItems, setShowMoreItems] = useState(false);
    const [resources, setResources] = useState(Array.from(client.resources.cache.values()));

    const onClickShowMoreItems = () => {
        setShowMoreItems(true);
    }

    return (
        <SafeAreaView style={commonStyles.container}>
            <TopBar />
            <Image source={require('../assets/rr-logo.png')} style={commonStyles.logo} />
            <View style={commonStyles.content}>
                <ScrollView style={commonStyles.resourcesContainer} contentContainerStyle={commonStyles.scrollViewCenter} >
                    {
                        resources.map((resource, i) => {
                            if (!showMoreItems && i < 6) {
                                return <ResourceCard title={resource.title} user={resource.user?.name} description={resource?.description} key={i}></ResourceCard>
                            } else if (showMoreItems) {
                                return <ResourceCard title={resource.title} user={resource.user?.name} description={resource?.description} key={i}></ResourceCard>
                            }
                        })
                    }
                    {
                        !showMoreItems ?
                        <ButtonShowMoreItems callBack={onClickShowMoreItems} />
                        : null
                    }
                </ScrollView>
            </View>
            <NavBar client={client} />
        </SafeAreaView>
    )
}
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { Client } from 'rr-apilib';
import ButtonShowMoreItems from '../components/buttonShowMoreItems';
import NavBar from '../components/NavBar';
import ResourceCard from '../components/ResourceCard';
import commonStyles from '../styles/commonStyles';

export default function HomeScreen({ route }: any) {
    const client = route.params as Client;
    const [showMoreItems, setShowMoreItems] = useState(false);
    const [resources, setResources] = useState(Array.from(client.resources.cache.values()));

    const onClickShowMoreItems = () => {
        setShowMoreItems(true);
    }

    return (
        <SafeAreaView style={commonStyles.container}>
            <Image source={require('../assets/rr-logo.png')} style={commonStyles.logo} />
            <View style={commonStyles.content}>
                <ScrollView style={commonStyles.resourcesContainer} contentContainerStyle={commonStyles.scrollViewCenter} >
                    {
                        resources.map((resource, i) => {
                            if (!showMoreItems && i < 6) {
                                return <ResourceCard resource={resource} key={i}></ResourceCard>
                            } else if (showMoreItems) {
                                return <ResourceCard resource={resource} key={i}></ResourceCard>
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
    );
};
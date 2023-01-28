import {
    Image,
    SafeAreaView,
    ScrollView,
    View
} from 'react-native';
import { Client } from 'rr-apilib';
import React, { useState } from 'react';

import NavBar from '../components/NavBar';
import commonStyles from '../styles/commonStyles';
import ResourceCard from '../components/ResourceCard';
import ButtonShowMoreItems from '../components/buttonShowMoreItems';

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
                                return <ResourceCard key={i} resource={resource} />
                            } else if (showMoreItems) {
                                return <ResourceCard key={i} resource={resource} />
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
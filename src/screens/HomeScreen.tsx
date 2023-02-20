import {
    Image,
    ScrollView,
    View
} from 'react-native';
import { Client, Resource } from 'rr-apilib';
import React, { useState } from 'react';

import NavBar from '../components/NavBar';
import commonStyles from '../styles/commonStyles';
import ResourceCard from '../components/Card/ResourceCard';
import ButtonShowMoreItems from '../components/Button/ButtonShowMoreItems';

export default function HomeScreen({ route }: any) {
    
    const client = route.params as Client;
    
    const [showMoreItems, setShowMoreItems] = useState<boolean>(false);
    const [resources, setResources] = useState<Resource[]>(Array.from(client.resources.cache.values()));

    const onClickShowMoreItems = () => {
        setShowMoreItems(true);
    }

    return (
        <View style={commonStyles.container}>
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
        </View>
    );
};
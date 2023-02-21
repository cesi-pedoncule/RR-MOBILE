import React, { useState } from "react";
import {
    View,
    Image,
    ScrollView
} from 'react-native'
import { Client, Resource } from "rr-apilib";

import NavBar from "../components/NavBar";
import commonStyles from "../styles/commonStyles";
import ButtonShowMoreItems from "../components/Button/ButtonShowMoreItems";
import ResourceCard from "../components/Card/ResourceCard";
import TopBar from "../components/TopBar";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type ResourcesStackParamList = {
    ResourceDetail: Resource;
}

export default function ResourcesScreen({ route }: any) {
    const navigation = useNavigation<StackNavigationProp<ResourcesStackParamList>>();
    
    const client = route.params as Client;
    const [showMoreItems, setShowMoreItems] = useState(false);
    const [resources, setResources] = useState(Array.from(client.resources.cache.values()));

    const onClickShowMoreItems = () => {
        setShowMoreItems(true);
    }

    return (
        <View style={commonStyles.container}>
            <TopBar />
            <Image source={require('../assets/rr-logo.png')} style={commonStyles.logo} />
            <View style={commonStyles.content}>
                <ScrollView style={commonStyles.resourcesContainer} contentContainerStyle={commonStyles.scrollViewCenter} >
                    {
                        resources.map((resource, i) => {
                            if (!showMoreItems && i < 6) {
                                return <ResourceCard key={i} resource={resource} callBack={() => navigation.navigate('ResourceDetail', resource)} />
                            } else if (showMoreItems) {
                                return <ResourceCard key={i} resource={resource} callBack={() => navigation.navigate('ResourceDetail', resource)} />
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
    )
}
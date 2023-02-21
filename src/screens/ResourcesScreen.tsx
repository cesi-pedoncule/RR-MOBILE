import React, { useState } from "react";
import { View, ScrollView } from 'react-native'
import { Client, Resource } from "rr-apilib";

import NavBar from "../components/NavBar";
import commonStyles from "../styles/commonStyles";
import ButtonShowMoreItems from "../components/Button/ButtonShowMoreItems";
import ResourceCard from "../components/Card/ResourceCard";
import TopBar from "../components/TopBar";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type ResourcesStackParamList = {
    ResourceDetails: Resource;
}

export default function ResourcesScreen({ route }: any) {
    const navigation = useNavigation<StackNavigationProp<ResourcesStackParamList>>();
    
    const client = route.params as Client;
    const [showMoreItems, setShowMoreItems] = useState<boolean>(false);
    const [resources, setResources] = useState<Resource[]>(Array.from(client.resources.cache.values()));

    const onClickShowMoreItems = () => {
        setShowMoreItems(true);
    }

    const handleChangeSearch = (text: string) => {
        const filteredResources = Array.from(client.resources.cache.values()).filter((resource) => {
            return resource.title.toLowerCase().includes(text.toLowerCase());
        });
        setResources(filteredResources);
    }

    return (
        <View style={commonStyles.container}>
            <TopBar onChangeSearch={handleChangeSearch} />
            <View style={commonStyles.content}>
                <ScrollView style={commonStyles.resourcesContainer} contentContainerStyle={commonStyles.scrollViewCenter} >
                    {
                        resources.map((resource, i) => {
                            if ((!showMoreItems && i < 6) || showMoreItems) {
                                return <ResourceCard key={i} resource={resource} callBack={() => navigation.navigate('ResourceDetails', resource)} />
                            } else {
                                return null;
                            }
                        })
                    }
                    {
                        !showMoreItems && <ButtonShowMoreItems callBack={onClickShowMoreItems} />
                    }
                </ScrollView>
            </View>
            <NavBar client={client} />
        </View>
    )
}
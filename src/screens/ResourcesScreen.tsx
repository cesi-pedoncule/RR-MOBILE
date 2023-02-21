import React, { useState } from "react";
import { View, ScrollView } from 'react-native'
import { Client, Resource } from "rr-apilib";

import NavBar from "../components/NavBar";
import commonStyles from "../styles/commonStyles";
import ButtonShowMoreItems from "../components/Button/ButtonShowMoreItems";
import ResourceCard from "../components/Card/ResourceCard";
import TopBar from "../components/TopBar";
import ResourcesStyles from "../styles/Screen/ResourcesStyles";

export default function ResourcesScreen({ route }: any) {
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
                <ScrollView style={ResourcesStyles.resourcesContainer} contentContainerStyle={commonStyles.scrollViewCenter} >
                    {
                        resources.map((resource, i) => {
                            if ((!showMoreItems && i < 6) || showMoreItems) {
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
    )
}
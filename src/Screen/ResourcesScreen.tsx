import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from 'react-native'
import { Client, Resource } from "rr-apilib";

import NavBar from "../Components/NavBar";
import CommonStyles from "../Styles/CommonStyles";
import ButtonShowMoreItems from "../Components/Button/ButtonShowMoreItems";
import ResourceCard from "../Components/Card/ResourceCard";
import TopBar from "../Components/Input/TopBar";
import ResourcesStyles from "../Styles/Screen/ResourcesStyles";

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

    useEffect(() => {
        const fetchResources = async () => {
            if (resources.length == 0) {
                setResources(await client.resources.fetchAll());
            } 
        }

        fetchResources();
    }, [])

    return (
        <View style={CommonStyles.container}>
            <TopBar onChangeSearch={handleChangeSearch} />
            <View style={CommonStyles.content}>
                {
                    resources.length === 0 ?  <ActivityIndicator size="large" color="#0000ff" style={CommonStyles.loader} /> :
                    <ScrollView style={ResourcesStyles.resourcesContainer} contentContainerStyle={CommonStyles.scrollViewCenter} >
                        {
                            resources.map((resource, i) => {
                                if ((!showMoreItems && i < 6) || showMoreItems) {
                                    return <ResourceCard key={i} resource={resource} callBack={() => navigation.navigate('ResourceDetails', resource)} />
                                } 
                            })
                        }
                        {
                            !showMoreItems && <ButtonShowMoreItems callBack={onClickShowMoreItems} />
                        }
                    </ScrollView>
                }
            </View>
            <NavBar client={client} resourcesIsFocused={true}/>
        </View>
    )
}
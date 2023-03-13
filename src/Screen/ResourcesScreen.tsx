import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, Text } from 'react-native'
import { Client, Resource } from "rr-apilib";
import CommonStyles from "../Styles/CommonStyles";
import ButtonShowMoreItems from "../Components/Button/ButtonShowMoreItems";
import ResourceCard from "../Components/Card/ResourceCard";
import TopBar from "../Components/Input/TopBar";
import ResourcesStyles from "../Styles/Screen/ResourcesStyles";
import useResources from "../Hooks/useResources";

export default function ResourcesScreen({ navigation, route } : any) {
    const client = route.params as Client;

    const { resources, setResources, loading } = useResources({ client });
    const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>([]);

    const onClickShowMoreItems = () => {
        // Append 6 more items in the list
        setResourcesFiltered(resourcesFiltered.concat(resources.slice(resourcesFiltered.length, resourcesFiltered.length + 6)));
    }

    const handleChangeSearch = (text: string) => {
        const filteredResources = Array.from(client.resources.cache.values()).filter((resource) => {
            return resource.title.toLowerCase().includes(text.toLowerCase());
        });
        setResources(filteredResources);
        setResourcesFiltered(filteredResources.splice(0, 6));
    }

    useEffect(() => {
        if (resourcesFiltered.length === 0 && resources.length !== 0 && !loading) {
            setResourcesFiltered(resources.slice(0, 6));
        }
    }, [resources, loading])

    return (
        <View style={CommonStyles.container}>
            <TopBar onChangeSearch={handleChangeSearch} navigation={navigation} />
            <View style={CommonStyles.content}>
                {
                    loading ?  <ActivityIndicator size="large" color="#0000ff" style={CommonStyles.loader} /> :
                    <ScrollView style={CommonStyles.scrollView}>
                        <View style={ResourcesStyles.resourcesContainer}>
                            {
                                resourcesFiltered.map((resource, i) => {
                                    return <ResourceCard key={i} resource={resource} callBack={() => navigation.navigate('ResourceDetails', {resource: resource})} />
                                })
                            }
                            {
                                resources.length >= 6 && resourcesFiltered.length !== resources.length && <ButtonShowMoreItems callBack={onClickShowMoreItems} />
                            }
                            {
                                resourcesFiltered.length === 0 && <Text style={CommonStyles.textEmptyResult}>Aucune ressource n'a été trouvée.</Text>
                            }
                        </View>
                    </ScrollView>
                }
            </View>
        </View>
    )
}
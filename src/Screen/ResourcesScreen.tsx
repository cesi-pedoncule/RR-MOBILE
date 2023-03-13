import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, Text } from 'react-native'
import { Client, Resource } from "rr-apilib";
import CommonStyles from "../Styles/CommonStyles";
import ButtonShowMoreItems from "../Components/Button/ButtonShowMoreItems";
import ResourceCard from "../Components/Card/ResourceCard";
import TopBar from "../Components/Input/TopBar";
import ResourcesStyles from "../Styles/Screen/ResourcesStyles";

export default function ResourcesScreen({ navigation, route } : any) {
    const client = route.params as Client;
    const [resources, setResources] = useState<Resource[]>(Array.from(client.resources.cache.values()));
    const [resourcesFiltered, setResourcesFiltered] = useState<Resource[]>(Array.from(client.resources.cache.values()).slice(0, 6));
    const [noResources, setNoResources] = useState<boolean>(false);

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
        setNoResources(filteredResources.length == 0);
    }

    useEffect(() => {
        const fetchResources = async () => {
            if (resources.length == 0) {
                const rTmp = Array.from(await (await client.resources.fetchAll()).values());
                setResources(rTmp);
                setResourcesFiltered(rTmp.slice(0, 6));
            } 
        }

        fetchResources();
    }, [resourcesFiltered])

    return (
        <View style={CommonStyles.container}>
            <TopBar onChangeSearch={handleChangeSearch} navigation={navigation} />
            <View style={CommonStyles.content}>
                {
                    resources.length === 0 && noResources === false ?  <ActivityIndicator size="large" color="#0000ff" style={CommonStyles.loader} /> :
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
                                noResources && <Text style={CommonStyles.textEmptyResult}>Aucune ressource n'a été trouvée.</Text>
                            }
                        </View>
                    </ScrollView>
                }
            </View>
        </View>
    )
}
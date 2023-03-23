import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, FlatList } from 'react-native'
import { Resource } from "rr-apilib";
import CommonStyles from "../Styles/CommonStyles";
import ResourceCard from "../Components/Card/ResourceCard";
import TopBar from "../Components/Input/TopBar";
import ResourcesStyles from "../Styles/Screen/ResourcesStyles";
import usePublicResources from "../Hooks/usePublicResources";
import { COLORS } from "../Styles/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList } from "../Types/navigation";
import Header from "../Components/Header";

type Props = NativeStackScreenProps<NavigationParamList, 'Resources'>;

export default function ResourcesScreen({ navigation, route } : Props) {
    
    const client = route.params.client;

    const { resources, setResources, loading } = usePublicResources({ client });
    const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>([]);

    const handleChangeSearch = (text: string) => {
        const filteredResources = Array.from(client.resources.cache.filter(resource => resource.isPublic == true).values()).filter((resource) => {
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

    const renderFooter = () => {
		return (
			<View>
				{
					resources.length >= 6 && resourcesFiltered.length !== resources.length &&
					<ActivityIndicator size="large" color={COLORS.AccentColor} style={CommonStyles.loadMoreContent} />
				}	
			</View>
		)
	}

	const renderHeader = () => {
		return (
			<View style={CommonStyles.listHeaderComponent}>
				<Header label={"Les ressources"}/>
			</View>
		)
	}

	const onShowMoreItems = () => {
		setResourcesFiltered(resourcesFiltered.concat(resources.slice(resourcesFiltered.length, resourcesFiltered.length + 6)));
	}

    return (
        <View style={CommonStyles.container}>
            <TopBar onChangeSearch={handleChangeSearch} navigation={navigation} />
            <View style={CommonStyles.content}>
                {
                    loading ?  <ActivityIndicator size="large" color={COLORS.AccentColor} style={CommonStyles.loader} /> :
                    <FlatList style={CommonStyles.itemsContainer} 
                        ListEmptyComponent={<Text style={CommonStyles.textEmptyResult}>Aucune ressource n'a été trouvée.</Text>}
                        contentContainerStyle = {ResourcesStyles.resourcesContainer}
                        data={resourcesFiltered}
                        renderItem={({item}) => <ResourceCard resource={item} navigation={navigation} setResources={setResources} setResourcesFiltered={setResourcesFiltered} client={client} inShareResourceScreens={true}/>}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={renderHeader}
                        ListFooterComponent={renderFooter}
                        onEndReached={onShowMoreItems}
                        onEndReachedThreshold={0}
                    />
                }
            </View>
        </View>
    )
}
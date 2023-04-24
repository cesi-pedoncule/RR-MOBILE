import React, { useCallback, useEffect, useState } from "react";
import { View, ActivityIndicator, Text, FlatList, RefreshControl } from 'react-native'
import { Resource } from "rr-apilib";
import CommonStyles from "../Styles/CommonStyles";
import ResourceCardWithUser from "../Components/Card/ResourceCardWithUser";
import TopBar from "../Components/Input/TopBar";
import ResourcesStyles from "../Styles/Screen/ResourcesStyles";
import { COLORS } from "../Styles/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList } from "../Types/navigation";
import Header from "../Components/Header";

type Props = NativeStackScreenProps<NavigationParamList, 'Resources'>;

export default function ResourcesScreen({ navigation, route } : Props) {
    
    const client = route.params.client;

    const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>([]);
    const [ refreshing, setRefreshing ] = useState(false);

    const handleChangeSearch = (text: string) => {
        const filteredResources = Array.from(client.resources.cache.values()).filter((resource) =>
            resource.title.toLowerCase().includes(text.toLowerCase())
        );
        setResourcesFiltered([...filteredResources.splice(0, 6)]);
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            onRefresh();
        });
    }, [navigation]);

    const onRefresh = useCallback(async () => {
        const refreshResources:Resource[] = Array.from(client.resources.getValidateResources().filter(resource => resource.isPublic).values());
        setResourcesFiltered([...refreshResources.slice(0, 6)]);
        setRefreshing(false);
    }, []);

    const onRefreshFetchAll = useCallback(async () => {
        setRefreshing(true)
        await client.resources.fetchAll();
        const refreshResources:Resource[] = Array.from(client.resources.getValidateResources().filter(resource => resource.isPublic).values());
        setResourcesFiltered([...refreshResources.slice(0, 6)]);
        setRefreshing(false);
    }, []);

    const renderFooter = () => {
		return (
			<View>
				{
					client.resources.cache.size >= 6 && resourcesFiltered.length !== client.resources.cache.size && resourcesFiltered.length != 0 &&
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
		setResourcesFiltered(resourcesFiltered.concat(Array.from(client.resources.cache.values()).slice(resourcesFiltered.length, resourcesFiltered.length + 6)));
	}

    return (
        <View style={CommonStyles.container}>
            <TopBar onChangeSearch={handleChangeSearch} navigation={navigation} client={client}/>
            <View style={CommonStyles.content}>
                <FlatList style={CommonStyles.itemsContainer} 
                    ListEmptyComponent={<Text style={CommonStyles.textEmptyResult}>Aucune ressource n'a été trouvée.</Text>}
                    contentContainerStyle = {ResourcesStyles.resourcesContainer}
                    data={resourcesFiltered}
                    renderItem={({item}) => <ResourceCardWithUser resourceData={item} navigation={navigation} onDoubleClick={onRefresh}/>}
                    keyExtractor={item => item.id}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshFetchAll} />}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                    onEndReached={onShowMoreItems}
                    onEndReachedThreshold={0}
                />
            </View>
        </View>
    )
}
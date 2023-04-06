import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import { Resource } from "rr-apilib";
import InputButton from "../Components/Button/InputButton";
import TopBar from "../Components/Input/TopBar";
import ResourceCardWithoutUser from "../Components/Card/ResourceCardWithoutUser";
import CommonStyles from "../Styles/CommonStyles";
import ShareResourceStyles from "../Styles/Screen/ShareResourceStyles";
import { COLORS } from "../Styles/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList } from "../Types/navigation";
import Header from "../Components/Header";

type Props = NativeStackScreenProps<NavigationParamList, 'ShareResource'>;

export default function ShareResourceScreen({ route, navigation }: Props) {
	
	const client = route.params.client;

	const [ resources, setResources ] = useState<Resource[]>([]);
	const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>([]);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		if(client.auth.me == null){
			navigation.navigate("Login", { client });
		}
	})

	const onClickShareNewItem = () => {
		navigation.navigate("CreateResourceScreen", { client });
	}

	const handleChangeSearch = (text: string) => {
		const filteredResources = resources.filter((resource) => 
			resource.title.toLowerCase().includes(text.toLowerCase())
		);
		setResourcesFiltered([...filteredResources.splice(0, 6)]);
	}

	useEffect(() => {
		navigation.addListener('focus', () => {
            onRefresh();
        });
        if (resourcesFiltered.length === 0 && resources.length !== 0) {
            setResourcesFiltered([...resources.slice(0, 6)]);
        }
    }, [resources, navigation]);

	const onRefresh = useCallback(async () => {
		if(client.auth.me != null){
			const refreshResources:Resource[] = Array.from(client.auth.me.resources.cache.values());
			setResources([...refreshResources]);
			setResourcesFiltered([...refreshResources.slice(0, 6)]);
			setRefreshing(false)
		}
 	 }, []);

	const renderFooter = () => {
		return (
			<View>
				{
					resources.length >= 6 && resourcesFiltered.length !== resources.length && resourcesFiltered.length != 0 &&
					<ActivityIndicator size="large" color={COLORS.AccentColor} style={CommonStyles.loadMoreContent} />
				}	
			</View>
		)
	}

	const renderHeader = () => {
		return (
			<View style={CommonStyles.listHeaderComponent}>
				<Header label={"Mes ressources"}/>
			</View>
		)
	}

	const onShowMoreItems = () => {
		setResourcesFiltered(resourcesFiltered.concat(resources.slice(resourcesFiltered.length, resourcesFiltered.length + 6)));
	}

  	return (
		<View style={CommonStyles.container}>
			{
				client.auth.me != null && <TopBar onChangeSearch={handleChangeSearch} navigation={navigation} />
			}
			<View style={CommonStyles.content}> 
				<FlatList style={CommonStyles.itemsContainer} 
					ListEmptyComponent={<Text style={CommonStyles.textEmptyResult}>Aucune ressource n'a été trouvée.</Text>}
					contentContainerStyle = {ShareResourceStyles.resourcesContainer}
					data={resourcesFiltered}
					renderItem={({item}) => <ResourceCardWithoutUser resourceData={item} navigation={navigation} setResources={setResources} setResourcesFiltered={setResourcesFiltered}/>}
					keyExtractor={item => item.id}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
					ListHeaderComponent={renderHeader}
					ListFooterComponent={renderFooter}
					onEndReached={onShowMoreItems}
					onEndReachedThreshold={0}
				/>
				<View style={ShareResourceStyles.buttonsContainer}>
					<InputButton label="Nouvelle Ressource" callBack={onClickShareNewItem} style={ShareResourceStyles.addResourceBtn}/>
				</View>
			</View>
		</View>
  	)
}
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

    const [ searchText, setSearchText ] = useState<string>('');
	const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>([]);
	const [ refreshing, setRefreshing ] = useState(false);

	const onClickShareNewItem = () => {
		navigation.navigate("CreateResourceScreen", { client });
	}

	const handleChangeSearch = (text: string) => {
		if(client.auth.me != null){
			setSearchText(text);
			const filteredResources = Array.from(client.auth.me.resources.cache.values()).filter((resource) => 
				resource.title.toLowerCase().includes(text.toLowerCase())
			);
			setResourcesFiltered([...filteredResources.splice(0, 6)]);
		}
	}

	useEffect(() => {
		if(client.auth.me == null){
			navigation.navigate("Login", { client });
		}
		navigation.addListener('focus', () => {
            onRefresh();
        });
    }), [navigation];

	const onRefresh = () => {
		if(client.auth.me != null){
			const refreshResources:Resource[] = Array.from(client.auth.me.resources.cache.values());
			setResourcesFiltered([...refreshResources.slice(0, 6)]);
			setRefreshing(false);
			setSearchText('');
		}
 	 };

	const onRefreshFetchAll = useCallback(async () => {
		if(client.auth.me != null){
			setRefreshing(true)
			await client.resources.fetchAll();
			const refreshResources:Resource[] = Array.from(client.auth.me.resources.cache.values());
			setResourcesFiltered([...refreshResources.slice(0, 6)]);
			setRefreshing(false);
			setSearchText('');
		}
 	 }, []);


	const renderFooter = () => {
		return (
			<View>
				{
					!client.auth.me || searchText.length === 0 && client.auth.me.resources.cache.size >= 6 && resourcesFiltered.length !== client.auth.me.resources.cache.size && resourcesFiltered.length != 0 &&
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
		if (client.auth.me && searchText.length === 0) {
			setResourcesFiltered(resourcesFiltered.concat(Array.from(client.auth.me.resources.cache.values()).slice(resourcesFiltered.length, resourcesFiltered.length + 6)));
		}
	}

  	return (
		<View style={CommonStyles.container}>
			{
				client.auth.me != null && <TopBar value={searchText} onChangeSearch={handleChangeSearch} navigation={navigation} client={client}/>
			}
			<View style={CommonStyles.content}>
				<FlatList style={CommonStyles.itemsContainer} 
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={<Text style={CommonStyles.textEmptyResult}>Aucune ressource n'a été trouvée.</Text>}
					contentContainerStyle = {ShareResourceStyles.resourcesContainer}
					data={resourcesFiltered}
					renderItem={({item}) => <ResourceCardWithoutUser resourceData={item} navigation={navigation} setResourcesFiltered={setResourcesFiltered}  onDoubleClick={onRefresh}/>}
					keyExtractor={item => item.id}
					refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshFetchAll} />}
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
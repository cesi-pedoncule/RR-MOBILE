import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { Resource } from "rr-apilib";
import InputButton from "../Components/Button/InputButton";
import TopBar from "../Components/Input/TopBar";
import ResourceCard from "../Components/Card/ResourceCard";
import CommonStyles from "../Styles/CommonStyles";
import ShareResourceStyles from "../Styles/Screen/ShareResourceStyles";
import useResources from "../Hooks/useResources";
import { COLORS } from "../Styles/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList } from "../Types/navigation";
import Header from "../Components/Header";

type Props = NativeStackScreenProps<NavigationParamList, 'ShareResource'>;

export default function ShareResourceScreen({ route, navigation }: Props) {
	
	const client = route.params.client;
	const user = client.auth.me;

	const {resources, setResources, loading} = useResources({ client });
	const [ resourcesFiltered, setResourcesFiltered ] = useState<Resource[]>(resources);

	if(user != null){
		//user.resources.refresh();
		//setResources(Array.from(user.resources.cache.values()));
	} 
	else{
		navigation.navigate("Login", { client });
	}

	const onClickShareNewItem = () => {
		navigation.navigate("CreateResourceScreen", { client });
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
				<Header label={"Mes ressources"}/>
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
					<FlatList style={CommonStyles.scrollView} 
						ListEmptyComponent={<Text style={CommonStyles.textEmptyResult}>Aucune ressource n'a été trouvée.</Text>}
						contentContainerStyle = {ShareResourceStyles.resourcesContainer}
						data={resourcesFiltered}
						renderItem={({item}) => <ResourceCard resource={item} navigation={navigation} setResources={setResources} setResourcesFiltered={setResourcesFiltered} client={client} inShareResourceScreens={true}/>}
						keyExtractor={item => item.id}
						ListHeaderComponent={renderHeader}
						ListFooterComponent={renderFooter}
						onEndReached={onShowMoreItems}
						onEndReachedThreshold={0}
					/>
				}
				{
					user &&
					<View style={ShareResourceStyles.buttonsContainer}>
						<InputButton label="Nouvelle Ressource" callBack={onClickShareNewItem} style={ShareResourceStyles.addResourceBtn}/>
					</View>
				}
			</View>
		</View>
  	)
}
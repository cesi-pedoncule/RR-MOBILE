import React, { useState } from "react";
import { View, Text, ScrollView } from 'react-native'
import { Client, Resource } from "rr-apilib";
import ButtonShowMoreItems from "../components/Button/ButtonShowMoreItems";
import InputButton from "../components/Button/InputButton";
import NavBar from "../components/NavBar";
import ResourceCard from "../components/Card/ResourceCard";
import TopBar from "../components/TopBar";
import CommonStyles from "../styles/CommonStyles";
import ShareResourceStyles from "../styles/Screen/ShareResourceStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type ShareResourceStackParamList = {
    ResourceDetails: Resource;
}

export default function ShareResourceScreen({ route }: any) {
	const navigation = useNavigation<StackNavigationProp<ShareResourceStackParamList>>();

	const client = route.params as Client;
  	const [showMoreItems, setShowMoreItems] = useState<boolean>(false);
	const [resources, setResources] = useState<Resource[]>(Array.from(client.resources.cache.values()));

	const onClickShowMoreItems = () => {
		setShowMoreItems(true);
	}

	const onClickShareNewItem = () => {
		alert('TODO: Navigate to ShareNewItemScreen');
	}

	const handleChangeSearch = (text: string) => {
		const filteredResources = Array.from(client.resources.cache.values()).filter((resource) => {
			return resource.title.toLowerCase().includes(text.toLowerCase());
		});
		setResources(filteredResources);
	}

  return (
	<View style={CommonStyles.container}>
		<TopBar onChangeSearch={handleChangeSearch} />
		<View style={CommonStyles.content}> 
			<Text style={ShareResourceStyles.textSaves}>Enregitrées</Text>
			{
				resources.length === 0 ?
				<Text>Aucune ressource enregistrée</Text>
				:
				<ScrollView 
					style={ 
						showMoreItems ? ShareResourceStyles.resourcesContainerWithoutLoadMoreItems 
						: ShareResourceStyles.resourcesContainerWithLoadMoreItems 
					} 
					contentContainerStyle={CommonStyles.scrollViewCenter}
				>
					{
						resources.map((resource, i) => {
							if ((!showMoreItems && i < 2) || showMoreItems) {
								return <ResourceCard key={i} resource={resource} callBack={() => navigation.navigate('ResourceDetails', resource)} />
							}
						})
					}
				</ScrollView>
			}
			<View style={ShareResourceStyles.buttonsContainer}>
				{ !showMoreItems && <ButtonShowMoreItems callBack={onClickShowMoreItems} /> }
				<InputButton label="Nouvelle Ressource" callBack={onClickShareNewItem} style={ShareResourceStyles.addResourceBtn}></InputButton>
			</View>
			<NavBar client={client} />
		</View>
	</View>
  )
}
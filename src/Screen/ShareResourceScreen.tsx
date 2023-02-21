import React, { useState } from "react";
import { View, Text, ScrollView } from 'react-native'
import { Client, Resource } from "rr-apilib";
import ButtonShowMoreItems from "../Components/Button/ButtonShowMoreItems";
import InputButton from "../Components/Button/InputButton";
import NavBar from "../Components/NavBar";
import ResourceCard from "../Components/Card/ResourceCard";
import TopBar from "../Components/Input/TopBar";
import CommonStyles from "../Styles/CommonStyles";
import ShareResourceStyles from "../Styles/Screen/ShareResourceStyles";

export default function ShareResourceScreen({ route }: any) {
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
					contentContainerStyle={CommonStyles.scrollViewCenter}>
				{
					resources.map((resource, i) => {
						if ((!showMoreItems && i < 2) || showMoreItems) {
							return <ResourceCard key={i} resource={resource} />
						}
					})
				}
				</ScrollView>
			}
			<View style={ShareResourceStyles.buttonsContainer}>
				{
					!showMoreItems ?
					<ButtonShowMoreItems callBack={onClickShowMoreItems} />
					: null
				}
				<InputButton label="Nouvelle Ressource" callBack={onClickShareNewItem} style={ShareResourceStyles.addResourceBtn}></InputButton>
			</View>
			<NavBar client={client} />
		</View>
	</View>
  )
}
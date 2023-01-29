import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import { Client } from "rr-apilib";
import ButtonShowMoreItems from "../components/ButtonShowMoreItems";
import InputButton from "../components/InputButton";
import NavBar from "../components/NavBar";
import ResourceCard from "../components/ResourceCard";
import TopBar from "../components/TopBar";
import commonStyles from "../styles/commonStyles";
import ShareResourceStyles from "../styles/ShareResourceStyles";

export default function ShareResourceScreen({ route }: any) {
	const client = route.params as Client;
  	const [showMoreItems, setShowMoreItems] = useState(false);
	const [resources, setResources] = useState(Array.from(client.resources.cache.values()));

	const onClickShowMoreItems = () => {
		setShowMoreItems(true);
	}

	const onClickShareNewItem = () => {
		alert('TODO: Navigate to ShareNewItemScreen');
	}

  return (
	<SafeAreaView style={commonStyles.container}>
		<TopBar />
		<View style={commonStyles.contentWithTopBar}> 
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
					contentContainerStyle={commonStyles.scrollViewCenter}>
				{
					resources.map((resource, i) => {
						if (!showMoreItems && i < 2) {
							return <ResourceCard key={i} resource={resource} />
						} else if (showMoreItems) {
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
	</SafeAreaView>
  )
}
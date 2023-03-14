import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { Client } from "rr-apilib";
import ButtonShowMoreItems from "../Components/Button/ButtonShowMoreItems";
import InputButton from "../Components/Button/InputButton";
import TopBar from "../Components/Input/TopBar";
import ResourceCard from "../Components/Card/ResourceCard";
import CommonStyles from "../Styles/CommonStyles";
import ShareResourceStyles from "../Styles/Screen/ShareResourceStyles";
import useResources from "../Hooks/useResources";
import { COLORS } from "../Styles/Colors";

export default function ShareResourceScreen({ route, navigation }: any) {
	const client = route.params as Client;
	const user = client.auth.me;

  	const [showMoreItems, setShowMoreItems] = useState<boolean>(false);
	const {resources, setResources, loading} = useResources({ client });


	if(user != null){
		//TODO
	} 
	else{
		navigation.navigate("Login");
	}


	const onClickShowMoreItems = () => {
		setShowMoreItems(true);
	}

	const onClickShareNewItem = () => {
		navigation.navigate('CreateResourceScreen');
	}

	const handleChangeSearch = (text: string) => {
		const filteredResources = Array.from(client.resources.cache.values()).filter((resource) => {
			return resource.title.toLowerCase().includes(text.toLowerCase());
		});
		setResources(filteredResources);
	}

	useEffect(() => {
        if (resources.length === 0 && !loading) {
            setResources(resources.slice(0, 6));
        }
    }, [resources, loading])

  	return (
		<View style={CommonStyles.container}>
			<TopBar onChangeSearch={handleChangeSearch} navigation={navigation} />
			<View style={CommonStyles.content}> 
				<Text style={ShareResourceStyles.textSaves}>Enregitrées</Text>
				{
					loading ?  <ActivityIndicator size="large" color={COLORS.AccentColor} style={CommonStyles.loader} /> :
					<ScrollView style={CommonStyles.scrollView}>
						{
							resources.length === 0 ?
							<View style={ShareResourceStyles.resourcesContainer}>
								<Text style={CommonStyles.textEmptyResult}>Aucune ressource enregistrée</Text>
							</View>
							:
							<View style={ShareResourceStyles.resourcesContainer}>
								{
									resources.map((resource, i) => {
										if ((!showMoreItems && i < 2) || showMoreItems) {
											return <ResourceCard key={i} resource={resource} callBack={() => navigation.navigate('ResourceDetails', { resource: resource })} inShareResourceScreens={true} client={client} setResources={setResources}/>
										}
									})
								}
								{ 
									!showMoreItems && resources.length >= 6 && <ButtonShowMoreItems callBack={onClickShowMoreItems} /> 
								}
							</View>
						}
					</ScrollView>
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
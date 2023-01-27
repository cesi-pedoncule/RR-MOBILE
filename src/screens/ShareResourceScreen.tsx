import React, { useState } from "react";
import { View, Text } from 'react-native'
import ButtonShowMoreItems from "../components/buttonShowMoreItems";
import InputButton from "../components/InputButton";
import NavBar from "../components/NavBar";
import ResourceCard from "../components/ResourceCard";
import TopBar from "../components/TopBar";
import commonStyles from "../styles/commonStyles";
import ShareResourceStyles from "../styles/ShareResourceStyles";

export default function ShareResourceScreen() {
  const [showMoreItems, setShowMoreItems] = useState(false);

  const onClickShowMoreItems = () => {
      setShowMoreItems(true);
      alert('Load more items');
  }

  return (
	<View style={commonStyles.container}>
		<TopBar/>
		<View style={commonStyles.contentWithTopBar}> 
			<Text style={ShareResourceStyles.textSaves}>Enregitrées</Text>
			<View style={commonStyles.resourcesContainer}>
				<ResourceCard title='Resource of test' user='usertest' description='Lorem ipsum bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ...' />
				<ResourceCard title='Resource of test' user='usertest' description='Lorem ipsum bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ...' />
				{
					!showMoreItems ?
					<ButtonShowMoreItems callBack={onClickShowMoreItems} />
					: null
				}
				
				<InputButton label="Nouvelle Ressource" callBack={onClickShowMoreItems} style={ShareResourceStyles.addResourceBtn}></InputButton>
			</View>
			<NavBar/>
		</View>
	</View>
  )
}
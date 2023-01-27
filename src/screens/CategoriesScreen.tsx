import React, { useState } from "react";
import { View, ScrollView, Text } from 'react-native'
import { Client } from "rr-apilib";
import NavBar from "../components/NavBar";
import commonStyles from "../styles/commonStyles";
import ButtonShowMoreItems from "../components/buttonShowMoreItems";
import TopBar from "../components/TopBar";
import CategoryCard from "../components/CategoryCard";

export default function CategoriesScreen({ route }: any) {
  const client = route.params as Client;
  const [showMoreItems, setShowMoreItems] = useState(false);

  const onClickShowMoreItems = () => {
      setShowMoreItems(true);
      alert('Load more items');
  }
  
  return (
    <View style={commonStyles.container}>
		<TopBar/>
		<View style={commonStyles.contentWithTopBar}> 
			<ScrollView style={commonStyles.scrollViewCategories}>
        <View style={commonStyles.categoriesContainer}>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          <CategoryCard title={"Title"} numberResource={0}></CategoryCard>
          {
            !showMoreItems ?
            <ButtonShowMoreItems callBack={onClickShowMoreItems} />
            : null
          }
        </View>
      </ScrollView>
			<NavBar client={client}/>
		</View>
	</View>
  )
}
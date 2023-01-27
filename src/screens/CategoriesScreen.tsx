import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, ScrollView } from 'react-native'
import NavBar from "../components/NavBar";
import commonStyles from "../styles/commonStyles";
import ButtonShowMoreItems from "../components/buttonShowMoreItems";
import TopBar from "../components/TopBar";
import CategoryCard from "../components/CategoryCard";

export default function CategoriesScreen() {
  const [showMoreItems, setShowMoreItems] = useState(false);

  const onClickShowMoreItems = () => {
      setShowMoreItems(true);
      alert('Load more items');
  }
  
  return (
    <View style={commonStyles.container}>
		<TopBar/>
		<View style={commonStyles.contentWithTopBar}> 
			<ScrollView>
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
			<NavBar/>
		</View>
	</View>
  )
}
import React from 'react'
import { Resource } from 'rr-apilib'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {Text, TouchableHighlight, View } from 'react-native'

import { likeClickHandle } from '../../Functions/Utils'
import LikeButtonStyles from '../../Styles/Components/Button/LikeButtonStyles';

interface Props {
	resource: Resource;
	isLikeResource: boolean;
	setIsLikeResource: React.Dispatch<React.SetStateAction<boolean>>;
	numberLike: number;
	setNumberLike: React.Dispatch<React.SetStateAction<number>>
  }

export default function LikeButton({ resource, isLikeResource, setIsLikeResource, numberLike, setNumberLike }: Props) {

	return (
		<View style={LikeButtonStyles.container}>
			<Text style={LikeButtonStyles.numberLike}>{(numberLike).toString()}</Text>
			<TouchableHighlight style={LikeButtonStyles.likeBtn} onPress={() => likeClickHandle(resource, isLikeResource, setIsLikeResource, numberLike, setNumberLike)} underlayColor={"#F0F0F0"}>
				<MaterialCommunityIcons name={isLikeResource ? "cards-heart" : "cards-heart-outline" } size={24} color="black" />
			</TouchableHighlight>
		</View>
	);
}
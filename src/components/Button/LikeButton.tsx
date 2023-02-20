import {Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import LikeButtonStyles from '../../styles/Component/LikeButtonStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
	callBack: ()=>void;
	isLike: boolean;
	likeNumber:number;
  }

export default function LikeButton({callBack, isLike, likeNumber}:Props) {
	return (
		<View style={LikeButtonStyles.container}>
			<Text style={LikeButtonStyles.numberLike}>{likeNumber.toString()}</Text>
			<TouchableHighlight style={LikeButtonStyles.likeBtn} onPress={callBack}>
				{
					!isLike? <MaterialCommunityIcons name="cards-heart-outline" size={24} color="black" /> : <MaterialCommunityIcons name="cards-heart" size={24} color="black" />
				}
			</TouchableHighlight>
		</View>
	);
}
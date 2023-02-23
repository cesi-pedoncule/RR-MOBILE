import React from 'react'
import { Resource } from 'rr-apilib'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native'

import { likeClickHandle } from '../../Functions/Utils'
import LikeButtonStyles from '../../Styles/Components/Button/LikeButtonStyles';

interface Props {
	resource: Resource;
	isLikeResource: boolean;
	setIsLikeResource: React.Dispatch<React.SetStateAction<boolean>>;
	numberLike: number;
	setNumberLike: React.Dispatch<React.SetStateAction<number>>
}
/**
 * Global bc each render
 * status always = true
 */
let waitStatus = true;

export default function LikeButton({ resource, isLikeResource, setIsLikeResource, numberLike, setNumberLike }: Props) {

	const onPress = (e: GestureResponderEvent) => {
		
		e.preventDefault();

		if(waitStatus) {
			waitStatus = false;
			setTimeout(() => waitStatus = true, 1e3);
			likeClickHandle(resource, isLikeResource, setIsLikeResource, numberLike, setNumberLike);
		}
	}

	return (
		<View style={LikeButtonStyles.container}>
			<Text style={LikeButtonStyles.numberLike}>{numberLike.toString()}</Text>
			<TouchableOpacity style={LikeButtonStyles.likeBtn} onPress={(e) => onPress(e)} >
				<MaterialCommunityIcons name={isLikeResource ? "cards-heart" : "cards-heart-outline" } size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
}
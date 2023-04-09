import React from 'react'
import { Resource } from 'rr-apilib'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
	GestureResponderEvent,
	Text,
	TouchableOpacity,
	View
} from 'react-native'

import { likeClickHandle } from '../../Functions/Utils'

import LikeButtonStyles from '../../Styles/Components/Button/LikeButtonStyles';
import { COLORS } from '../../Styles/Colors'

interface Props {
	resource: Resource;
	setResource: React.Dispatch<React.SetStateAction<Resource>>;
	onClick: () => void;
}
/**
 * Global bc each render
 * status always = true
 */
let waitStatus = true;

export default function LikeButton({ resource, setResource, onClick}: Props) {

	const onPress = async (e: GestureResponderEvent) => {
		
		e.preventDefault();

		if(waitStatus) {
			waitStatus = false;
			setTimeout(() => waitStatus = true, 1e3);
			await likeClickHandle(resource, setResource);
			onClick()
		}
	}

	return (
		<View style={LikeButtonStyles.container}>
			<Text style={LikeButtonStyles.numberLike}>{resource.likes.cache.size.toString()}</Text>
			<TouchableOpacity style={LikeButtonStyles.likeBtn} onPress={(e) => onPress(e)} >
				<MaterialCommunityIcons name={resource.isLiked ? "cards-heart" : "cards-heart-outline" } size={24} color={COLORS.Black} />
			</TouchableOpacity>
		</View>
	);
}
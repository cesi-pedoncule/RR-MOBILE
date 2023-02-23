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

	// const [isLikeResource, setIsLikeResource] = React.useState<boolean>(resource.hasLike());
	// const [numberLike, setNumberLike] = React.useState<number>(resource.likes.cache.size);

	const onClickLike = async () => {
		if (resource.client.auth.me) {
			resource.hasLike() ? resource.unlike() : resource.like();
			setIsLikeResource(!resource.hasLike());
			setNumberLike(isLikeResource ? numberLike - 1 : numberLike + 1);
		} else {
			alert("Vous devez être connecté pour liker une ressource");
		}
	}

	return (
		<View style={LikeButtonStyles.container}>
			<Text style={LikeButtonStyles.numberLike}>{(numberLike).toString()}</Text>
			<TouchableHighlight style={LikeButtonStyles.likeBtn} onPress={() => likeClickHandle(resource, isLikeResource, setIsLikeResource, numberLike, setNumberLike)} underlayColor={"#F0F0F0"}>
				<MaterialCommunityIcons name={isLikeResource ? "cards-heart" : "cards-heart-outline" } size={24} color="black" />
			</TouchableHighlight>
		</View>
	);
}
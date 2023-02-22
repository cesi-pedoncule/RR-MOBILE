import {Text, TouchableHighlight, View } from 'react-native'
import React, { useEffect } from 'react'
import LikeButtonStyles from '../../Styles/Components/Button/LikeButtonStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Resource } from 'rr-apilib';

interface Props {
	resource: Resource;
  }

export default function LikeButton({ resource }: Props) {

	const [isLikeResource, setIsLikeResource] = React.useState<boolean>(resource.hasLike());
	const [numberLike, setNumberLike] = React.useState<number>(resource.likes.cache.size);

	const onClickLike = async () => {
		if (resource.client.auth.me) {
			resource.hasLike() ? resource.unlike() : resource.like();
			setIsLikeResource(!isLikeResource)
			setNumberLike(resource.hasLike() ? numberLike - 1 : numberLike + 1);
		} else {
			alert("Vous devez être connecté pour liker une ressource");
		}
	}

	return (
		<View style={LikeButtonStyles.container}>
			<Text style={LikeButtonStyles.numberLike}>{ numberLike.toString()}</Text>
			<TouchableHighlight style={LikeButtonStyles.likeBtn} onPress={onClickLike} underlayColor={"#F0F0F0"}>
				{
					!isLikeResource  ? <MaterialCommunityIcons name="cards-heart-outline" size={24} color="black" /> : <MaterialCommunityIcons name="cards-heart" size={24} color="black" />
				}
			</TouchableHighlight>
		</View>
	);
}
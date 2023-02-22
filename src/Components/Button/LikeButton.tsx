import {Text, TouchableHighlight, View } from 'react-native'
import React, { useEffect } from 'react'
import LikeButtonStyles from '../../Styles/Components/Button/LikeButtonStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Resource } from 'rr-apilib';

interface Props {
	resource: Resource;
	isLiked ?: boolean;
  }

export default function LikeButton({ resource, isLiked }: Props) {

	const [isLikeResource, setIsLikeResource] = React.useState<boolean>(resource.hasLike() || isLiked ? true : false);
	const [numberLike, setNumberLike] = React.useState<number>(isLiked ? resource.likes.cache.size + 1 : resource.likes.cache.size);

	const onClickLike = async () => {
		if (resource.client.auth.me) {
			resource.hasLike() || isLiked ? resource.unlike() : resource.like();
			setIsLikeResource(resource.hasLike() || isLiked ? false : true)
			isLiked = false;
			setNumberLike(isLikeResource ? numberLike - 1 : numberLike + 1);
		} else {
			alert("Vous devez être connecté pour liker une ressource");
		}
	}

	useEffect(() => {
		if (isLiked) {
			setIsLikeResource(true);
			isLiked = false;
		}
	}, [isLiked]);

	return (
		<View style={LikeButtonStyles.container}>
			<Text style={LikeButtonStyles.numberLike}>{ ((isLiked ? 1 : 0) + numberLike).toString()}</Text>
			<TouchableHighlight style={LikeButtonStyles.likeBtn} onPress={onClickLike} underlayColor={"#F0F0F0"}>
				<MaterialCommunityIcons name={isLikeResource ? "cards-heart" : "cards-heart-outline" } size={24} color="black" />
			</TouchableHighlight>
		</View>
	);
}
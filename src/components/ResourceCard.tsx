import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ResourceCardStyles from '../styles/ResourceCardStyles';
import LikeButton from './LikeButton';

interface Props {
  user: string;
  title: string;
  description: string;
}

export default function ResourceCard({user, title, description}:Props) {

  const [isLikeResource, setIsLikeResource] = useState(false);
  const [numberLikeResource, setNumberLikeResource] = useState(0);

  const onClickLike = () => {
    setIsLikeResource(!isLikeResource);

    isLikeResource? setNumberLikeResource(numberLikeResource-1) : setNumberLikeResource(numberLikeResource+1);
  }

  return (
    <View style={ResourceCardStyles.cardBackground}>
      	<View>
        	<View style={ResourceCardStyles.lineLikeAndUser}>
          		<Text style={ResourceCardStyles.cardUser}>{user}</Text>
		  		<View style={ResourceCardStyles.likeBtn}>
          			<LikeButton callBack={onClickLike} isLike={isLikeResource} likeNumber={numberLikeResource}/>
		  		</View>
        	</View>
        	<Text style={ResourceCardStyles.cardTitle}>{title}</Text>
      	</View>
      	<Text style={ResourceCardStyles.cardText}>{description}</Text>
    </View>
  )
}
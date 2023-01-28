import React from 'react'
import { Resource } from 'rr-apilib'
import { View, Text } from 'react-native'

import ResourceCardStyles from '../styles/ResourceCardStyles'

interface Props {
    resource: Resource;
}

export default function ResourceCard({ resource }: Props) {

    const username = resource.user ? `${resource.user.name} ${resource.user.firstname}` : "Utilisateur inconnu";
    
    return (
        <View style={ResourceCardStyles.cardBackground}>
            <View>
                <Text style={ResourceCardStyles.cardUser}>{username}</Text>
                <Text style={ResourceCardStyles.cardTitle}>{resource.title}</Text>
            </View>
            {resource.description ? (
                <Text style={ResourceCardStyles.cardText}>{resource.description}</Text>
            ) : (
                <Text style={ResourceCardStyles.cardText}>{"Aucune description donnée"}</Text>
            )}
        </View>
    )
}
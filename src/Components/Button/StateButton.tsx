import { View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Resource } from 'rr-apilib';
import { COLORS } from '../../Styles/Colors';

interface Props {
	resource: Resource;
}

export default function StateButton( {resource} : Props) {
    return (
        <View>
            {
                resource.validations.getLastValidationState()?.state.toString() == "validated" &&
                    <MaterialCommunityIcons name="check-decagram-outline" size={24} color={COLORS.AccentColor} />
            }
            {
                resource.validations.getLastValidationState()?.state.toString() == "pending" &&
                    <MaterialCommunityIcons name="clock-outline" size={24} color={COLORS.Orange} />
            }
            {
                resource.validations.getLastValidationState()?.state.toString() == "rejected" &&
                    <MaterialCommunityIcons name="cancel" size={24} color={COLORS.Red} />
            }
        </View>
    )
}
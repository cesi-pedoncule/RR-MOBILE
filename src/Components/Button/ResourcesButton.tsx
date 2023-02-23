import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type ResourcesButtonStackParamList = {
    Resources: undefined;
};
interface Props {
    style?: any;
}

export default function ResourcesButton({style} : Props) {
    const navigation = useNavigation<StackNavigationProp<ResourcesButtonStackParamList>>();

    const onPressButton = () => {
        navigation.navigate('Resources');
    }

    return (
        <TouchableOpacity style={[style]} onPress={onPressButton}>
            <MaterialCommunityIcons name="bookshelf" size={24} color="black" />
        </TouchableOpacity>
    );
}
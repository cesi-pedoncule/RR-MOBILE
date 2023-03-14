import React from "react";
import { Text, TouchableOpacity } from "react-native";
import CommonStyles from "../../Styles/CommonStyles";

interface Props {
    label: string;
    callBack: () => void;
}

export default function Link({label, callBack}: Props)
{
    return (
        <TouchableOpacity onPress={callBack}>
            <Text style={CommonStyles.link}>{label}</Text>
        </TouchableOpacity>
    )
}
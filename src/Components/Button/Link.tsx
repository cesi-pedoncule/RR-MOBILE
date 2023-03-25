import React from "react";
import { Text, TouchableOpacity } from "react-native";

import CommonStyles from "../../Styles/CommonStyles";
import LinkStyles from "../../Styles/Components/Button/LinkStyles";

interface Props {
    label: string;
    callBack: () => void;
}

export default function Link({ label, callBack }: Props)
{
    return (
        <TouchableOpacity onPress={callBack} style={LinkStyles.btnBackground}>
            <Text style={LinkStyles.link}>{label}</Text>
        </TouchableOpacity>
    )
}
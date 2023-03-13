import React from "react";
import { Text, TouchableOpacity } from "react-native";
import moreItemsButtonStyles from "../../Styles/Components/Button/ButtonShowMoreItemsStyles";

interface Props {
    callBack: () => void;
}

export default function ButtonShowMoreItems({callBack}: Props) {
  return (
    <TouchableOpacity onPress={callBack} style={moreItemsButtonStyles.moreItemsButton}>
        <Text style={moreItemsButtonStyles.text}>...</Text>
    </TouchableOpacity>
  );
}
import React from "react";
import { Text, TouchableHighlight } from "react-native";
import moreItemsButtonStyles from "../../styles/Component/ButtonShowMoreItemsStyles";

interface Props {
    callBack: () => void;
}

export default function ButtonShowMoreItems({callBack}: Props) {
  return (
    <TouchableHighlight onPress={callBack} style={moreItemsButtonStyles.moreItemsButton} underlayColor={"#FFFFFF"} >
        <Text>...</Text>
    </TouchableHighlight>
  );
}
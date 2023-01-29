import React from "react";
import { Text, TouchableHighlight } from "react-native";
import commonStyles from "../../styles/commonStyles";

interface Props {
    callBack: () => void;
}

export default function ButtonShowMoreItems({callBack}: Props) {
  return (
    <TouchableHighlight onPress={callBack} style={commonStyles.moreItemsButton} underlayColor={"#FFFFFF"} >
        <Text>...</Text>
    </TouchableHighlight>
  );
}
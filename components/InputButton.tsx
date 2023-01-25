import { StyleSheet, TouchableHighlight, Text, View } from 'react-native'
import React from 'react'

interface Props {
  label: string;
  callBack: ()=>void;
}

export default function InputButton({ label, callBack}: Props) {
  return (
    <View>
      <TouchableHighlight style={styles.container} onPress={callBack} underlayColor={"#000000"}>
        <View>
          <Text style={styles.title}>{label}</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: 126,
    height: 34,
    justifyContent: 'center',
    backgroundColor: '#03989E',
    borderRadius: 15,
    transition: 0.2,
  },
  title: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginVertical: 8,
  },
})
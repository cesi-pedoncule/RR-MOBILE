import React from 'react';
import { Text, View } from 'react-native';
import InputButton from '../components/InputButton';
import commonStyles from '../styles/commonStyles';

export default function HomeScreen() {
    const onClick = () => {
        alert('test');
    }

    return (
        <View style={commonStyles.container}>
            <Text>Home Screen</Text>
            <InputButton label="test" callBack={onClick} />
        </View>
    );
};
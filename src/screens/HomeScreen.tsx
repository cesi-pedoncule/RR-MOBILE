import React, { useState } from 'react';
import { Image, View } from 'react-native';
import ButtonShowMoreItems from '../components/buttonShowMoreItems';
import NavBar from '../components/NavBar';
import ResourceCard from '../components/ResourceCard';
import commonStyles from '../styles/commonStyles';

export default function HomeScreen() {
    const [showMoreItems, setShowMoreItems] = useState(false);

    const onClickShowMoreItems = () => {
        setShowMoreItems(true);
        alert('Load more items');
    }

    return (
        <View style={commonStyles.container}>
            <Image source={require('../assets/rr-logo.png')} style={commonStyles.logo} />
            <View style={commonStyles.content}>
                <View style={commonStyles.resourcesContainer} >
                    <ResourceCard title='Resource of test' user='usertest' description='Lorem ipsum bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ...' />
                    <ResourceCard title='Resource of test' user='usertest' description='Lorem ipsum bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ...' />
                    {
                        !showMoreItems ?
                        <ButtonShowMoreItems callBack={onClickShowMoreItems} />
                        : null
                    }
                </View>
            </View>
            <NavBar/>
        </View>
    );
};
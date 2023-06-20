import { ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import IconButton from '../../../Components/Button/IconButton'
import TopBar from '../../../Components/Input/TopBar'
import CommonStyles from '../../../Styles/CommonStyles'
import { NavigationParamList } from '../../../Types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView } from 'react-native-gesture-handler'
import AdminResourceValidateStyles from '../../../Styles/Screen/Admin/Resource/AdminResourceValidateStyles'
import ResourceCardWithUser from '../../../Components/Card/Resource/ResourceCardWithUser'
import { APIValidationStateCreate, Resource, ValidationStateBuilder } from 'rr-apilib'
import InputButton from '../../../Components/Button/InputButton'
import { instanceOf } from 'prop-types'

type Props = NativeStackScreenProps<NavigationParamList, 'AdminResourceValidate'>;

export default function AdminResourceValidateScreen({ route, navigation }: Props) {

    const client = route.params.client;
    const resourceData = route.params.resource;

    const [ resource, setResource ] = useState<Resource | undefined>(resourceData);
    const [ newValidationState ] = useState<ValidationStateBuilder>(new ValidationStateBuilder());
    const [ isLoadingAccept, setIsLoadingAccept ] = useState<boolean>(false);
    const [ isLoadingRefused, setIsLoadingRefused ] = useState<boolean>(false);

    const onRefresh =  () => {
        const refreshResources: Resource | undefined = client.resources.cache.get(resourceData.id);
        setResource(undefined);
        setResource(refreshResources);
    };

    const onClickOnClickChangeState = async (state: APIValidationStateCreate.Validated | APIValidationStateCreate.Rejected) => {
        state === APIValidationStateCreate.Validated ? setIsLoadingAccept(true) : setIsLoadingRefused(true);
        
        if(resource && client.auth.me) {
            try {
                newValidationState.setResource(resource);
                newValidationState.setState(state);
                newValidationState.setModerator(client.auth.me);

                await resource.validations.create(newValidationState); 

                navigation.goBack();
            } catch (error) {
                ToastAndroid.show("Problème lors de la modification de l'utilisateur" , ToastAndroid.CENTER);
            }
        }            
        setIsLoadingAccept(false);
        setIsLoadingRefused(false);
    };

    return (
        <View style={CommonStyles.container}>
            <TopBar hideSearchBar={true} hideHomeButton={false} navigation={navigation} client={client}/>
            <View style={CommonStyles.content}>
                <View style={{ marginTop : 20, paddingHorizontal: 15 }}>
                    <IconButton iconStyle={CommonStyles.returnBtnInFlatList} callBack={() => navigation.goBack()} iconSize={24} iconName={"arrow-left-top"}/> 
                </View>
                <ScrollView contentContainerStyle={AdminResourceValidateStyles.scrollViewContainer}>
                    {
                        resource &&
                        <ResourceCardWithUser resourceData={resource} styleContainer={AdminResourceValidateStyles.resourceContainer} navigation={navigation} onDoubleClick={onRefresh}/>
                    }
                    <View style={AdminResourceValidateStyles.buttonsContainer}>
                        <InputButton label={'Accpeter'} isDisabled={isLoadingAccept || isLoadingRefused} isLoading={isLoadingAccept} callBack={() => onClickOnClickChangeState(APIValidationStateCreate.Validated)} style={AdminResourceValidateStyles.sendButton}/>
                        <InputButton label={'Refuser'} isDisabled={isLoadingAccept || isLoadingRefused} isLoading={isLoadingRefused} callBack={() => onClickOnClickChangeState(APIValidationStateCreate.Rejected)} style={AdminResourceValidateStyles.sendButton}/>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
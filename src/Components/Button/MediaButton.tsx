import { Text, TouchableOpacity, View } from "react-native"
import { COLORS } from "../../Styles/Colors"
import ButtonFileStyles from "../../Styles/Components/Button/ButtonFileStyles"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Attachment } from "rr-apilib";
import * as Linking from 'expo-linking';
import CommonStyles from "../../Styles/CommonStyles";

interface Props {
    attachment: Attachment|File;
}

export default function MediaButton ({ attachment }: Props) {

    const fileName = attachment instanceof File ? attachment.name : attachment.fileName;

    const handleDownloadFile = async () => {
        if (attachment instanceof File) {
            console.log("cheh download file without in form")
        } else {
            await Linking.openURL(attachment.fileUrl);
        }
    }

    return (
        <TouchableOpacity style={ButtonFileStyles.container} onPress={handleDownloadFile}>
            <MaterialCommunityIcons name="arrow-down" size={24} color={ COLORS.Black }/>
            <View style={ButtonFileStyles.text}>
                <Text style={CommonStyles.textEmptyResult}>{ fileName }</Text>
            </View>
        </TouchableOpacity>
    );
}
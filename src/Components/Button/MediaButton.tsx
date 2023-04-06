import { Text, TouchableOpacity } from "react-native"
import { COLORS } from "../../Styles/Colors"
import ButtonFileStyles from "../../Styles/Components/Button/ButtonFileStyles"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Attachment } from "rr-apilib";
import * as Linking from 'expo-linking';

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
            <Text style={{ color: COLORS.Black }}>{ fileName }</Text>
        </TouchableOpacity>
    );
}
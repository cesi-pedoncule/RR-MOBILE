import { Text, TouchableOpacity } from "react-native"
import { COLORS } from "../../Styles/Colors"
import ButtonFileStyles from "../../Styles/Components/Button/ButtonFileStyles"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Attachment, Client } from "rr-apilib";

interface Props {
    client: Client;
    attachment: Attachment|File;
}

export default function MediaButton ({ client, attachment }: Props) {

    const fileName = attachment instanceof File ? attachment.name : attachment.fileName;

    const handleDownloadFile = () => {
        console.log("Download file ", fileName);
        console.log('attachment', attachment, typeof attachment)
    }

    return (
        <TouchableOpacity style={ButtonFileStyles.container} onPress={handleDownloadFile}>
            <MaterialCommunityIcons name="arrow-down" size={24} color={ COLORS.Black }/>
            <Text style={{ color: COLORS.Black }}>{ fileName }</Text>
        </TouchableOpacity>
    );
}
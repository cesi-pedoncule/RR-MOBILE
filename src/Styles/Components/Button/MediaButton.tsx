import { Text, TouchableOpacity } from "react-native"
import { COLORS } from "../../Colors"
import ButtonFileStyles from "./ButtonFileStyles"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Attachment } from "rr-apilib";

interface Props {
    attachment: Attachment|File;
}

export default function MediaButton ({ attachment }: Props) {

    const fileName = attachment instanceof File ? attachment.name : attachment.fileName;

    const handleDownloadFile = () => {
        console.log("Download file ", fileName);
    }

    return (
        <TouchableOpacity style={ButtonFileStyles.container} onPress={handleDownloadFile}>
            <MaterialCommunityIcons name="arrow-down" size={24} color={ COLORS.Black }/>
            <Text style={{ color: COLORS.Black }}>{ fileName }</Text>
        </TouchableOpacity>
    );
}
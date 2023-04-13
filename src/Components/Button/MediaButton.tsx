import { Text, ToastAndroid, TouchableOpacity, View } from "react-native"
import { COLORS } from "../../Styles/Colors"
import ButtonFileStyles from "../../Styles/Components/Button/ButtonFileStyles"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Attachment, AttachmentBuilder, Resource } from "rr-apilib";
import * as Linking from 'expo-linking';
import CommonStyles from "../../Styles/CommonStyles";
import IconButton from "./IconButton";
import { AttachmentDataFile } from "rr-apilib/lib/builders/AttachmentBuilder";

interface Props {
    attachmentsBuilder?: AttachmentBuilder[],
    setAttachementsBuilder?: React.Dispatch<React.SetStateAction<AttachmentBuilder[]>>,
    attachementsToDelete?: Attachment[],
    setAttachementsToDelete?: React.Dispatch<React.SetStateAction<Attachment[]>>,
    attachementsToShow?: Attachment[],
    setAttachementsToShow?: React.Dispatch<React.SetStateAction<Attachment[]>>,
    attachment: AttachmentDataFile | Attachment;
    idAttachement: number;
    isDeleted:boolean;
}

export default function MediaButton ({ attachment, isDeleted, attachmentsBuilder, setAttachementsBuilder, attachementsToDelete, setAttachementsToDelete, attachementsToShow, setAttachementsToShow, idAttachement }: Props) {

    const fileName = attachment instanceof Attachment ? attachment.fileName : attachment.name;

    const handleDownloadFile = async () => {
        if (attachment instanceof Attachment) {
            await Linking.openURL(attachment.fileUrl);
        } else {
            console.log("cheh download file without in form");
            ToastAndroid.show("Impossible de télécharger car le fichier n'est pas encore publié" , ToastAndroid.CENTER);
        }
    }

    const onDeleteFile = async () => {
        if(attachmentsBuilder && setAttachementsBuilder){
            attachmentsBuilder.splice(idAttachement,1);
            setAttachementsBuilder([...attachmentsBuilder]);
        } else if (attachementsToDelete && setAttachementsToDelete && attachementsToShow && setAttachementsToShow && attachment instanceof Attachment) {
            attachementsToDelete.push(attachment);
            attachementsToShow.splice(idAttachement, 1);
            setAttachementsToShow([...attachementsToShow]);
            setAttachementsToDelete([...attachementsToDelete]);
        }
    };

    return (
        <TouchableOpacity style={ButtonFileStyles.container} onPress={handleDownloadFile}>
            <MaterialCommunityIcons name="arrow-down" size={24} color={ COLORS.Black }/>
            <View style={ButtonFileStyles.text}>
                <Text style={CommonStyles.textEmptyResult}>{ fileName }</Text>
            </View>
            {
                isDeleted && <IconButton callBack={onDeleteFile} iconStyle={ButtonFileStyles.buttonDeleteFile} iconSize={24} iconName={"delete-outline"} iconColor={COLORS.Black}/>
            }
        </TouchableOpacity>
    );
}
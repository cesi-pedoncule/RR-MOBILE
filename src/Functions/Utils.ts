import React from "react";
import { ToastAndroid } from "react-native";
import { Resource } from "rr-apilib";

export async function likeClickHandle(resource: Resource, setResource: React.Dispatch<React.SetStateAction<Resource>>) {
    if (resource.client.auth.me) { 
        const newResource = resource.isLiked ? await resource.unlike() : await resource.like();
        newResource && setResource(newResource);
    } else {
        ToastAndroid.show("Vous devez être connecté pour aimer une ressource" , ToastAndroid.CENTER);
    }
}
import React from "react";
import { Resource } from "rr-apilib";

export async function likeClickHandle(resource: Resource, setResource: React.Dispatch<React.SetStateAction<Resource>>) {
    if (resource.client.auth.me) {
        if(resource.isLiked()){
            const newResource= await resource.unlike();
            newResource && setResource(resource);
        } else {
            const newResource= await resource.like();
            newResource && setResource(resource);
        }     
    } else {
        alert("Vous devez être connecté pour liker une ressource");
    }
}
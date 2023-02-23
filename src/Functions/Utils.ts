import React from "react";
import { Resource } from "rr-apilib";

export function likeClickHandle(resource: Resource, isLikeResource: boolean, setIsLikeResource: React.Dispatch<React.SetStateAction<boolean>>, numberLike: number, setNumberLike: React.Dispatch<React.SetStateAction<number>>) {
    if (resource.client.auth.me) {
        isLikeResource ? resource.unlike() : resource.like();
        setIsLikeResource(!isLikeResource);
        setNumberLike(isLikeResource ? numberLike - 1 : numberLike + 1);
    } else {
        alert("Vous devez être connecté pour liker une ressource");
    }
}
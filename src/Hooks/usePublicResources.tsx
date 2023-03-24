import { useEffect, useState } from 'react';
import { Client, Resource } from 'rr-apilib';

interface Props {
    client: Client;
}

export default function usePublicResources({ client }: Props) {
    const [ resources, setResources ] = useState<Resource[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<any>();

    useEffect(() => {

        if (loading) {
            client.resources.fetchAll().then((resources) => {
                setResources(Array.from(resources.filter(resource => resource.isPublic == true).values()));
                setLoading(false);
            }).catch((error: any) => {
                setError(error);
                setLoading(false);
            });
        }

    }, [resources, loading]);


    return { 
        resources,
        setResources,
        loading, 
        error 
    }
}
import { useEffect, useState } from 'react';
import { Category, Client } from 'rr-apilib';

interface Props {
    client: Client;
}

export default function useCategories({ client }: Props) {
    const [ categories, setCategories ] = useState<Category[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<any>();

    useEffect(() => {

        if (loading) {
            client.categories.fetchAll().then((categories) => {
                setCategories(Array.from(categories.values()));
                setLoading(false);
            }).catch((error: any) => {
                setError(error);
                setLoading(false);
            });
        }

    }, [categories, loading]);


    return { 
        categories,
        setCategories,
        loading, 
        error 
    }
}
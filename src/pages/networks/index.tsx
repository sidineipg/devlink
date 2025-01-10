
import { useState, FormEvent, useEffect } from 'react';
import { Header } from "../../components/header";
import { Input } from "../../components/input";

import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from 'firebase/firestore';



export function Networks() {
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [youtube, setYoutube] = useState('');

    useEffect(() => {
        async function loadLinks() {
            const docRef = doc(db, "social", "link");
            getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.data()!==undefined) {
                    setFacebook(docSnap.data()?.facebook);
                    setInstagram(docSnap.data()?.instagram);
                    setYoutube(docSnap.data()?.youtube);
                }
            })

        }

        loadLinks();
    }, [])


    function handleRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            facebook: facebook,
            instagram: instagram,  
            youtube: youtube
        })
        .then(() => {
            console.log('Cadastrado com sucesso'); 
        })
        .catch((error) => {
            console.log('Erro ao cadastrar o link');
            console.log(error);
        })
    }


    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas Redes Sociais</h1>

            <form 
            onSubmit={handleRegister}
            className="flex flex-col max-w-xl w-full">
                <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                <Input
                    placeholder="Digita a Url do facebook..."
                    type="url"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do instagram</label>
                <Input
                    placeholder="Digita a Url do instagram..."
                    type="url"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do Youtube</label>
                <Input
                    placeholder="Digita a Url do youtube..."
                    type="url"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                />

                <button
                    className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium"
                    type="submit"
                >
                    Salvar Links
                </button>

            </form>
        </div>
    )
}
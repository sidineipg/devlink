import { useState, useEffect } from "react"
import { Social } from "../../components/social"
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa"
import { db } from "../../services/firebaseConnection"
import { getDocs, collection, orderBy, query, doc, getDoc } from "firebase/firestore"

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

interface SocialLinksProps {
    facebook: string;
    instagram: string;
    youtube: string;
}



export function Home() {

    const [links, setLinks] = useState<LinkProps[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

    useEffect(() => {
        function loadLinks() {
            const linksRef = collection(db, "links");
            const queryRef = query(linksRef, orderBy("createdAt", "asc"));

            getDocs(queryRef)
                .then((snapshot) => {
                    let lista = [] as LinkProps[];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            name: doc.data().name,
                            url: doc.data().url,
                            bg: doc.data().bg,
                            color: doc.data().color
                        })
                    })

                    setLinks(lista);
                })
        }

        loadLinks();

    }, [])

    useEffect(() => {
        function loadSocialLinks() {
            const docRef = doc(db, "social", "link");
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.data() !== undefined) {
                        setSocialLinks({
                            facebook: docSnap.data()?.facebook,
                            instagram: docSnap.data()?.instagram,
                            youtube: docSnap.data()?.youtube
                        });
                    }
                })
        }

        loadSocialLinks();

    }, [])


    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">SPG Sistemas</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">

                {links.map((item) => {
                    return (
                        <section key={item.id}
                            style={{ backgroundColor: item.bg }}

                            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                            <a
                                href={item.url} target="_blank" rel="noreferrer">
                                <p className="md:text-lg text-base"
                                    style={{ color: item.color }}
                                >
                                    {item.name}
                                </p>
                            </a>
                        </section>
                    )
                })

                }

                {
                    socialLinks && Object.keys(socialLinks).length > 0 && (
                        <footer className="flex justify-center gap-3 my-4">
                            <Social url={socialLinks?.youtube}>
                                <FaYoutube size={35} color="#FFF" />
                            </Social>

                            <Social url={socialLinks?.facebook}>
                                <FaFacebook size={35} color="#FFF" />
                            </Social>

                            <Social url={socialLinks?.instagram}>
                                <FaInstagram size={35} color="#FFF" />
                            </Social>

                        </footer>
                    )
                }


            </main>

        </div>
    )
}
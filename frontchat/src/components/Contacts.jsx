import { useEffect, useState } from "react";
import { useSocketContext } from "./ContextSocket";
import axios from "axios";
import { user } from "../../../backchat/src/models/User";

export default function Example({ setViewChat, viewChat, currentUser, setUserClicked, viewContacts, setViewContacts }) {
    const [contacts, setContacts] = useState([]);
    const BASE_URL =  "http://localhost:3001/";
    // "https://chat-socket-eb53a2dd15bb.herokuapp.com/" ||
    const { socket } = useSocketContext();

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = async () => {
        await axios.get(`${BASE_URL}users`)
            .then(response => {
                setContacts(response.data);
            })
            .catch(err => console.error(err));
    }

    return (
        <ul role="list" className="divide-y divide-gray-100 pl-5 w-96 h-96  ">
            {contacts ? (
                contacts.map((person) => {
                    if (person.email !== currentUser) {
                        return (
                            <li key={person.email} className="flex justify-between  py-5">
                                <div 
                                  className="flex min-w-0 gap-x-4 cursor-pointer" 
                                  onClick={() => {
                                    if(window.innerWidth > 768){
                                        setViewChat(!viewChat)
                                        setUserClicked(person);
                                    }else if(window.innerWidth < 768){
                                        setUserClicked(person);
                                        setViewContacts(!viewContacts);
                                        setViewChat(true);
                                    }
                                    }}
                                >
                                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://source.unsplash.com/random/70x70" alt="" />
                                    <div className="min-w-0 flex-auto">
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500"><strong>{person.email}</strong></p>
                                    </div>
                                    {
                                        person.isOn && (
                                            <div className="mt-1 flex items-center gap-x-1.5">
                                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                                                </div>
                                                <p className="text-xs leading-5 text-gray-500">Online</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </li>
                        );
                    }
                })
            ) : (
                <h1 className="flex justify-center">Sem Contatos</h1>
            )}
        </ul>
    )
}

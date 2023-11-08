import { useEffect, useState } from "react";
import { useSocketContext } from "./ContextSocket";
import axios from "axios";

export default function Example({ setViewChat, viewChat, currentUser, setUserClicked }) {
    const [contacts, setContacts] = useState([]);
    
    const { socket } = useSocketContext();

    useEffect(() => {
        getContacts();
        
        console.log(contacts);
    }, []);

    const getContacts = async () => {
        await axios.get('http://localhost:3001/users')
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
                            <li key={person.email} className="flex justify-between gap-x-6 py-5">
                                <div 
                                  className="flex min-w-0 gap-x-4 cursor-pointer" 
                                  onClick={() => {
                                    setViewChat(!viewChat)
                                    setUserClicked(person);
                                    }}
                                >
                                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://source.unsplash.com/random/70x70" alt="" />
                                    <div className="min-w-0 flex-auto">
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500"><strong>{person.email}</strong></p>
                                    </div>
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

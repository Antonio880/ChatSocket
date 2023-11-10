import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSocketContext } from "../components/ContextSocket";
import Chat from "../components/Chat/Chat";
import Contacts from "../components/Contacts";
import { useUserContext } from "../components/ContextUser";

export default function Home() {
  const [viewChat, setViewChat] = useState(false);
  const { socket } = useSocketContext();
  const [ userClicked, setUserClicked] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const { user } = useUserContext();
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    socket.emit("get_username");

    socket.on("receive_username", (username) => {
            setCurrentUser(username);
        });
  },[]);

  useEffect(() => {
    axios.get("http://localhost:3001/messages")
    .then((response) => {
      const messages = [...response.data];

      for (let i = 0; i < messages.length - 1; i++) {
        const currentMessage = messages[i];
        const nextMessage = messages[i + 1];

        if (currentMessage.text === nextMessage.text) {
          // Remove a mensagem atual se o texto for igual ao próximo
          messages.splice(i, 1);
          i--; // Decrementa o índice para verificar novamente a posição atual
        }
      }

      setMessageList(messages);
    })
      .catch((e) => console.error(`Error sending - ${e}`));
  }, []);

  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-row"> 
        <Contacts setViewChat={setViewChat} viewChat={viewChat} currentUser={currentUser} setUserClicked={setUserClicked}/>
        {viewChat && (
          <div className="items-center justify-center h-96 w-full ">
            <Chat userClicked={userClicked} messageList={messageList} setMessageList={setMessageList} />
          </div>
        )}
      </div>
    </div>
  );
}

import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSocketContext } from "../components/ContextSocket";
import Chat from "../components/Chat/Chat";
import Contacts from "../components/Contacts";

export default function Home() {
  const [viewChat, setViewChat] = useState(false);
  const { socket } = useSocketContext();
  const [ userClicked, setUserClicked] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    socket.emit("get_username");

    socket.on("receive_username", (username) => {
            setCurrentUser(username);
        });
  },[]);

  // useEffect(() => {
  //   axios.get("http://localhost:3001/messages")
  //     .then((response) => {
  //       setMessageList(response.data)
  //       console.log(messageList);
  //     })
  //     .catch((e) => console.error(`Error sending - ${e}`));
  // }, []);

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

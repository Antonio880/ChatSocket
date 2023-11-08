import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useSocketContext } from "../ContextSocket";
import { useUserContext } from "../ContextUser";

export default function Chat({ userClicked }) {
  const messageRef = useRef();
  const { socket } = useSocketContext();
  const [messageList, setMessageList] = useState([]);
  const { user } = useUserContext();

  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message || !message.trim()) return;

    socket.emit("message", {
      text: message,
      userRec: userClicked._id,
      userEnv: user._id
    });
    messageRef.current.value = "";
  };

  useEffect(() => console.log(messageList), [messageList]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessageList((current) => [...current, data]);
    });

    return () => socket.off("receiveMessage");
  }, [socket]);

  return (
    <div className="w-3/4 h-4/3 mx-auto p-4 mt-20 bg-gray-100 rounded-md shadow-md ">
      <div className="h-80 overflow-y-auto">
        {messageList &&
          messageList.map((message, index) => (
            <div key={index} className="mb-4">
              {message.userRec &&
                message.userEnv &&
                message.userRec === userClicked._id &&
                message.userEnv === user._id ? (
                  <div>
                      <div>
                        <div className="text-indigo-600 font-bold">
                          {message.author}
                        </div>
                        <div className="bg-white w-56 overflow-x-auto p-2 rounded-md shadow-md">
                          {message.text}
                        </div>
                      </div>
                  </div>
                ): (
                  <div className="bg-sky flex flex-col">
                    {console.log(message, socket.id)}
                    <div className="flex justify-end text-indigo-600 font-bold">
                      {message.author}
                    </div>
                    <div className="flex justify-end bg-white overflow-x-auto w-96 p-3 ml-60 rounded-md shadow-md">
                      <p className="pr-2">{message.text}</p>
                    </div>
                  </div>
                )}
            </div>
          ))}
      </div>
      <div className="mt-4">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-md border py-2 px-3 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
          placeholder="Digite sua mensagem..."
          ref={messageRef}
        />
      </div>
      <div className="mt-2">
        <button
          className="w-full bg-indigo-600 text-white rounded-md py-2"
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

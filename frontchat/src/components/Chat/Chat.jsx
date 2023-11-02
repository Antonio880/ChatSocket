import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useSocketContext } from "../ContextSocket";

export default function Chat() {
  const messageRef = useRef();
  const { socket } = useSocketContext();
  const [messageList, setMessageList] = useState([]);

  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;

    socket.emit("message", message);
    messageRef.current.value = "";
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessageList((current) => [...current, data]);
    });

    return () => socket.off("receiveMessage");
  }, [socket]);

  return (
    <div className="w-96 mx-auto mt-10 p-4 mt-40 bg-gray-100 rounded-md shadow-md">
      <div className={`h-80 overflow-y-auto`}>
        {messageList &&
          messageList.map((message, index) => (
            <div key={index} className="mb-4">
              {message.authorId === socket.id ? (
                <div>
                  <div className="text-indigo-600 font-bold">
                    {message.author}
                  </div>
                  <div className="bg-white w-56 overflow-x-auto p-2 rounded-md shadow-md">
                    {message.text}
                  </div>
                </div>
              ) : (
                <div className="bg-sky">
                  <div className="flex justify-end text-indigo-600 font-bold">
                    {message.author}
                  </div>
                  <div className="flex justify-end bg-white overflow-x-auto w-56 p-2 ml-32 rounded-md shadow-md">
                    {message.text}
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

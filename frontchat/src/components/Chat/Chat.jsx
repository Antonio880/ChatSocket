import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useSocketContext } from "../ContextSocket";
import { useUserContext } from "../ContextUser";
import axios from "axios";

export default function Chat({
  userClicked,
  messageList,
  setMessageList,
  setViewChat,
  setViewContacts,
  viewDetailsContact,
  setViewDetailsContact
}) {
  const messageRef = useRef();
  const { socket } = useSocketContext();
  const { user } = useUserContext();
  
  const BASE_URL = "http://localhost:3001/";
  // "https://chat-socket-eb53a2dd15bb.herokuapp.com/" ||
  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message || !message.trim()) return;
    const newMessage = {
      text: message,
      userRec: userClicked._id,
      userEnv: user._id,
    };
    socket.emit("message", newMessage);
    messageRef.current.value = "";
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      axios
        .post(`${BASE_URL}messages`, data)
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));

      setMessageList((current) => [...current, data]);
    });

    return () => socket.off("receiveMessage");
  }, [socket]);

  useEffect(() => {
    setMessageList(() => {
      const messages = [];
      for (const message of messageList) {
        if (message.userEnv === user._id) {
          message.authorId = socket.id;
        }
        messages.push(message);
      }
      return messages;
    });
  }, []);

  

  return (
    <div
      className={`h-4/3 mx-auto p-4 mt-6 bg-gray-100 rounded-md shadow-md ${viewDetailsContact && "w-[800px]"} ${
        window.innerWidth < 768 ? "w-full h-[400] px-10" : "w-3/4 mt-20"
      }`}
    >
      {window.innerWidth < 768 && (
        <div className="flex justify-start">
          <button
            className="w-20 bg-indigo-600 text-white rounded-md py-2"
            onClick={() => {
              setViewChat(false);
              setViewContacts(false);
            }}
          >
            Voltar
          </button>
        </div>
      )}
      <div
        className="flex mb-3 justify-between cursor-pointer bg-gray-200 gap-x-6 hover:border-solid rounded-md transition ease-in-out delay-150 hover:text-white hover:-translate-y-1 hover:scale-20 duration-100 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        onClick={() => setViewDetailsContact(!viewDetailsContact)}
      >
        <div className="flex px-4 py-2 min-w-0 gap-x-4">
          <img
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
            src="https://source.unsplash.com/random/70x70"
            alt=""
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              <strong>
                {userClicked.username}
              </strong>
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              <strong>
                {userClicked.email}
              </strong>
            </p>
          </div>
        </div>
        <div className="pr-3 pt-3 shrink-0 sm:flex sm:flex-col sm:items-end">
          {userClicked.isOn && (
            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1 ">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs leading-5 text-gray-500">Online</p>
            </div>
          )}
        </div>
      </div>
      <div className="h-80 overflow-y-auto">
        {messageList &&
          messageList.map(function (message, index) {
            return (
              <div key={index} className="mb-4">
                {userClicked && message ? (
                  (message.userRec === userClicked._id &&
                    message.userEnv === user._id) ||
                  (message.userRec === user._id &&
                    message.userEnv === userClicked._id) ? (
                    message.authorId === socket.id ? (
                      <div>
                        <div>
                          <div className="text-indigo-800 truncate font-bold">
                            {message.author}
                          </div>
                          <div className="w-full">
                            <p className="flex p-2 justify-start bg-white rounded-md shadow-md md:mr-96">
                              {message.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className=" flex flex-col">
                        <div className="flex justify-end truncate text-indigo-500 font-bold">
                          {message.author}
                        </div>
                        <div className="w-full ">
                          <p className="flex p-2 justify-end bg-white rounded-md shadow-md md:ml-96">
                            {message.text}
                          </p>
                        </div>
                      </div>
                    )
                  ) : null
                ) : null}
              </div>
            );
          })}
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
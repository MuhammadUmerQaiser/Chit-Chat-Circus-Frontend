"use client";
import Pusher from "pusher-js";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "../Axios/AxiosInstance";
import { toast } from "react-toastify";
export default function ChatMessages({ userDetailOfOpenedChat, loggedInUser }) {
  const [message, setMessage] = useState("");
  const [conversations, setConversation] = useState("");
  const token = localStorage.getItem("token");
  const capitalizedFirstNameOfRecieverUser =
    userDetailOfOpenedChat?.name.charAt(0).toUpperCase() +
    userDetailOfOpenedChat?.name.slice(1);
  const capitalizedFirstNameOfSenderUser =
    loggedInUser?.name.charAt(0).toUpperCase() + loggedInUser?.name.slice(1);

  useEffect(() => {
    getAllConversation();
    getDataFromPusher();
  }, []);

  const getDataFromPusher = () => {
    Pusher.logToConsole = true;
    var pusher = new Pusher("2f89e0a386b9a93d5543", {
      cluster: "ap1",
    });
    var channel = pusher.subscribe("chitchatcircus");
    channel.bind("message", function (data) {
      getAllConversation();
    });
  };

  const getAllConversation = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`get-all-conversation?reciever_id=${userDetailOfOpenedChat?.id}`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response?.data)
        setConversation(response?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  const sendUserMessage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("reciever_id", userDetailOfOpenedChat?.id);
    formData.append("message", message);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .post("chat", formData, {
        headers: headers,
      })
      .then((response) => {
        setMessage("");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };
  return (
    <>
      <div className="flex flex-col h-full overflow-x-auto mb-4">
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-12 gap-y-2">
            {conversations?.data?.map((conversation) => {
              if (conversation?.sender?.id == loggedInUser?.id) {
                return (
                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        <Image
                          src={loggedInUser?.user_image}
                          alt="Sender Image"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                        <div>{conversation?.message[0]?.message}</div>
                      </div>
                    </div>
                  </div>
                );
              }

              else{
                return (
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    <div className="flex flex-row items-center">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        <Image
                          src={userDetailOfOpenedChat?.user_image}
                          alt="Reciever Image"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div>{conversation?.message[0]?.message}</div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
        <div>
          <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-grow ml-4">
          <div className="relative w-full">
            <input
              type="text"
              name="message"
              value={message}
              placeholder="Type a message..."
              className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter" && message != "") {
                  sendUserMessage(e);
                }
              }}
            />
            <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="ml-4">
          <button
            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
            onClick={(e) => sendUserMessage(e)}
            disabled={message == "" ? true : false}
          >
            <span>Send</span>
            <span className="ml-2">
              <svg
                className="w-4 h-4 transform rotate-45 -mt-px"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

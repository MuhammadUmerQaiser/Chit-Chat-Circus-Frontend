"use client";
import axios from "@/components/Axios/AxiosInstance";
import ChatComponent from "@/components/Chat/ChatComponent";
import ChatSidebar from "@/components/Chat/ChatSidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [allUsers, setAllUsers] = useState();
  const [isSomeoneChatOpen, setIsSomeoneChatOpen] = useState(false);
  const [userDetailOfOpenedChat, setUserDetailOfOpenedChat] = useState();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      toast.warning("Please login");
    } else {
      getAllUser();
    }
  }, []);

  const openSomeoneChat = () => {
    setIsSomeoneChatOpen(true);
  };

  const getTheDetailOfOpenedChatUser = (user) => {
    setUserDetailOfOpenedChat(user);
  };

  const getAllUser = () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get("get-all-user", {
        headers: headers,
      })
      .then((response) => {
        setAllUsers(response?.data?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <ChatSidebar
          userDetail={user}
          allUsersDetail={allUsers}
          someOneChatOpen={openSomeoneChat}
          userDetailOfOpenedChat={getTheDetailOfOpenedChatUser}
        />
        <ChatComponent
          someOneChatOpen={isSomeoneChatOpen}
          userDetailOfOpenedChat={userDetailOfOpenedChat}
        />
      </div>
    </div>
  );
}

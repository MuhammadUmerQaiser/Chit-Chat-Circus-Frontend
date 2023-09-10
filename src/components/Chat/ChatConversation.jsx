import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";

export default function ChatConversation({userDetailOfOpenedChat}) {
  return (
    <>
      <ChatHeader userDetailOfOpenedChat={userDetailOfOpenedChat} />
      <ChatMessages />
    </>
  );
}

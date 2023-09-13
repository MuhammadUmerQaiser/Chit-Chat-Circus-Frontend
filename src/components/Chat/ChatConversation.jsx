import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";

export default function ChatConversation({userDetailOfOpenedChat, loggedInUser}) {
  return (
    <>
      <ChatHeader userDetailOfOpenedChat={userDetailOfOpenedChat} />
      <ChatMessages loggedInUser={loggedInUser} userDetailOfOpenedChat={userDetailOfOpenedChat} />
    </>
  );
}

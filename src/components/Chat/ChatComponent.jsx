import ChatConversation from "./ChatConversation";
import WelcomeChat from "./WelcomeChat";

export default function ChatComponent({
  someOneChatOpen,
  userDetailOfOpenedChat,
}) {
  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        {someOneChatOpen ? (
          <ChatConversation userDetailOfOpenedChat={userDetailOfOpenedChat} />
        ) : (
          <WelcomeChat />
        )}
      </div>
    </div>
  );
}

export default function ChatUsersList({
  allUsersDetail,
  someOneChatOpen,
  userDetailOfOpenedChat,
}) {
  const setUserDetailOfOpenedChat = (userDetail) => {
    someOneChatOpen();
    userDetailOfOpenedChat(userDetail);
  };
  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">Active Conversations</span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          {allUsersDetail?.length}
        </span>
      </div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
        {allUsersDetail?.map((userDetail) => {
          const capitalizedFirstName =
            userDetail?.name.charAt(0).toUpperCase() +
            userDetail?.name.slice(1);
          return (
            <button
              className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
              key={userDetail?.id}
              onClick={() => setUserDetailOfOpenedChat(userDetail)}
            >
              <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                {capitalizedFirstName.charAt(0)}
              </div>
              <div className="ml-2 text-sm font-semibold">
                {userDetail?.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

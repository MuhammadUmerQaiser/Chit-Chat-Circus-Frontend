export default function WelcomeChat() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Welcome to ChitChatCircus</h1>
      <p className="text-gray-600 text-center mb-8">
        Connect with friends and start chatting!
      </p>
      <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 ease-in-out">
        Get Started
      </button>
    </div>
  );
}

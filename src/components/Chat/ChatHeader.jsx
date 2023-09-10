import { IoMdCall } from "react-icons/io";
import { BsCameraVideo, BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import { useState } from "react";

export default function ChatHeader({ userDetailOfOpenedChat }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex items-center p-4 bg-white">
      <div className="flex-shrink-0 mr-3">
        <Image
          className="w-10 h-10 rounded-full"
          src={userDetailOfOpenedChat?.user_image}
          alt="User Avatar"
          width={100}
          height={100}
        />
      </div>
      <div className="flex-1">
        <p className="text-lg font-semibold">{userDetailOfOpenedChat?.name}</p>
      </div>
      <div className="relative">
        <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          <IoMdCall />
        </button>
        <button className="ml-2 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600">
          <BsCameraVideo />
        </button>
        <button
          className="ml-2 text-gray-600 hover:text-gray-800"
          onClick={handleDropdownClick}
        >
          <BsThreeDotsVertical />
        </button>
        {showDropdown && (
          <div className="absolute mt-3 right-0 bg-white border rounded-lg shadow-md">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <button>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

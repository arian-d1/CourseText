import HeaderButton from "./HeaderButton";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

import CourseText from "../assets/CourseText.svg";
import LibraryIcon from "../assets/library.svg";
import MessageIcon from "../assets/message.svg";
import UserIcon from "../assets/user.svg";

export default function Header() {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-lg sticky top-0 ">
      <div className="flex flex-1 gap-2 items-baseline">
        <div className="flex max-h-max bg-blue-800/90 p-2 rounded-md ">
          <HeaderButton url="/" src={CourseText} alt={"Logo"} />
        </div>
        <p className="text-3xl font-semibold tracking-wide text-gray-800">
          CourseText
        </p>
      </div>

      <div className="flex-1 flex justify-center">
        <HeaderButton url="/listings" src={LibraryIcon} alt={"Market"} />
      </div>
      <div className="flex-1 flex justify-end gap-4">
        <HeaderButton
          url={auth.state ? "/messages" : "/log-in"}
          src={MessageIcon}
          alt={"Messages"}
        />
        <HeaderButton url="/log-in" src={UserIcon} alt={"Profile"} />
      </div>
    </div>
  );
}

import {
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import { useCookies } from "react-cookie";
import UserList from "./UserList";
import { FaUsers, FaArrowAltCircleLeft } from "react-icons/fa";
import { useState } from "react";

const MessangingContainer = ({ users }) => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [userListVisible, setUserListVisible] = useState(false);

  const logout = () => {
    removeCookie("Name", cookies.Name);
    removeCookie("HashedPassword", cookies.HashedPassword);
    removeCookie("UserId", cookies.UserId);
    removeCookie("AuthToken", cookies.AuthToken);

    window.location.reload();
  };
  return (
    <div className="messaging-container">
      {!userListVisible && (
        <Window>
          <FaUsers className="icon" onClick={() => setUserListVisible(true)} />
          <ChannelHeader />
          <MessageList />
          <MessageInput />
          <button className="standard-button" onClick={logout}>
            Logout
          </button>
        </Window>
      )}
      {userListVisible && (
        <Window>
          <div className="chat-container">
            <FaArrowAltCircleLeft
              className="icon"
              onClick={() => setUserListVisible(false)}
            />
            <ChannelHeader title="Users" />
            <UserList users={users} />
          </div>
        </Window>
      )}
      <Thread />
    </div>
  );
};

export default MessangingContainer;

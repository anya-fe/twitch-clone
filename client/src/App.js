import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { StreamChat } from "stream-chat";
import { Chat, Channel, Thread } from "stream-chat-react";
import Auth from "./components/Auth";
import MessagingContainer from "./components/MessagingContainer";
import Video from "./components/Video";
import "stream-chat-css/dist/css/index.css";

const client = StreamChat.getInstance("h96atgyage7k");

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [channel, setChannel] = useState(null);
  const [users, setUsers] = useState(null);

  const authToken = cookies.AuthToken;

  useEffect(() => {
    async function authUser() {
      if (authToken) {
        const { users } = await client.queryUsers({ role: "user" });
        setUsers(users);
      }
    }
    authUser();
  }, [authToken]);

  const setupClient = async () => {
    try {
      await client.connectUser(
        {
          id: cookies.UserId,
          name: cookies.Name,
          hashedPassword: cookies.HashedPassword,
        },
        authToken
      );

      const channel = await client.channel("gaming", "gaming-demo", {
        name: "Gaming Femo",
      });

      setChannel(channel);
    } catch (err) {
      console.log(err);
    }
  };

  if (authToken) setupClient();

  return (
    <>
      {!authToken && <Auth />}
      {authToken && (
        <Chat client={client} darkMode={true}>
          <Channel channel={channel}>
            <Video />
            <MessagingContainer users={users} />
            <Thread />
          </Channel>
        </Chat>
      )}
    </>
  );
};

export default App;

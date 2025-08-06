import { useEffect, useContext, useState } from "react";
import { getMessagesByReceiverId } from "../api/message";
import AuthContext from "../context/AuthProvider";
import { getIdByUser } from "../api/users";
import  Message from "./Message";

export default function MessageBoard() {
    
    const {auth, setAuth} = useContext(AuthContext);
    const [user_id, setUserId] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        async function fetchUserId() {
            try {
                const id = await getIdByUser(auth.username);
                setUserId(id);
            } catch (error) {
                console.error("Error fetching user ID:", error);
            }
        }
        fetchUserId();
    }, [auth]);

    // Fetch messages when user_id is set
    useEffect(() => {
        if (!user_id) return;
        async function fetchMessages() {
            try {

                const fetchedMessages = await getMessagesByReceiverId(user_id);
                setMessages(fetchedMessages.data.messages);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }
        fetchMessages();
    }, [user_id]);

    const messageElements = messages.map((msg) => (
        <Message
            key={msg.id}
            sender_id={msg.sender_id}
            receiver_id={msg.receiver_id}
            message={msg.message}
        />
    )); 

    
    return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Messages</h1>

        {messages.length === 0 ? (
          <p className="text-gray-500">You don’t have any messages yet.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <Message
                key={msg.id}
                sender_id={msg.sender_id}
                receiver_id={msg.receiver_id}
                message={msg.message}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
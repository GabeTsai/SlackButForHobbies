'use client';
import { useState, useEffect } from "react";
import pb from "../lib/pocketbase";
const chatpb = pb;

type Message = {
    id: string;
    text: string;
    user: string;
    created: string;
  };

export default function Chat2() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const initialize = async () => {
            try {
                const records = await chatpb.collection("messages").getFullList<Message>();
                setMessages(records);
                console.log(records);
            } catch (error) {
                console.error("Error initializing: ", error);
            }
        }

        initialize();
    }, []);
    
    return (
        <div>
        <h1>Chat 2!!</h1>
        <ul>
            {messages.map((msg) => (
            <li key={msg.id}>
                <strong>{msg.user}:</strong> {msg.text} <em>({msg.created})</em>
            </li>
            ))}
        </ul>
        </div>
    );
}
'use client';
import { RecordModel, RecordSubscription } from "pocketbase";
import { useContext, useEffect, useState } from "react";
import pb from "../../lib/pocketbase";
import { UserContext } from "../../context/userContext";

export default function ChannelPage ( {channel} : {channel:RecordModel}) {
    const [messages, setMessages] = useState<RecordModel[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const userId = useContext(UserContext);
    
    useEffect(() => {
        let unsubscribe: (() => void) | null = null;
        
        const initialize = async () => {
            try {
                const fetch = await pb.collection("messages").getFullList({
                    filter: `channel.id = "${channel.id}"`})
                setMessages(fetch);

                unsubscribe = await pb.collection('messages').subscribe(
                    `*`,
                    (e: RecordSubscription<RecordModel>) => {
                    if (e.action === 'create') {
                        setMessages((prevMessages) => [e.record, ...prevMessages]);
                    }
                    }
                );
            } catch (error) {
                console.error(`Error initializing messages: ${error}`)
            }
        }
        initialize();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    const addMessage = async () => {
        try {
            await pb.collection("messages").create({
                text: newMessage,
                user: userId,
                channel: channel.id
            })
            setNewMessage('');
        } catch (error) {
            console.error(`Error adding message: ${error}`);
        }
    }

    return (
        <div>
            <ul>
            {messages.map((msg) => (
                <li key={msg.id}>
                    <strong>{msg.user}:</strong> {msg.text} <em>({msg.created})</em>
                </li>
            ))}
            </ul>
            <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="placeholder"
            />
            <button onClick={addMessage}>Add Message</button>
        </div>
    );
}
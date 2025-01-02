'use client';

import PocketBase, { RecordSubscription } from 'pocketbase';
import { useState, useEffect } from 'react';
import pb from '../lib/pocketbase';

const testpb = pb;

type Message = {
  id: string;
  message: string;
  user: string;
  created: string;
};

export default function RealTimeMessages() {
  // const [messages, setMessages] = useState<Message[]>([]);
  // const [newMessage, setNewMessage] = useState('');
  // const [response, setResponse] = useState<string | null>(null);
  // useEffect(() => {
    // let unsubscribe: (() => void) | null = null;

    // const initializeSubscription = async () => {
    //   try {
    //     // Fetch existing messages
    //     const records = await pb.collection('messages').getFullList<Message>({
    //       sort: '-created', // Sort by creation date (newest first)
    //     });
    //     setMessages(records);

    //     // Subscribe to real-time updates
    //     unsubscribe = await pb.collection('messages').subscribe(
    //       '*',
    //       (e: RecordSubscription<Message>) => {
    //         if (e.action === 'create') {
    //           setMessages((prevMessages) => [e.record, ...prevMessages]);
    //         }
    //       }
    //     );
    //   } catch (error) {
    //     console.error('Error initializing subscription:', error);
    //   }
    // };

  //   initializeSubscription();

  //   // Clean up subscription on component unmount
  //   return () => {
  //     if (unsubscribe) {
  //       unsubscribe();
  //     }
  //   };
  // }, []);

  // const addMessage = async () => {
  //   try {
  //     const newRecord = await pb.collection('messages').create({
  //       message: newMessage,
  //       user: '3i969m53o08sji6', // Replace this with a valid user ID
  //     });
  //     setResponse('Message added successfully: ' + newRecord.id);
  //     setNewMessage(''); // Clear the input field
  //   } catch (error) {
  //     console.error('Error adding message:', error);
  //     setResponse('Error adding message: ' + (error as Error).message);
  //   }
  // };

  // return (
  //   <div>
  //     <h1>Real-Time Messages</h1>
  //     <div>
  //       <input
  //         type="text"
  //         value={newMessage}
  //         onChange={(e) => setNewMessage(e.target.value)}
  //         placeholder="Write your message here"
  //       />
  //       <button onClick={addMessage}>Add Message</button>
  //       {response && <p>{response}</p>}
  //     </div>
  //     <ul>
  //       {messages.map((msg) => (
  //         <li key={msg.id}>
  //           <strong>{msg.user}:</strong> {msg.message} <em>({msg.created})</em>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
}
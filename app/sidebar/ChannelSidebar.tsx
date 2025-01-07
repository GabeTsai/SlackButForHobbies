'use client';

import React, { useEffect, useState, useContext } from 'react';
import PocketBase, { RecordModel } from 'pocketbase';
import Link from 'next/link';
import { UserContext } from '../context/userContext'; // Import the UserContext
import styles from './ChannelSidebar.module.css';

const db = new PocketBase(process.env.NEXT_PUBLIC_HOST);

export default function ChannelSidebar() {
  const userId = useContext(UserContext); // Get userId from context
  console.log('User ID in ChannelSidebar:', userId); // Log userId in ChannelSidebar
  console.log('NEXT_PUBLIC_HOST:', process.env.NEXT_PUBLIC_HOST);
  const [channels, setChannels] = useState<RecordModel[]>([]);

  useEffect(() => {
    async function fetchChannels() {
      if (!userId) {
        console.log('No user ID found inside useEffect');
        return;
      }
      try {
        console.log('Fetching channels for user:', userId);
        const data = await db.collection('channels').getFullList({
          filter: `member ~ "${userId}"`,
        });
        console.log('Channels:', data); // Log the resolved data
        setChannels(data); // Update the state with the resolved data
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    }

    fetchChannels();
  }, [userId]);
  
  return (
    <div className={styles.channelSidebar}>
      <ul className={styles.homeLink}>
        <li>
          <Link href="/">Home</Link> {/* Link to the home page */}
        </li>
      </ul>
      <h3>Channels</h3>
      <ul className={styles.channelList}>
        {channels.map((channel) => (
          <li key={channel.id}>
            <Link href={`/channels/${channel.id}`}>{channel.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
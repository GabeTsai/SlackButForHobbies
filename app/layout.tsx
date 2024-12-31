// app/layout.tsx
import React from 'react';
import { UserProvider } from './context/userContext';
import ChannelSidebar from './sidebar/ChannelSidebar';
import './globals.css';
import styles from './Layout.module.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div className={styles.container}>
            <nav className={styles.sidebar}>
              <ChannelSidebar />
            </nav>
            <main className={styles.content}>{children}</main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}

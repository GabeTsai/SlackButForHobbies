'use client'; //Render on browser, not server

// export default function Test() {
//   return (
//     <div>
//       <h1>Create Note</h1>
//     </div>
//   );
// }

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateNote() {
  console.log('Host:', process.env.NEXT_PUBLIC_HOST);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const create = async(e: React.FormEvent) => {
    // const db = new PocketBase('process.env.NEXT_PUBLIC_HOST');

    // await db.records.create('notes', {
    //   title,
    //   content,
    // });
    e.preventDefault();
    setError(null);
    try{
      const host = process.env.NEXT_PUBLIC_HOST

      const res = await fetch(`${host}/api/collections/NotesDemo/records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create note');
      }

      setContent('');
      setTitle('');

      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Set the error message in the state
      } else {
        setError('An unknown error occurred');
      }
    }
  }

  return (
    <div>
      <form onSubmit={create}>
        <h3>Create a new Note</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">
          Create note
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

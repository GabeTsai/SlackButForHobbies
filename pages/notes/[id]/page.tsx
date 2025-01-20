import styles from '../Notes.module.css';

async function getNote(noteId: string) {
  const host = process.env.NEXT_PUBLIC_HOST;
  try {
    const res = await fetch(
      `${host}/api/collections/notes/records/${noteId}`,
      {
        next: { revalidate: 10 },
      }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch note');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching note:', error);
    return null;
  }
}

export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);

  if (!note) {
    return <div>Error loading note</div>;
  }

  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div className={styles.note}>
        <h3>{note.title}</h3>
        <h5>{note.content}</h5>
        <p>{note.created}</p>
      </div>
    </div>
  );
}

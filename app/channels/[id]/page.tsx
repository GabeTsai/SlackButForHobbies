import pb from "../../lib/pocketbase";
import ChannelPage from "./channelPage";
import PocketBase from "pocketbase";
// import { UserProvider } from "../../context/userContext";

type PageProps = Promise<{ id: string }>;

const db = new PocketBase(process.env.NEXT_PUBLIC_HOST);

export default async function Page({ params }: {params: PageProps}) {
    const {id} = await params;
    const channel = await db.collection("channels").getOne(id);

    return (
        <div>
            <h1>{channel.name}</h1>
            <ChannelPage channel={channel} />
        </div>
    );
}

// Prerender corresponding pages for each id during build process
export async function generateStaticParams() {
    const channels = await db.collection("channels").getFullList();

    return channels.map((channel: { id: string }) => ({
        id: channel.id,
    }));
}
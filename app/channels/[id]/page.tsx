import pb from "../../lib/pocketbase";
import ChannelPage from "./channelPage";
// import { UserProvider } from "../../context/userContext";

export default async function Page({ params }: { params: { id: string } }) {
    const channel = await pb.collection("channels").getOne(params.id);

    return (
        <div>
            <h1>{channel.name}</h1>
            <ChannelPage channel={channel} />
        </div>
    );
}

// prerender corresponding pages for each id during build process
export async function generateStaticParams() {
    const channels = await pb.collection("channels").getFullList();

    return channels.map((channel: { id: string }) => ({
        id: channel.id,
    }));
}
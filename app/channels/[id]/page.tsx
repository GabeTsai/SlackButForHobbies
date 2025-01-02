import pb from "../../lib/pocketbase";
import ChannelPage from "./channelPage";
// import { UserProvider } from "../../context/userContext";

export default async function getStaticProps({params}: {params: {id: string}}) {
    const channel = await pb.collection("channels").getOne(params.id);

    return (
        // <UserProvider>
            <div>
            <h1> {channel.name} </h1>
            <ChannelPage channel={channel}/>
            </div>
        // </UserProvider>
    );
}
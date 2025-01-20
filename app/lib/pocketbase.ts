import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_HOST);

pb.health.check()
  .then((res) => console.log("PocketBase is healthy:", res))
  .catch((err) => console.error("PocketBase health check failed:", err));
export default pb;

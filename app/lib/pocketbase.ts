import PocketBase from "pocketbase";

const pb = new PocketBase("http://143.198.104.253");

pb.health.check()
  .then((res) => console.log("PocketBase is healthy:", res))
  .catch((err) => console.error("PocketBase health check failed:", err));
export default pb;
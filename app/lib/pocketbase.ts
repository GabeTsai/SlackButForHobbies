import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

pb.health.check()
  .then((res) => console.log("PocketBase is healthy:", res))
  .catch((err) => console.error("PocketBase health check failed:", err));
export default pb;
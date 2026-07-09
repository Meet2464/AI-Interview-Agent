import mongoose from "mongoose";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");  // force IPv4
dns.setServers(["8.8.8.8", "1.1.1.1"]); // use Google/Cloudflare DNS

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected")
    } catch (error) {
        console.log(`databae error ${error}`)
    }
}

export default connectDb
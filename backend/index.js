import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import postModel from "./models/post-models.js";

//importing routes
import { postRouter } from "./routes/post-routes.js";

const app = express();

app.use(express.json());
app.use(cors());

const connectToDb = async () => {
    try {
        await connect('mongodb+srv://satyam23:owJkxmpejFH2pDNJ@atlascluster.pmt5ffa.mongodb.net/node-angular?retryWrites=true&w=majority');
        console.log("Connected to mongoDB :)");
    } catch (error) {
        console.log("Connection failed :(", error);
    }
}
connectToDb();

app.use("/api/posts", postRouter);

app.listen(3000, () => {
    console.log("Server is running on port: 3000 :)");
})
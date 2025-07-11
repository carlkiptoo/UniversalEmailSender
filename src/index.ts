import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import sendEmailRoute from "./api/routes/sendEmail.route";
import { connectToDb } from "./models/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectToDb();

app.use(helmet());
app.use(express.json());


app.use('/v1/send', sendEmailRoute);

app.get('/v1/health', (req, res) => {
    res.status(200).json({status: 'OK', service:'Email Sender'})

});

app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
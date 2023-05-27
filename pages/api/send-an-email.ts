import type { NextApiRequest, NextApiResponse } from 'next';
import { PubSub } from '@google-cloud/pubsub';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const pubSubClient = new PubSub({
            projectId: process.env.GCP_SA_PROJECT_ID,
            credentials: {
                client_email: process.env.GCP_SA_EMAIL,
                private_key: process.env.GCP_SA_KEY,
            }
        });
    
        await pubSubClient.topic('projects/p26-playground/topics/send-an-email').publish(Buffer.from(JSON.stringify({})), {
            name: req.body.name,
            email: req.body.email,
            firestoreEventId: "ccd-pune-2023",
        });
    
        res.status(200).send({});
    } catch (error) {
        res.status(500).send(error);
    }
}

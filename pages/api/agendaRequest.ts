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
    
        await pubSubClient.topic('projects/ccd-2022/topics/df-goa-22-demo').publish(Buffer.from(JSON.stringify({})), {
            name: req.body.name,
            email: req.body.email,
        });
    
        res.status(200).send({});
    } catch (error) {
        res.status(500).send(error);
    }
}

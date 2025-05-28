import type { NextApiRequest, NextApiResponse } from 'next'
import AWS from 'aws-sdk'

AWS.config.update({ region: process.env.AWS_REGION })
const ddb = new AWS.DynamoDB.DocumentClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end()

  const { firstName, lastName, email } = req.body as {
    firstName?: string
    lastName?: string
    email?: string
  }
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'All fields required' })
  }

  try {
    await ddb
      .put({
        TableName: process.env.DYNAMO_TABLE_NAME!,
        Item: {
          email,
          firstName,
          lastName,
          subscribedAt: new Date().toISOString(),
        },
        ConditionExpression: 'attribute_not_exists(email)',
      })
      .promise()

    return res.status(200).json({ success: true })
  } catch (err: any) {
    if (err.code === 'ConditionalCheckFailedException') {
      return res.status(409).json({ error: 'Already subscribed' })
    }
    console.error('DynamoDB error', err)
    return res.status(500).json({ error: 'Could not subscribe' })
  }
}

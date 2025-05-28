import type { NextApiRequest, NextApiResponse } from 'next'
import AWS from 'aws-sdk'

AWS.config.update({
  region: process.env.AWS_REGION,
})

const ses = new AWS.SES()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log('Source email is', process.env.SES_SOURCE_EMAIL)
    console.log('Contact email is', process.env.CONTACT_TO_EMAIL)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    await ses.sendEmail({
      Source: process.env.SES_SOURCE_EMAIL!,
      Destination: { ToAddresses: [process.env.CONTACT_TO_EMAIL!] },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: `New message from ${name}` },
        Body: {
          Text: {
            Data: `You received a new message from your website contact form\n\n` +
                  `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          },
        },
      },
    }).promise()

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('SES error', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}

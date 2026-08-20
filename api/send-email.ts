import type { VercelRequest, VercelResponse } from '@vercel/node'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const ses = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
})

export default async function handler(
    req: VercelRequest,
    res: VercelResponse,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            ok: false,
            error: 'Método no permitido',
        })
    }

    const { to, summary } = req.body ?? {}

    if (
        typeof to !== 'string' ||
        !to.trim() ||
        typeof summary !== 'string' ||
        !summary.trim()
    ) {
        return res.status(400).json({
            ok: false,
            error: 'Faltan los campos requeridos: to y summary',
        })
    }

    const from = process.env.SES_FROM_EMAIL

    if (!from) {
        return res.status(500).json({
            ok: false,
            error: 'El servidor no tiene configurado el correo remitente.',
        })
    }

    try {
        const command = new SendEmailCommand({
            Source: from,
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Subject: {
                    Data: 'Resumen de tus tareas - MateCode Tasks',
                    Charset: 'UTF-8',
                },
                Body: {
                    Text: {
                        Data: summary,
                        Charset: 'UTF-8',
                    },
                },
            },
        })

        const result = await ses.send(command)

        return res.status(200).json({
            ok: true,
            messageId: result.MessageId,
        })
    } catch (error) {
        const errorName = error instanceof Error ? error.name : 'UnknownError'

        console.error('SES send error:', errorName)

        return res.status(500).json({
            ok: false,
            error: 'No fue posible enviar el correo.',
        })
    }
}
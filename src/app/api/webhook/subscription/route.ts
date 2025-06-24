// File: src/app/api/webhook/subscription/route.ts

import { NextRequest } from 'next/server'
import crypto from 'node:crypto'
import { client } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET

    if (!secret) throw new Error('Missing LEMON_SQUEEZY_WEBHOOK_SECRET in .env')

    const hmac = crypto.createHmac('sha256', secret)
    const digest = hmac.update(rawBody).digest('hex')
    const signatureHeader = req.headers.get('x-signature') ?? req.headers.get('X-Signature')


    if (!signatureHeader) {
      throw new Error('Missing signature header')
    }

    // 💡 Compare strings directly
    if (digest !== signatureHeader) {
      throw new Error('Invalid webhook signature')
    }

    const body = JSON.parse(rawBody)

    // ✅ Try multiple locations for buyUserId
    const customData =
      body?.data?.attributes?.custom_data ||
      body?.meta?.custom_data ||
      body?.custom_data

    const buyUserId = customData?.buyUserId

    if (!buyUserId) throw new Error('❌ Missing buyUserId in webhook')

    const updatedUser = await client.user.update({
      where: { id: buyUserId },
      data: { subscription: true },
    })

    console.log('✅ Subscription upgraded for:', updatedUser.email)

    return Response.json({ message: '✅ Subscription updated', user: updatedUser })
  } catch (error) {
    console.error('❌ Webhook Error:', error)
    return Response.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

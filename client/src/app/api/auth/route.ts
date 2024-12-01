// Đây là nọi sẽ nhận api token từ client gửi lên serve và lưu vào 

import { decodeJWT } from '@/lib/utils'

type PayloadJWT = {
  iat: number
  exp: number
  tokenType: string
  userId: number
}

export async function POST(request: Request) {
    const res = await request.json()
    const sessionToken = res.sessionToken as string
    if (!sessionToken) {
      return Response.json(
        { message: 'Không nhận được session token' },
        {
          status: 400
        }
      )
    }
    return Response.json(res, {
      status: 200,
      headers: {
        'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly`
      }
    })
  }
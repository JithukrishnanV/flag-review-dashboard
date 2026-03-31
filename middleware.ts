import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const response = NextResponse.next()

    response.headers.set(
        'Content-Security-Policy',
        'frame-ancestors https://app.powerbi.com https://*.powerbi.com http://localhost:3000;'
    )

    response.headers.set(
        'X-Test-Header',
        'middleware-working'
    )

    return response
}

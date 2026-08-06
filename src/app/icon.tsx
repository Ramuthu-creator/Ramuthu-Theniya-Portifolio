import { ImageResponse } from 'next/og'
 
export const dynamic = 'force-static'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#38bdf8', // Tailwind's sky-400 (matches brand-400)
          fontWeight: 800,
          borderRadius: '4px',
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        RT
      </div>
    ),
    {
      ...size,
    }
  )
}

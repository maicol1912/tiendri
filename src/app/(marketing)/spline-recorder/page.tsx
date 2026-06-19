'use client'

import Spline from '@splinetool/react-spline'

export default function SplineRecorderPage() {
  return (
    <>
      <style>{`
        nextjs-portal,
        [data-nextjs-dialog-overlay],
        [data-nextjs-toast],
        [data-nextjs-dev-toolbar] {
          display: none !important;
        }
      `}</style>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          background: '#141414',
          filter: 'hue-rotate(102deg)',
          cursor: 'none',
        }}
      >
        <Spline
          scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </>
  )
}

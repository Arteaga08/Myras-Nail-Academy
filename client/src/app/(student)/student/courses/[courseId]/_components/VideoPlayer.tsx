'use client'

import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

interface VideoPlayerProps {
  videoUrl: string
  lessonId: string
  onEnded: () => void
}

export function VideoPlayer({ videoUrl, lessonId, onEnded }: VideoPlayerProps) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-900">
      <ReactPlayer
        key={lessonId}
        src={videoUrl}
        controls
        width="100%"
        height="100%"
        onEnded={onEnded}
      />
    </div>
  )
}

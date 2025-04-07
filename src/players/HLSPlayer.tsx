import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HLSPlayerProps {
  src: string;
  format?: 'hls' | 'mp4' | 'webm' | 'ogg';
}

export default function HLSPlayer({ src, format = 'hls' }: HLSPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (format === 'hls') {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support
        video.src = src;
      } else if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      }
    } else {
      // For other formats, use native video player
      video.src = src;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, format]);

  return (
    <video
      ref={videoRef}
      controls
      className="w-full aspect-video bg-black"
      playsInline
    />
  );
}
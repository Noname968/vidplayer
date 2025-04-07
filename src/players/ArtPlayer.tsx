import { useEffect, useRef } from 'react';
import ArtPlayer from 'artplayer';

interface ArtPlayerProps {
  src: string;
}

export default function ArtPlayerComponent({ src }: ArtPlayerProps) {
  const artRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<ArtPlayer | null>(null);

  useEffect(() => {
    if (!artRef.current) return;

    playerRef.current = new ArtPlayer({
      container: artRef.current,
      url: src,
      volume: 0.5,
      autoSize: true,
      autoMini: true,
      loop: false,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      setting: true,
      hotkey: true,
      pip: true,
      theme: '#23ade5',
      lang: navigator.language.toLowerCase(),
      whitelist: ['*'],
      type: src.includes('.m3u8') ? 'm3u8' : undefined,
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [src]);

  return <div ref={artRef} className="w-full aspect-video bg-black" />;
}
import {
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  type MediaPlayerInstance,
} from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

interface VidstackProps {
  src: string;
}

export default function Vidstack({ src }: VidstackProps) {
  return (
    <MediaPlayer
      className="w-full aspect-video"
      title="Video Player"
      src={src}
      crossorigin=""
    >
      <MediaProvider>
        <DefaultVideoLayout thumbnails="" icons={defaultLayoutIcons} />
      </MediaProvider>
    </MediaPlayer>
  );
}
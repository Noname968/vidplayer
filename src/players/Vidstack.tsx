import {
  MediaPlayer,
  MediaProvider,
  isHLSProvider,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import HLS from 'hls.js';


interface VidstackProps {
  src: string;
}

export default function Vidstack({ src }: VidstackProps) {

  function onProviderChange(
    provider: MediaProviderAdapter | null,
    nativeEvent: MediaProviderChangeEvent,
  ) {
    if (isHLSProvider(provider)) {
      // Static import
      provider.library = HLS;
      // Or, dynamic import
      provider.library = () => import('hls.js');
    }
  }

  return (
    <MediaPlayer
      className="w-full aspect-video"
      title="Video Player"
      src={src}
      crossOrigin=""
      onProviderChange={onProviderChange}
    >
      <MediaProvider>
        <DefaultVideoLayout thumbnails="" icons={defaultLayoutIcons} />
      </MediaProvider>
    </MediaPlayer>
  );
}
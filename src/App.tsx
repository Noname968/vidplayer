import React, { useState } from 'react';
import Vidstack from './players/Vidstack';
import HLSPlayer from './players/HLSPlayer';
import ArtPlayer from './players/ArtPlayer';
import { MonitorPlay } from 'lucide-react';

type PlayerType = 'vidstack' | 'hls.js' | 'artplayer';
type VideoFormat = 'hls' | 'mp4' | 'webm' | 'ogg';

function App() {
  const [url, setUrl] = useState("");
  const [playUrl, setPlayUrl] = useState("");
  const [playerType, setPlayerType] = useState<PlayerType>('vidstack');
  const [format, setFormat] = useState<VideoFormat>('hls');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlayUrl(url);
  };

  const renderPlayer = () => {
    if (!playUrl) return null;

    switch (playerType) {
      case 'vidstack':
        return <Vidstack src={playUrl} />;
      case 'hls.js':
        return <HLSPlayer src={playUrl} format={format} />;
      case 'artplayer':
        return <ArtPlayer src={playUrl} />;
      default:
        return null;
    }
  };

  const getExampleUrls = () => {
    switch (format) {
      case 'hls':
        return [
          'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
          'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8'
        ];
      case 'mp4':
        return [
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
        ];
      case 'webm':
        return [
          'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.720p.webm'
        ];
      case 'ogg':
        return [
          'https://upload.wikimedia.org/wikipedia/commons/1/17/Big_Buck_Bunny_480p_stereo.ogg'
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-[#13141c] p-3 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <MonitorPlay className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-100">Video Player Tester</h1>
        </div>

        <div className="bg-gray-950 rounded-lg shadow-xl p-6 border border-gray-800">
          <div className="flex gap-4 mb-6">
            {(['vidstack', 'hls.js', 'artplayer'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setPlayerType(type)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  playerType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex gap-4 mb-6">
            {(['hls', 'mp4', 'webm', 'ogg'] as const).map((videoFormat) => (
              <button
                key={videoFormat}
                onClick={() => setFormat(videoFormat)}
                className={`px-4 py-2 rounded-lg transition-colors uppercase ${
                  format === videoFormat
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {videoFormat}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder={`Enter ${format.toUpperCase()} video URL`}
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-600 text-gray-100 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Play
            </button>
          </form>

          {playUrl ? (
            <div className="rounded-lg overflow-hidden border border-gray-800">
              {renderPlayer()}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 bg-gray-950 rounded-lg border border-gray-800">
              Enter a {format.toUpperCase()} video URL to start playing
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-400">
          <p>Example {format.toUpperCase()} URLs for testing:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            {getExampleUrls().map((url, index) => (
              <li 
                key={index}
                className="hover:text-gray-300 transition-colors cursor-pointer"
                onClick={() => {
                  setUrl(url);
                  setPlayUrl(url);
                }}
              >
                {url}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

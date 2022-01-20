import React from 'react';
import "./App.css"
import VideoPlayer from './video';
import 'video.js/dist/video-js.css';
import { Parser } from 'm3u8-parser';
function App() {
  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };

  var manifest = [
    '#EXTM3U',
    '#EXT-X-VERSION:3',
    '#EXT-X-TARGETDURATION:6',
    '#EXT-X-MEDIA-SEQUENCE:0',
    '#EXT-X-DISCONTINUITY-SEQUENCE:0',
    '#EXTINF:6,',
    '0.ts',
    '#EXTINF:6,',
    '1.ts',
    '#EXTINF:6,',
    '2.ts',
    '#EXT-X-ENDLIST'
  ].join('\n');

  var parser = new Parser();

  parser.push(manifest);
  parser.end();

  var parsedManifest = parser.manifest;

  const videoJsOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    controls: true,
    width: "800px",
    sources: [
      {
        src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
        type: 'application/x-mpegURL',
      },
    ],
    manifest: parsedManifest,
    PictureInPictureWindow: true,
    plugins: {
      seekButtons: {
        qualityLevels: {},
        hlsQualitySelector: {},
        forward: 10,
        back: 10
      }
    }
  };
  return (
    <div className="App">
      <div style={styles}>
        <VideoPlayer  {...videoJsOptions} />
      </div>;
    </div>
  );
}

export default App;

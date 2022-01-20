import React from "react";
import videojs from "video.js";
import seekButtons from "videojs-seek-buttons";
import "videojs-seek-buttons/dist/videojs-seek-buttons.css";
import hlsQualitySelector from "videojs-hls-quality-selector";
import qualityLevels from "videojs-contrib-quality-levels";
export default class VideoPlayer extends React.Component {
    componentDidMount() {
        videojs.registerPlugin("seekButtons", seekButtons)
        videojs.registerPlugin("qualityLevels", qualityLevels);
        videojs.registerPlugin("hlsQualitySelector", hlsQualitySelector);
        // instantiate Video.js
        this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
            console.log("onPlayerReady", this);

        });
        this.player.hlsQualitySelector({ displayCurrentQuality: true });

    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/video.js/pull/3856
    render() {
        return (
            <div>
                <div data-vjs-player>
                    <video ref={node => (this.videoNode = node)} className="video-js" />
                </div>
            </div>
        );
    }
}

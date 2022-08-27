import React, { useCallback, useState } from "react";
import "./App.css";
import CustomPlayerComponent from "./components/custom-player";

const WIDTH = 640;
const HEIGHT = 360;

//Avoids error: ts(2339)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "custom-player": React.DetailedHTMLProps<
        React.VideoHTMLAttributes<HTMLVideoElement>,
        HTMLVideoElement
      >;
    }
  }
}

function App() {
  <script src="./custom-player.js"></script>;
  document.onloadedmetadata = () => {
    customElements.get("custom-player") ||
      customElements.define("custom-player", CustomPlayerComponent);
  };

  const [customPlayerElement, setCustomPlayerElement] =
    useState<Element | null>(null);

  const [elementShadowRoot, setElementShadowRoot] = useState<
    HTMLVideoElement | null | undefined
  >(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const setPlayerRef = useCallback(
    (node: (Element | HTMLVideoElement) | null) => {
      if (node !== null) {
        setCustomPlayerElement(node);
        setElementShadowRoot(
          customPlayerElement?.shadowRoot?.querySelector("video")
        );
      }
    },
    [customPlayerElement, elementShadowRoot] //We have to watch these deps because the shadow root state is not set on first render (hooks are async)
  );

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    !isPlaying ? elementShadowRoot?.play() : elementShadowRoot?.pause();
  };

  const handleFullscreen = () => {
    elementShadowRoot?.requestFullscreen();
  };

  const handleSeektoStart = () => {
    if (elementShadowRoot) {
      elementShadowRoot.currentTime = 0;
    }
  };

  const handleSeektoHalf = () => {
    if (elementShadowRoot) {
      elementShadowRoot.currentTime = elementShadowRoot.duration / 2;
    }
  };

  return (
    <div
      className="App"
      style={{
        display: "grid",
        padding: "4rem",
        justifyContent: "center",
      }}
    >
      <custom-player width={WIDTH} height={HEIGHT} ref={setPlayerRef} />
      <div id="control-bar">
        <button onClick={handlePlayPause}>Play/Pause</button>
        <button onClick={handleFullscreen}>Fullscreen</button>
        <button onClick={handleSeektoStart}>Seek to start</button>
        <button onClick={handleSeektoHalf}>Seek to Halfway point</button>
      </div>
    </div>
  );
}

export default App;

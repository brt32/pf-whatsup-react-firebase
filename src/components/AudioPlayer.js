import React, { useState } from "react";
import "./AudioPlayer.css";

export default function AudioPlayer({
  sender,
  audioUrl,
  id,
  audioId,
  setAudioId,
}) {
  const [isPlaying, setPlaying] = useState(false);
  const [isMediaLoaded, setMediaLoaded] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isMetadataLoaded, setMetadataLoaded] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [duration, setDuration] = useState("");

  return (
    <>
      <div className={`audioplayer ${sender ? "" : "audioplayer__alt"}`}></div>
    </>
  );
}

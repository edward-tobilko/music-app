import { useEffect, useRef, useState } from "react";
import {
  BiVolumeMute,
  BiVolumeLow,
  BiVolumeFull,
  BiShuffle,
} from "react-icons/bi";
import { FiRepeat } from "react-icons/fi";
import { BsPause, BsPlay } from "react-icons/bs";
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";

import "./player.scss";
import {
  setPlayPause,
  setPrevNextStepSong,
} from "../../redux/slices/playerSlice";
import { useDispatch, useSelector } from "react-redux";

const Player = () => {
  // States
  const [volume, setVolume] = useState(0.2);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [seekTime, setSeekTime] = useState(0);

  const { activeSong, isPlaying, isActive, currentSongs, currentIndex } =
    useSelector((state) => state.player);
  const dispatch = useDispatch();

  const getTime = (time) =>
    `${Math.floor(time / 60)} : ${`0${Math.floor(time % 60)}`.slice(-2)}`;

  const ref = useRef(null);

  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  // Functions
  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(setPlayPause(false));
    } else {
      dispatch(setPlayPause(true));
    }
  };

  const handlePrevStepSong = () => {
    if (currentIndex === 0) {
      dispatch(setPrevNextStepSong(currentSongs?.length + 1));
    } else if (shuffle) {
      dispatch(
        setPrevNextStepSong(Math.floor(Math.random() * currentSongs?.length)),
      );
    } else {
      dispatch(setPrevNextStepSong(currentIndex + 1));
    }
  };

  const handleNextStepSong = () => {
    dispatch(setPlayPause(false));

    if (!shuffle) {
      dispatch(setPrevNextStepSong((currentIndex - 1) % currentSongs?.length));
    } else {
      dispatch(setPrevNextStepSong(Math.random() * currentSongs?.length));
    }
  };

  // Hook useEffect
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (currentSongs?.length) {
      dispatch(setPlayPause(true));
    }
  }, [currentIndex]);

  return (
    <div className="player__content">
      {/* Track */}
      <div className="player__content-track">
        <img
          src={activeSong?.images?.coverart}
          className={`${
            isPlaying && isActive
              ? "player__content-track-img rotating"
              : "player__content-track-img"
          }`}
          alt={activeSong?.title}
        />

        <div className="player__content-track-desc">
          <h4 className="player__content-track-desc-title">
            {activeSong?.title ? activeSong?.title : "No active song"}
          </h4>
          <p className="player__content-track-desc-subtitle">
            {activeSong?.subtitle ? activeSong?.subtitle : "No active song"}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="player__content-controls">
        {/* Control */}
        <div className="player__content-controls__control">
          <FiRepeat
            className="player__content-controls__control-icon"
            onClick={() => setRepeat((prev) => !prev)}
            color={repeat ? "red" : "#f2f2f2"}
          />
          <TbPlayerTrackPrev
            className="player__content-controls__control-icon"
            onClick={handlePrevStepSong}
          />

          {isPlaying ? (
            <BsPause
              className="player__content-controls__control-icon"
              onClick={handlePlayPause}
            />
          ) : (
            <BsPlay
              className="player__content-controls__control-icon"
              onClick={handlePlayPause}
            />
          )}

          {currentSongs?.length && (
            <TbPlayerTrackNext
              className="player__content-controls__control-icon"
              onClick={handleNextStepSong}
            />
          )}

          <BiShuffle
            className="player__content-controls__control-icon"
            onClick={() => setShuffle((prev) => !prev)}
            color={shuffle ? "red" : "#f2f2f2"}
          />
        </div>

        {/* SeekBar */}
        <div className="player__content-controls__seekBar">
          <button
            className="player__content-controls__seekBar-btn"
            type="button"
            onClick={() => setSeekTime(time - 5)}
          >
            -
          </button>
          <p className="player__content-controls__seekBar-time">
            {time === 0 ? "0:00" : getTime(time)}
          </p>
          <input
            className="player__content-controls__seekBar-seek"
            type="range"
            step="any"
            value={time}
            min="0"
            max={duration}
            onInput={(event) => setSeekTime(event.target.value)}
          />
          <p className="player__content-controls__seekBar-time">
            {duration === 0 ? "0:00" : getTime(duration)}
          </p>
          <button
            className="player__content-controls__seekBar-btn"
            type="button"
            onClick={() => setSeekTime(time + 5)}
          >
            +
          </button>
        </div>
      </div>

      {/* Audio player */}
      <div className="player__content-audioPlayer">
        <audio
          src={activeSong?.hub?.actions[1]?.uri}
          loop={repeat}
          ref={ref}
          onEnded={handleNextStepSong}
          onTimeUpdate={(event) => setTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>

      {/* Volume */}
      <div className="player__content-volume">
        {volume === 0 && (
          <BiVolumeMute
            size={25}
            color="#f2f2f2"
            onClick={() => setVolume(1)}
          />
        )}
        {volume <= 0.5 && volume > 0 && (
          <BiVolumeLow size={25} color="#f2f2f2" onClick={() => setVolume(0)} />
        )}
        {volume <= 1 && volume > 0.5 && (
          <BiVolumeFull
            size={25}
            color="#f2f2f2"
            onClick={() => setVolume(0)}
          />
        )}
        <input
          type="range"
          min="0"
          max="1"
          step="any"
          value={volume}
          onChange={(event) => setVolume(event.target.value)}
          className="player__content-volume-input"
        />
      </div>
    </div>
  );
};

export default Player;

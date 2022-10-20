import { createSlice } from "@reduxjs/toolkit";

// State
const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreItem: "",
};

// Slice
const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (action.payload.data?.tracks?.hits) {
        state.currentSongs = action.payload.data?.tracks?.hits;
      } else if (action.payload.data?.properties) {
        state.currentSongs = action.payload.data?.tracks;
      } else {
        state.currentSongs = action.payload.data;
      }

      state.currentIndex = action.payload.index;
      state.isActive = true;
    },

    setPlayPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    setGenreItem: (state, action) => {
      state.genreItem = action.payload;
    },

    setPrevNextStepSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },
  },
});

export const {
  setPlayPause,
  setActiveSong,
  setGenreItem,
  setPrevNextStepSong,
} = playerSlice.actions;
export default playerSlice.reducer;

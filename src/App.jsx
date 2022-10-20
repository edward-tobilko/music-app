import React from "react";
import Discover from "./pages/discover/Discover";
import Sidebar from "./pages/sidebar/Sidebar";
import TopsBar from "./pages/topsbar/TopsBar";
import "./app.scss";
import { Route, Routes } from "react-router-dom";
import AroundYou from "./pages/around-you/AroundYou";
import TopArtists from "./pages/top-artists/TopArtists";
import TopCharts from "./pages/top-charts/TopCharts";
import SongDetails from "./pages/song-details/SongDetails";
import ArtistDetails from "./pages/artist-details/ArtistDetails";
import Search from "./components/search/Search";
import SearchPage from "./pages/search/SearchPage";
import Select from "./components/select/Select";
import { useSelector } from "react-redux";
import Player from "./components/player/Player";
import { IoIosArrowUp } from "react-icons/io";

const App = () => {
  const { genreItem, activeSong } = useSelector((state) => state.player);

  // Scroll Up
  function scrollUp() {
    const scrollUp = document.getElementById("scroll-up");

    if (this.scrollY >= 550) {
      scrollUp.classList.add("show-scroll__up");
    } else {
      scrollUp.classList.remove("show-scroll__up");
    }
  }
  window.addEventListener("scroll", scrollUp);

  return (
    <>
      <div className="container">
        <div className="app">
          {/* Sidebar */}
          <Sidebar />

          <div className="app-container">
            {/* Search component */}
            <Search />

            {/* Select component */}
            <Select genreItem={genreItem} />
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/songs/:songId" element={<SongDetails />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/search/:search" element={<SearchPage />} />
            </Routes>
          </div>

          {/* Tops Bar */}
          <TopsBar />
        </div>
      </div>

      {/* Player */}
      {activeSong?.title && (
        <div className="player">
          <Player />
        </div>
      )}

      <a href="#" id="scroll-up" className="scroll__up">
        <IoIosArrowUp />
      </a>
    </>
  );
};

export default App;

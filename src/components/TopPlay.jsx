import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { Link } from "react-router-dom";
import { useGetTopChartQuery } from "../redux/services/shazamCore";
import PlayPause from "./PlayPause";
import { setActiveSong, playPause } from "../redux/features/playerSlice";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseSelect,
  handlePlaySelect,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#47723ff5] py-2 p-4 mb-2 rounded-lg cursor-pointer">
    <h3 className="text-base font-bold text-white mr-3">{i + 1}.</h3>
    <div className="flex flex-1 flex-row items-center justify-between">
      <img
        src={song?.images?.coverart}
        alt={song?.title}
        className="w-20 rounded-lg h-20"
      />
      <div className="flex flex-col flex-1 justify-center mx-4">
        <Link to={`/songs/${song.key}`}>
          <p className="text-xl text-white font-bold">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    </div>
    <PlayPause
      song={song}
      activeSong={activeSong}
      isPlaying={isPlaying}
      handlePause={handlePauseSelect}
      handlePlay={handlePlaySelect}
    />
  </div>
);

const TopPlay = () => {
  const { data } = useGetTopChartQuery();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const topSongs = data?.slice(0, 5);

  const handlePauseSelect = () => {
    dispatch(playPause(false));
  };

  const handlePlaySelect = (song,i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={scrollRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[420px] max-w-full mt-5 flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center mt-2 md:mt-2">
          <h2 className="text-white font-bold text-2xl">Top Songs</h2>
          <Link to="/top-charts">
            <p className="cursor-pointer text-gray-300 text-base">View all</p>
          </Link>
        </div>
        <div className="mt-1 flex flex-col gap-1">
          {topSongs?.map((song, i) => (
            <TopChartCard
              key={song.key}
              i={i}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePlaySelect={()=>handlePlaySelect(song,i)}
              handlePauseSelect={handlePauseSelect}
            />
          ))}
        </div>
      </div>
      <div className="w-full mt-2 flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artistes</h2>
          <Link to="/top-artists">
            <p className="cursor-pointer text-gray-300 text-base">View all</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={16}
          centeredSlides
          freeMode
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topSongs?.map((song, i) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: "20%", height: "auto" }}
              className="rounded-full shadow-lg animate-slideright"
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img
                  src={song?.images.background}
                  alt="image"
                  className="rounded-full object-cover w-full"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;

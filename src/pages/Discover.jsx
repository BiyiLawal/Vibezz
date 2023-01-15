import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";

import { useGetTopChartQuery } from "../redux/services/shazamCore";

const Discover = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying} = useSelector((state) => state.player);
    const { data:datas, isFetching, error} = useGetTopChartQuery();
  const genreName = "Pop";

  if(isFetching) return <Loader title='Loading Songs....' />;
  if(error) return <Error />

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreName}
        </h2>
        <select
          onChange={() => {}}
          value=""
          className="bg-[#172a01] text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-2 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start gap-12 ml-10">
        {datas?.map((song,i) => (
            <SongCard key={song.key} song={song} i={i} isPlaying={isPlaying} data={datas} activeSong={activeSong} />
        ))}
      </div>
    </div>
  );
};

export default Discover;

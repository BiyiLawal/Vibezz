import { Loader, Error } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useGetNaijaChartQuery } from "../redux/services/shazamCore";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { Link } from "react-router-dom";
import PlayPause from "../components/PlayPause";

const TopNaijaCard = ({
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

const Naija = ({ artistId }) => {
    const NG = 'NG';
    const { data:naijaData, isFetching:isFetchingNaija, error } = useGetNaijaChartQuery(NG);
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const handlePauseSelect = () => {
        dispatch(playPause(false));
      };
    
    const handlePlaySelect = (song,i) => {
        dispatch(setActiveSong({ song, naijaData, i }));
        dispatch(playPause(true));
    };

    if (isFetchingNaija) {
        return <Loader title="Fetching Top Jams" />
    }
    if(error) return <Error />
    
    return (
        <div className="flex flex-col">
            <h1 className="font-bold text-3xl text-white">Top Naija</h1>
            <div className="w-full mt-5 flex flex-col ">
                {naijaData?.map((song, i) => (
                <TopNaijaCard
                    key={song.key}
                    song={song}
                    i={i}
                    artistId={artistId}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    handlePauseSelect={handlePauseSelect}
                    handlePlaySelect={()=>handlePlaySelect(song,i)}
                />
                ))}
            </div>
        </div>
    )
};

export default Naija;
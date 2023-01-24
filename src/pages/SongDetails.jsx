import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetRelatedSongQuery,
  useGetSongDetailsQuery,
} from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { detailId } = useParams();
  const { data: trackData, isFetching: isFetchingTrackDetails, error } =
    useGetSongDetailsQuery({ detailId });
  const { data:relatedData, isFetching: isFetchingRelatedSong } =
    useGetRelatedSongQuery({ detailId });
    console.log(trackData);

  const handlePauseSelect = () => {
    dispatch(playPause(false));
  };

  const handlePlaySelect = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingTrackDetails) {
    return <Loader title="Fetching Song Details" />;
  }

    if (error) {
      return <Error />;
    }

  return (
    <div className="flex flex-col">
      <DetailsHeader trackData={trackData} />
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white mt-2">Lyrics :</h2>
        <div className="mt-5">
          {trackData?.sections[1].type === "LYRICS" ? (
            trackData?.sections[1].text.map((line, i) => (
              <p className="text-base my-1 text-gray-400" key={i}>{line}</p>
            ))
          ) : (
            <p className="text-base my-1 text-gray-400">
              Sorry, no lyrics found!
            </p>
          )}
        </div>
      </div>
      { isFetchingRelatedSong ? <Loader /> : <RelatedSongs
        data={relatedData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseSelect={handlePauseSelect}
        handlePlaySelect={handlePlaySelect}
      />}
    </div>
  );
};

export default SongDetails;
import SongBar from "./SongBar";

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  artistId,
  handlePauseSelect,
  handlePlaySelect,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">May like...</h1>
    <div className="w-full mt-5 flex flex-col ">
      {data?.map((song, i) => (
        <SongBar
          key={`${artistId}`}
          song={song}
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseSelect={handlePauseSelect}
          handlePlaySelect={handlePlaySelect}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
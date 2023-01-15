import { Link } from "react-router-dom";

const DetailsHeader = ({ trackData, artistId, artistData }) => { 

  const artiste = artistData?.artists[artistId].attributes;
  
  return(
  <div className="w-full relative flex flex-col">
    <div className="w-full bg-gradient-to-l from-transparent to-[#172a01] sm:h-48 h-28" />
    <div className="absolute flex items-center inset-0">
      <img
        alt="art"
        src={
          artistId
            ? artiste?.artwork?.url
                .replace("{w}", "500")
                .replace("{h}", "500")
            : trackData?.images?.coverart
        }
        className='sm:w-40 w-28 sm:h-40 h-28 ml-1 rounded-full shadow-xl border-2 object-cover shadow-[#172a01]'
      />
      <div className="ml-5">
        <p className="font-bold text-xl sm:text-3xl text-white">{artistId ? artiste.name : trackData?.title}</p>
        {!artistId && (
          <Link to={`/artists/${trackData?.artists[0].adamid}`}>
            <p className="text-base text-gray-400 mt-2">{trackData?.subtitle}</p>
          </Link>
        )}
        <p className="text-base text-gray-400 mt-2">
          {artistId ? artiste?.genreNames[0] : trackData?.genres?.primary}
        </p>
      </div>
    </div>
    <div className="w-full sm:h-44 h-24" />
  </div>
)};

export default DetailsHeader;

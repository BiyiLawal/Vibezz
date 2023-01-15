import { FaPlayCircle, FaPause } from 'react-icons/fa';

const PlayPause = ({ isPlaying, song, activeSong, handlePlay, handlePause}) => (isPlaying && activeSong?.title === song.title ? (
  <FaPause className='text-gray-300' size={35} onClick={handlePause} />
) : (
  <FaPlayCircle className='text-gray-300' size={35} onClick={handlePlay} />
));

export default PlayPause;
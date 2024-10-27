import { Images, Search, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Header = ({ onSubmit, notInPageFav }) => {

  const navigate = useNavigate();

  const goToMyFavorites = () => {
    navigate("/favorites")
  }

  const goToGallery = () => {
    navigate("/")
  }

  return (
    <div className="flex justify-center bg-slate-100 w-screen">
      <form onSubmit={onSubmit} className="max-w-4xl flex justify-between md:justify-center items-center h-16 px-3 w-full">
        <div className="flex items-center w-full">
          <ul className="flex items-center md:gap-11 gap-3">
            <li onClick={goToGallery} className='hover:cursor-pointer  md:hidden block' ><Images /></li>
            <li onClick={goToGallery} className='hover:cursor-pointer md:block hidden'>Galeria</li>
            <li onClick={goToMyFavorites} className='hover:cursor-pointer md:hidden block'><Star /></li>
            <li onClick={goToMyFavorites} className='hover:cursor-pointer md:block hidden'>Favoritos</li>
          </ul>

          {notInPageFav && (<><input
            type="text"
            name="query"
            className="ml-3 flex-1 bg-white border rounded-md p-2"
            placeholder="Pesquisar..." /><button type="submit" className="hover:cursor-pointer mx-0 p-2 bg-white rounded-md">
              <Search />
            </button></>)}
        </div>
      </form>
    </div>
  );
};

export default Header;

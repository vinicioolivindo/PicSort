import { useState } from "react";
import { Minus, MinusCircle, RemoveFormatting } from "lucide-react";
import Header from "../components/Header";
import useLocalStorage from "../components/useLocalStorage";
import Popup from "../components/Popup"; // Importe o Popup

const FavoritePage = () => {
  const [favImages, setFavImages] = useLocalStorage("favImages", []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col items-center">
      <Header />

      <h1 className="text-xl font-bold text-gray-600 mt-4">Minhas Imagens Favoritas</h1>

      <div className="columns-2 md:columns-3 gap-4 p-4">
        {favImages.map((image) => (

          <div key={image.id} className="mb-4 break-inside-avoid relative">
            <img
              onClick={() => openModal(image)}
              className="w-full rounded-lg"
              src={image.urls.thumb}
              alt={image.alt_description}
            />

            <button
              className="absolute top-1 left-1 text-red-600 hover:text-blue-600 transition-all"
              onClick={() => {
                const isOk = confirm('Deseja remover esta imagem das favoritas?')
                if (isOk) {
                  setFavImages(
                    favImages.filter((item) => item.urls.regular !== image.urls.regular)
                  );
                }
              }}
            >
              <MinusCircle />
            </button>
          </div>
        ))}
      </div>

      {/* Reutilizando o Popup */}
      <Popup isOpen={isModalOpen} onClose={closeModal} image={selectedImage} />
    </div>
  );
};

export default FavoritePage;

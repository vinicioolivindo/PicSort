import { useEffect, useState } from "react";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";
import { Heart, ZoomIn } from "lucide-react";
import Popup from "./Popup"; // Importa o componente Popup

// eslint-disable-next-line react/prop-types
const ImageGallery = ({ query }) => {
    const [favImages, setFavImages] = useLocalStorage("favImages", []);
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const ACCESS_KEY = "TE4vg5bIUxTIvyJ4LjGCaC1gKI-sXj2Ju2LeXRNsltg";

    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://api.unsplash.com/search/photos",
                {
                    params: { query, per_page: 12, page },
                    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
                }
            );
            setImages((prev) =>
                page === 1 ? response.data.results : [...prev, ...response.data.results]
            );
        } catch (error) {
            alert("Erro ao buscar imagens:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => setPage(1), [query]);

    useEffect(() => {
        if (query) fetchImages();
    }, [query, page]);

    const loadMore = () => setPage((prevPage) => prevPage + 1);

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
            <div className="columns-2 md:columns-3 gap-4 ">
                {images.map((image) => (
                    <div key={image.id} className="mb-4 break-inside-avoid">
                        <img
                            onClick={() => openModal(image)}
                            src={image.urls.regular}
                            alt={image.alt_description}
                            className="w-full rounded-lg"
                            loading="lazy"
                        />
                        <div className="flex mt-1 gap-2">
                            <button
                                className={`transition-all ${favImages.some((item) => item.urls.regular === image.urls.regular)
                                        ? "text-red-600"
                                        : "hover:text-red-600"
                                    }`}
                                onClick={() => {
                                    const alreadyFavorited = favImages.some(
                                        (item) => item.urls.regular === image.urls.regular
                                    );

                                    if (alreadyFavorited) {
                                        setFavImages(
                                            favImages.filter((item) => item.urls.regular !== image.urls.regular)
                                        );
                                    } else {
                                        setFavImages([image, ...favImages]);
                                    }
                                }}
                            >
                                <Heart
                                    fill={
                                        favImages.some((item) => item.urls.regular === image.urls.regular)
                                            ? "red"
                                            : "none"
                                    }
                                />
                            </button>

                            <button
                                className="hover:text-blue-600 transition-all"
                                onClick={() => openModal(image)}
                            >
                                <ZoomIn />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                {loading || images.length === 0 ? (
                    <h1>Pesquise pelas imagens!</h1>
                ) : (
                    <button
                        onClick={loadMore}
                        className="col-span-full mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Carregar Mais
                    </button>
                )}
            </div>

            {loading && <p className="text-center">Carregando...</p>}

            <Popup isOpen={isModalOpen} onClose={closeModal} image={selectedImage} />
        </div>
    );
};

export default ImageGallery;

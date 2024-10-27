/* eslint-disable react/prop-types */
import { X } from "lucide-react";

// eslint-disable-next-line react/prop-types
const Popup = ({ isOpen, onClose, image }) => {
    if (!isOpen || !image) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="relative p-4 max-w-xl mx-auto"
                onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar dentro do modal
            >
                <button
                    className="absolute top-5 right-5 rounded-md bg-gray-900 text-white hover:text-gray-600"
                    onClick={onClose}
                >
                    <X />
                </button>
                <img
                    src={image.urls.regular}
                    alt={image.alt_description}
                    className="w-full rounded-lg"
                />
                <p className="mt-2 text-center text-white">
                    {image.alt_description}
                </p>
            </div>
        </div>
    );
};

export default Popup;

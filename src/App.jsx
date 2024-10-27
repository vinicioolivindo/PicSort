import { useState } from "react";
import Header from "./components/Header";
import ImageGallery from "./components/ImageGallery";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();

    if (query) {
      setSearchQuery(query);
      e.target.reset(); // Limpa o campo de input após a pesquisa
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex flex-col items-center relative">
      <div className="fixed z-50">
        <Header onSubmit={handleSearch} notInPageFav={true}/>
      </div>

      <div className="max-w-4xl w-full p-4 mt-7 mt-20">
        <ImageGallery query={searchQuery} />
      </div>
    </div>
  );
}

export default App;

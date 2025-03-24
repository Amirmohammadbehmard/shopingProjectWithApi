import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
interface SearchComponentProps {
  onSearch?: (query: string) => void;
}
const SearchComponent = ({ onSearch }: SearchComponentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const handleSearch = () => {
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      }
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };
  return (
    <div className="flex items-center h-10 bg-gray-300 rounded-md overflow-hidden lg:min-w-[395px]">
      <input
        onChange={handleSearchInputChange}
        value={searchQuery}
        type="text"
        placeholder="Find your product..."
        className="flex-grow h-full w-4/5 p-4 outline-none bg-gray-300 text-lg"
      />
      <button
        onClick={handleSearch}
        className=" h-full w-1/5 flex justify-center items-center bg-gray-400"
      >
        <IoMdSearch size={24} />
      </button>
    </div>
  );
};

export default SearchComponent;

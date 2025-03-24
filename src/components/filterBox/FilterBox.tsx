import { ChangeEvent, useState } from "react";

type FilterBoxProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  showAvailableOnly: boolean;
  handleCheckboxChange: () => void;
  minPrice: number;
  maxPrice: number;
  setPriceRange: (min: number, max: number) => void;
  categories: string[];
  setSelectedCategory: (category: string) => void;
};

function FilterBox({
  searchQuery,
  setSearchQuery,
  handleSearch,
  showAvailableOnly,
  handleCheckboxChange,
  setPriceRange,
  categories,
  setSelectedCategory,
}: FilterBoxProps) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMinPrice(value);
    setPriceRange(value, maxPrice);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMaxPrice(value);
    setPriceRange(minPrice, value);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchQuery(inputValue);
    handleSearch();
  };

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-black">
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
        <input
          onChange={handleInputChange}
          value={inputValue}
          type="text"
          placeholder="Search for products..."
          className="flex-grow h-12 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button
          onClick={handleSearchClick}
          className="h-12 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 flex-grow w-f"
        >
          Search
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Price Range:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            placeholder="Min"
            className="h-12 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            placeholder="Max"
            className="h-12 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Category:
        </label>
        <select
          onChange={handleCategoryChange}
          className="w-full h-12 px-4 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={showAvailableOnly}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">
          Only show available
        </label>
      </div>
    </div>
  );
}

export default FilterBox;

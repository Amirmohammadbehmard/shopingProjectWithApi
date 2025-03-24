import { useEffect, useState } from "react";
import Container from "../../components/container/Container";
import { IProduct } from "../../types/Server";
import { getProducts } from "../../services/api";
import ProductItem from "../../components/productItem/ProductItem";
import { Link } from "react-router-dom";
import FilterBox from "../../components/filterBox/FilterBox";
import Footer from "../../components/footer/Footer";

function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getProducts().then((res) => setProducts(res));
  }, []);

  useEffect(() => {
    const filteredResults = products.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!showAvailableOnly || !item.isOutOfStock) &&
        item.price >= minPrice &&
        item.price <= maxPrice &&
        (selectedCategory === "" || item.category === selectedCategory),
    );

    setSearchResults(filteredResults);
    setShowNoResults(filteredResults.length === 0);
  }, [
    searchQuery,
    showAvailableOnly,
    minPrice,
    maxPrice,
    selectedCategory,
    products,
  ]);

  const handleCheckboxChange = () => {
    setShowAvailableOnly((prev) => !prev);
  };

  const setPriceRange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const finalDisplayProducts =
    searchResults.length > 0 ? searchResults : products;

  return (
    <div className="relative min-h-screen">
      <Container>
        <div className="grid grid-cols-12 mt-8">
          <div className="2xl:col-span-9 xl:col-span-8 lg:col-span-7 col-span-12 flex justify-center">
            {showNoResults ? (
              <div className="text-center text-red-500 h-10 flex items-center justify-center">
                The desired product was not found!
              </div>
            ) : (
              <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 xs:grid-cols-2 gap-y-10 xs:gap-10 gap-0 md:mb-72 2xs:mb-[575px] mb-[595px]">
                {finalDisplayProducts.map((item) => (
                  <div key={item.id}>
                    <Link to={`/product/${item.id}`}>
                      <ProductItem {...item} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="2xl:col-span-3 xl:col-span-4 lg:col-span-5 col-span-0 lg:flex hidden flex-col mx-6">
            <FilterBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={() => {}}
              showAvailableOnly={showAvailableOnly}
              handleCheckboxChange={handleCheckboxChange}
              setPriceRange={setPriceRange}
              minPrice={minPrice}
              maxPrice={maxPrice}
              categories={["electronics", "clothing", "jewelery", "books"]}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Home;

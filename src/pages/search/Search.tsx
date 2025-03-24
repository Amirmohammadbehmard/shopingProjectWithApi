import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import ProductItem from "../../components/productItem/ProductItem";
import { getProducts } from "../../services/api";
import { IProduct } from "../../types/Server";

function Search() {
  const { query } = useParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  useEffect(() => {
    getProducts().then((res) => setProducts(res));
  }, []);
  useEffect(() => {
    if (query) {
      const filteredResults = products.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(filteredResults);
    }
  }, [query, products]);
  return (
    <Container>
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">
          Search Results for "{query}"
        </h1>
        {searchResults.length > 0 ? (
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {searchResults.map((item) => (
              <ProductItem key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <p className="text-red-500 text-center">No results found!</p>
        )}
      </div>
    </Container>
  );
}

export default Search;

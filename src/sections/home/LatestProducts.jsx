import { useEffect, useState } from "react";
import Slider from "../../components/products/Slider";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetch("/api/v1/products/latest");
        setProducts(await data.json());
      } catch (error) {
        setError(error.message);
      }
    };
    getProducts();
  }, []);

  return (
    <main>
      {/* {error && <ErrorMsg />} */}
      {products && (
        <section className="min-h-[100vh]">
          <div id="latestSection" className="w-[90%] mx-auto text-center mt-5">
            <h2 className="title capitalize text-3xl xs2:text-4xl md:text-5xl  font-bold text-[#373737]">
              Derniers produits
            </h2>
            <p className="capitalize py-1 text-sm xs2:text-sm md:text-base lg:text-lg md:w-[70%] md:mx-auto">
              Explorez notre gamme exquise. Découvrez l{"'"}art de décorer avec
              style. Transformez votre maison en un havre de beauté.
            </p>
          </div>
          <Slider products={products} />
        </section>
      )}
    </main>
  );
};

export default LatestProducts;

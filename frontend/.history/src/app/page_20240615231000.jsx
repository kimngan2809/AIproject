"use client";
import ProductComponent from "@/components/product-component";
import Header from "@/components/header";
import { callAPI } from "@/utils/api-caller";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const pageSize = 9;  // Set page size to 9

const ProductsPage = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();
  const [pageCount, setPageCount] = useState(1);
  const router = useRouter();
  const page = searchParams.get("page") !== null ? +searchParams.get("page") : 1;

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const fetchData = async () => {
    try {
      const res = await callAPI(`/products?populate=*`, "GET");
      const allProducts = res.data.data;

      // Separate first 3 products as best sellers
      const bestSellers = allProducts.slice(0, 3);
      setBestSellers(bestSellers);

      // Sort remaining products by name
      const sortedProducts = allProducts.slice(0).sort((a, b) => {
        return a.attributes.name.localeCompare(b.attributes.name);
      });

      // Paginate sorted products
      const startIndex = (page - 1) * pageSize;
      const paginatedProducts = sortedProducts.slice(startIndex, startIndex + pageSize);
      setProducts(paginatedProducts);

      // Set page count for pagination
      setPageCount(Math.ceil(sortedProducts.length / pageSize));
    } catch (error) {
      console.log(error);
    }
  };

  const prev = () => {
    router.push("/products?page=" + ((+page) - 1));
  };

  const next = () => {
    router.push("/products?page=" + ((+page) + 1));
  };

  return (
    <div className="bg-[#fff9e6] text-[#015109]">
      <Header />

      
      <div className="container mx-auto mt-10">
        
        <section id="BestSellers" className="mb-10">
          <h2 className="text-center text-2xl font-bold mb-5">Best Sellers</h2>
          <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mb-5">
            {bestSellers.map((value, index) => {
              const imageUrl = value.attributes.image.data && value.attributes.image.data.length > 0
                ? value.attributes.image.data[0].attributes.url
                : '/path/to/default/image.jpg'; // Replace with your default image path
              return (
                <ProductComponent
                  id={value.id}
                  key={index}
                  productName={value.attributes.name}
                  price={value.attributes.price}
                  brand={value.attributes.category.data.attributes.name}
                  imageUrl={imageUrl}
                  sale={value.attributes.sale}
                  price_not_sale={value.attributes.price_not_sale}
                  className="shadow-none"
                />
              );
            })}
          </div>
        </section>

        <div className="text-center text-2xl font-bold mb-5">Products</div>

        <section id="Products" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mb-5">
          {products.map((value, index) => {
            const imageUrl = value.attributes.image.data && value.attributes.image.data.length > 0
              ? value.attributes.image.data[0].attributes.url
              : '/path/to/default/image.jpg'; // Replace with your default image path
            return (
              <ProductComponent
                id={value.id}
                key={index}
                productName={value.attributes.name}
                price={value.attributes.price}
                brand={value.attributes.category.data.attributes.name}
                imageUrl={imageUrl}
                sale={value.attributes.sale}
                price_not_sale={value.attributes.price_not_sale}
                className="shadow-none"
              />
            );
          })}
        </section>
        <div className="flex flex-col items-center">
          <div className="inline-flex mt-2 xs:mt-0 bg-[#015109] rounded-full px-3 py-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (+page > 1) prev();
              }}
              className="text-[#FFF9E2] hover:text-[#FFE478] mr-5 font-bold"
              style={{fontSize: '20px'}}
            >
              {"<"}
            </a>
            <span className="text-[#FFF9E2] font-medium whitespace-nowrap" style={{fontSize: '20px'}}>
              {page}/{pageCount}
            </span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (+page < +pageCount) next();
              }}
              className="text-[#FFF9E2] hover:text-[#FFE478] ml-5 font-bold"
              style={{fontSize: '20px'}}
            >
              {">"}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;

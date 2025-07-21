import { useState, useEffect } from "react";
import { SORTOPTIONS, type SortOptionType } from "../constants/sortoptions";
import { tabs, type TabType } from "../constants/tabs";
import ProductCard from "../components/cards/ProductCard";
import { useNavigate } from "react-router-dom";
import { productListData } from "../data/productListData";
import type { Product } from "../types/product";
import { PATHS } from "../constants/paths";
import { useAuth } from "../context/AuthContext";

const RealtimeRanking = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleOrderClick = (productId: number) => {
    if (!isLoggedIn) {
      navigate(PATHS.LOGIN, {
        state: { from: PATHS.ORDER, productId: productId },
      });
      return;
    }

    const selectedProduct = productListData.find((p) => p.id === productId);

    if (selectedProduct) {
      navigate(PATHS.ORDER, {
        state: {
          imageUrl: selectedProduct.imageURL,
          productName: selectedProduct.name,
          brand: selectedProduct.brandInfo.name,
          price: selectedProduct.price.sellingPrice,
        },
      });
    } else {
      console.error(`Product with ID ${productId} not found.`);
    }
  };

  const [activeTab, setActiveTab] = useState<TabType>(() => {
    const savedTab = localStorage.getItem("activeTab");
    return savedTab && tabs.includes(savedTab as TabType)
      ? (savedTab as TabType)
      : "전체";
  });

  const [activeSort, setActiveSort] = useState<SortOptionType>(() => {
    const savedSort = localStorage.getItem("activeSort");
    return savedSort && SORTOPTIONS.includes(savedSort as SortOptionType)
      ? (savedSort as SortOptionType)
      : "받고 싶어한";
  });

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("activeSort", activeSort);
  }, [activeSort]);

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        실시간 급상승 선물 랭킹
      </h2>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                ${
                  activeTab === tab
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex justify-end items-center space-x-2 text-sm text-gray-600 mb-4">
          {SORTOPTIONS.map((option, index) => (
            <span
              key={option}
              className={`cursor-pointer ${
                activeSort === option
                  ? "font-bold text-gray-900"
                  : "text-gray-600"
              } hover:text-gray-800`}
              onClick={() => setActiveSort(option)}
            >
              {option}
              {index < SORTOPTIONS.length - 1 && (
                <span className="ml-2 text-gray-400">|</span>
              )}
            </span>
          ))}
        </div>

        <section className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {productListData.map((product: Product, index: number) => (
              <ProductCard
                key={product.id}
                product={product}
                rank={index + 1}
                onClick={() => handleOrderClick(product.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default RealtimeRanking;

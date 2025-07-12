import { useMemo } from "react";
import { useInput } from "../hooks/useInput";
import { useLocation } from "react-router-dom";

import ThanksCardSlide from "../components/ThanksCardSlide";
import Sender from "../components/Sender";
import Receiver from "../components/Receiver";
import Order from "../components/Order";
import ProductDetail from "../components/ProductDetail";
import { ERROR_MESSAGES } from "../constants/message";

const validateQuantity = (value: string): string => {
  const quantity = parseInt(value, 10);
  if (isNaN(quantity) || quantity < 1) {
    return ERROR_MESSAGES.MIN_QUANTITY;
  }
  return "";
};

const GiftOrderPage = () => {
  const quantityInput = useInput("1", validateQuantity);

  const location = useLocation();
  const productDetailData = location.state as
    | {
        imageUrl: string;
        productName: string;
        brand: string;
        price: number;
      }
    | undefined;

  const totalPrice = useMemo(() => {
    if (!productDetailData) return 0;
    const quantity = parseInt(quantityInput.value, 10);
    const unitPrice = productDetailData.price;
    return isNaN(quantity) ? 0 : quantity * unitPrice;
  }, [quantityInput.value, productDetailData]);

  if (!productDetailData) {
    return (
      <div className="container mx-auto py-10 text-center text-xl font-bold text-gray-700">
        상품 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-4 pb-[80px]">
      <ThanksCardSlide />
      <Sender />
      <Receiver
        quantityValue={quantityInput.value}
        onQuantityChange={quantityInput.onChange}
        onQuantityBlur={quantityInput.onBlur}
        quantityError={quantityInput.error}
        quantityTouched={quantityInput.touched}
      />
      <ProductDetail
        imageUrl={productDetailData.imageUrl}
        productName={productDetailData.productName}
        brand={productDetailData.brand}
        price={productDetailData.price}
      />
      {/* Order 컴포넌트에 계산된 totalPrice와 quantityInput.value를 전달 */}
      <Order totalPrice={totalPrice} quantity={quantityInput.value} />
    </div>
  );
};
export default GiftOrderPage;

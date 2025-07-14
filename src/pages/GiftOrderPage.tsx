import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import ThanksCardSlide from "../components/ThanksCardSlide";
import Sender from "../components/Sender";
import Receiver from "../components/Receiver";
import Order from "../components/Order";
import ProductDetail from "../components/ProductDetail";

import type { ReceiverField } from "../schemas/receiverSchema";

const GiftOrderPage = () => {
  const [finalReceivers, setFinalReceivers] = useState<ReceiverField[]>([]);

  const location = useLocation();
  const productDetailData = location.state as
    | {
        imageUrl: string;
        productName: string;
        brand: string;
        price: number;
      }
    | undefined;

  const totalQuantity = useMemo(() => {
    return finalReceivers.reduce((sum, receiver) => sum + receiver.quantity, 0);
  }, [finalReceivers]);

  const totalPrice = useMemo(() => {
    if (!productDetailData) return 0;
    const unitPrice = productDetailData.price;
    return totalQuantity * unitPrice;
  }, [totalQuantity, productDetailData]);

  if (!productDetailData) {
    return (
      <div className="container mx-auto py-10 text-center text-xl font-bold text-gray-700">
        상품 정보를 불러올 수 없습니다.
      </div>
    );
  }

  const handleReceiversUpdate = (receivers: ReceiverField[]) => {
    setFinalReceivers(receivers);

    console.log("최종 받는 사람 목록 업데이트됨:", receivers);
  };

  const handleReceiverCancel = () => {
    console.log("Receiver 컴포넌트에서 취소되었습니다.");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-4 pb-[80px]">
      <ThanksCardSlide />
      <Sender />
      <Receiver
        onReceiversUpdate={handleReceiversUpdate}
        onCancel={handleReceiverCancel}
      />
      <ProductDetail
        imageUrl={productDetailData.imageUrl}
        productName={productDetailData.productName}
        brand={productDetailData.brand}
        price={productDetailData.price}
      />
      {/* Order 컴포넌트에 계산된 totalPrice와 totalQuantity 전달 */}
      <Order totalPrice={totalPrice} quantity={totalQuantity.toString()} />
    </div>
  );
};
export default GiftOrderPage;

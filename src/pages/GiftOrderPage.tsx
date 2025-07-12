import { useMemo, useState } from "react"; // React와 useState 임포트 추가
import { useLocation } from "react-router-dom";

import ThanksCardSlide from "../components/ThanksCardSlide";
import Sender from "../components/Sender";
import Receiver from "../components/Receiver";
import Order from "../components/Order";
import ProductDetail from "../components/ProductDetail";
// import { ERROR_MESSAGES } from "../constants/message"; // 이제 validateQuantity를 사용하지 않으므로 필요 없을 수 있음
// import { ERROR_MESSAGES } from "../constants/message"; // 이제 validateQuantity를 사용하지 않으므로 필요 없을 수 있음
import type { ReceiverField } from "../schemas/receiverSchema"; // ReceiverField 타입 임포트
// ReceiverField 타입 임포트

// validateQuantity 함수는 Receiver 컴포넌트 내부에서 Zod 스키마로 대체되었으므로, 여기서는 더 이상 필요 없습니다.
// const validateQuantity = (value: string): string => {
//   const quantity = parseInt(value, 10);
//   if (isNaN(quantity) || quantity < 1) {
//     return ERROR_MESSAGES.MIN_QUANTITY;
//   }
//   return "";
// };

const GiftOrderPage = () => {
  // Receiver 컴포넌트로부터 전달받을 최종 받는 사람 목록 상태
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

  // 총 수량 및 총 가격 계산
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

  // Receiver 컴포넌트에서 완료 버튼 클릭 시 호출될 콜백
  const handleReceiversUpdate = (receivers: ReceiverField[]) => {
    setFinalReceivers(receivers); // Receiver에서 제출된 최종 받는 사람 목록을 상태에 저장
    // 필요하다면 여기서 추가적인 로직 (예: 서버 전송)을 수행할 수 있습니다.
    console.log("최종 받는 사람 목록 업데이트됨:", receivers);
  };

  // Receiver 컴포넌트에서 취소 버튼 클릭 시 호출될 콜백 (혹은 Receiver 자체의 취소 로직에 따라)
  const handleReceiverCancel = () => {
    console.log("Receiver 컴포넌트에서 취소되었습니다.");
    // 여기서는 예를 들어 페이지를 뒤로 이동하거나 다른 동작을 수행할 수 있습니다.
    // navigate(-1); // react-router-dom의 useNavigate 훅을 사용해야 합니다.
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-4 pb-[80px]">
      <ThanksCardSlide />
      <Sender />
      <Receiver
        // initialReceivers는 필요하다면 여기에 초기값을 전달할 수 있습니다.
        // 예: initialReceivers={[{ name: "기존 받는이", phone: "01012345678", quantity: 2 }]}
        onReceiversUpdate={handleReceiversUpdate} // 최종 목록 업데이트 콜백 전달
        onCancel={handleReceiverCancel} // 취소 콜백 전달
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

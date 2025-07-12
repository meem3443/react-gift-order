interface OrderProps {
  quantity: string;
  totalPrice: number;
}

const Order = ({ quantity, totalPrice }: OrderProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-white p-4 shadow-top">
      <button className="bg-yellow-400 text-white rounded-lg shadow-md w-full max-w-lg px-8 py-3 text-lg font-bold">
        {`${totalPrice.toLocaleString()}원 구매하기 (${quantity}개)`}{" "}
      </button>
    </div>
  );
};

export default Order;

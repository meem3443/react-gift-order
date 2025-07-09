import React from "react";
import ThanksCardSlide from "../components/ThanksCardSlide";
import Sender from "../components/Sender";
import Receiver from "../components/receiver";

const GiftOrderPage: React.FC = () => {
  return (
    <div>
      <ThanksCardSlide />
      <Sender />
      <Receiver />
    </div>
  );
};
export default GiftOrderPage;

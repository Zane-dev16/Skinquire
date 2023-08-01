"use client";

import Modal from "@/app/components/Modal/Modal";
import { FC, useState } from "react";
import RatingModal from "./RatingModal";

const RatingButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <span onClick={() => setIsOpen(true)}>Rate This Product</span>
      {isOpen && (
        <RatingModal handleClose={() => setIsOpen(false)}></RatingModal>
      )}
    </div>
  );
};

export default RatingButton;

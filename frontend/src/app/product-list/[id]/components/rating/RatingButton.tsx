"use client";

import Modal from "@/app/components/Modal/Modal";
import { FC, useState } from "react";
import RatingModal from "./RatingModal";
import Cookies from "js-cookie";
import useSWR, { useSWRConfig } from "swr";
import { AnimatePresence } from "framer-motion";

interface RatingButtonProps {
  product: number;
}
type userRatingArgs = {
  access_token: string | undefined;
  id: number;
  productId: number;
};

const getUserID = ({ access_token }: { access_token: string | undefined }) =>
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query {
                  me {
                    id
                  }
                }`,
    }),
  })
    .then((response) => response.json())
    .then((data) => data.data.me.id);

const getUserRating = ({ access_token, id, productId }: userRatingArgs) =>
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query {
                usersPermissionsUser(id: ${id}) {
                  data {
                    attributes {
                      ratings(filters: {product: {id: {eq: ${productId}}}}) {
                        data {
                          id
                          attributes {
                            rating
                          }
                        }
                      }
                    }
                  }
                }
              }`,
    }),
  })
    .then((response) => response.json())
    .then(
      (data) => data.data.usersPermissionsUser.data.attributes.ratings.data
    );

type UserRatingData = {
  id: number;
  attributes: {
    rating: number;
  };
}[];

const RatingButton: FC<RatingButtonProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const access_token = Cookies.get("token");

  const {
    data: userIdData,
    error: userIdError,
    isLoading: userIdLoading,
    mutate: revalidateOverallRating,
  } = useSWR<number>(access_token ? { access_token } : null, getUserID);

  const {
    data: userRatingData,
    error: userRatingError,
    isLoading: userRatingLoading,
    mutate: revalidateUserRating,
  } = useSWR<UserRatingData>(
    access_token ? { access_token, id: userIdData, productId: product } : null, // Assuming `userIdData` contains the user ID
    getUserRating
  );
  if (userRatingError) {
    console.error(userRatingError);
  }

  const hasUserRating =
    Array.isArray(userRatingData) && userRatingData.length > 0;

  const userRatingId = hasUserRating ? userRatingData[0].id : null;

  const handleClose = () => {
    revalidateOverallRating();
    revalidateUserRating();
    setIsOpen(false);
  };

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>
        {hasUserRating
          ? `Rating: ${userRatingData[0].attributes.rating}      Change Rating`
          : "Rate This Product"}
      </div>
      <AnimatePresence>
        {isOpen && (
          <RatingModal
            product={product}
            handleClose={handleClose}
            hasUserRating={hasUserRating}
            userRatingId={userRatingId}
            userId={userIdData}
          ></RatingModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RatingButton;

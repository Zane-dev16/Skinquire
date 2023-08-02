"use client";

import Modal from "@/app/components/Modal/Modal";
import { FC, useState } from "react";
import RatingModal from "./RatingModal";
import Cookies from "js-cookie";
import useSWR from "swr";

interface RatingButtonProps {
  product: number;
}

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

const getUserRating = ({
  access_token,
  id,
}: {
  access_token: string | undefined;
  id: number;
}) =>
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
                      ratings {
                        data {
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
  } = useSWR<number>(access_token ? { access_token } : null, getUserID);
  console.log(userIdData);

  const {
    data: userRatingData,
    error: userRatingError,
    isLoading: userRatingLoading,
  } = useSWR<UserRatingData>(
    access_token ? { access_token, id: userIdData } : null, // Assuming `userIdData` contains the user ID
    getUserRating
  );
  if (userRatingError) {
    console.error(userRatingError);
  }
  console.log(userRatingData);

  const hasUserRating =
    Array.isArray(userRatingData) && userRatingData.length > 0;

  return (
    <div>
      {(userIdLoading || userRatingLoading) && <div>aaaa</div>}
      <span onClick={() => setIsOpen(true)}>
        {hasUserRating ? "Change Rating" : "Rate This Product"}
      </span>
      {isOpen && (
        <RatingModal
          product={product}
          handleClose={() => setIsOpen(false)}
          hasUserRating
        ></RatingModal>
      )}
    </div>
  );
};

export default RatingButton;

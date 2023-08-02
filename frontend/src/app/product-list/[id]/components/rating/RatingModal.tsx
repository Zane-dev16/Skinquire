import { FC, MouseEventHandler, useEffect, useState } from "react";
import styles from "./RatingModal.module.css";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const getUserID = async (access_token: string | undefined) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
    {
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
    }
  );

  const data = await response.json();
  return data.data.me.id;
};

const createRating = async ({
  access_token,
  product,
  user,
  rating,
}: {
  access_token: string | undefined;
  product: number;
  user: number;
  rating: number;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        mutation {
          createRating(data: { product: ${product}, user: ${user}, rating: ${rating} }) {
            data {
              attributes {
                rating
              }
            }
          }
        }
      `,
      }),
    }
  );

  const data = await response.json();
  return data.data.createRating.data;
};

interface RatingModalProps {
  handleClose: MouseEventHandler<HTMLDivElement>;
  product: number;
  hasUserRating: boolean;
}

const RatingModal: FC<RatingModalProps> = ({
  product,
  handleClose,
  hasUserRating,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [displayRating, setDisplayRating] = useState<number | null>(null);
  const router = useRouter();
  const access_token = Cookies.get("token");

  useEffect(() => console.log(Cookies.get("token")), []);

  const handleNumberClick = (num: number) => {
    setRating(num);
  };

  const handleNumberHover = (num: number) => {
    setDisplayRating(num);
  };

  const handleNumberHoverEnd = () => {
    setDisplayRating(rating);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (rating === null) {
      // If the rating is null, display an error message to the user
      console.log("Please select a rating before submitting.");
      return;
    }

    try {
      const userID = await getUserID(access_token);
      const data = await createRating({
        access_token,
        product: product,
        user: userID,
        rating: rating,
      });
      console.log("Rating created:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div onClick={handleClose} className={styles.backdrop}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <form onSubmit={handleSubmit}>
          <div className={styles.ratingMeter}>
            {[...Array(10).keys()].map((count) => (
              <span
                key={count + 1}
                onClick={() => handleNumberClick(count + 1)}
                onMouseEnter={() => handleNumberHover(count + 1)}
                onMouseLeave={handleNumberHoverEnd}
                className={styles.ratingNumber}
              >
                {count + 1}
              </span>
            ))}
          </div>
          <div className={styles.currentRating}>
            <>
              <Image
                src="/rating-star.svg"
                alt="rating:"
                width={20}
                height={20}
                className={styles.ratingIcon}
              />
              <span className={styles.currentRatingNumber}>
                {displayRating}
              </span>
            </>
          </div>
          <button type="submit">RATE</button>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;

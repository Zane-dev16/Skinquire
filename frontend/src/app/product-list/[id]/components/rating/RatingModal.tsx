import { FC, MouseEventHandler, useEffect, useState } from "react";
import styles from "./RatingModal.module.css";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LoginForm from "@/app/components/Form/LoginForm";

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
  console.log(user);
  console.log(rating);
  try {
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
    if (response.status !== 200) {
      console.log(data);
      throw new Error("Error creating rating status 200");
    }
    return data.data.createRating.data;
  } catch (error) {
    console.error("Error creating rating:", error);
    throw new Error("Failed to create rating. Please try again later.");
  }
};

const updateRating = async ({
  access_token,
  userRatingId,
  rating,
}: {
  access_token: string | undefined;
  userRatingId: number | null;
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
          updateRating(id: ${userRatingId}, data: {rating: ${rating}}){
            data {
              id
              attributes {
                product {
                  data {
                    id
                  }
                }
              }
            }
          }
        }`,
      }),
    }
  );

  const data = await response.json();
  return data.data.updateRating.data;
};

interface RatingModalProps {
  handleClose: () => void;
  product: number;
  hasUserRating: boolean;
  userRatingId: number | null;
  userId: number | undefined;
}

const RatingModal: FC<RatingModalProps> = ({
  product,
  handleClose,
  hasUserRating,
  userRatingId,
  userId,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [displayRating, setDisplayRating] = useState<number | null>(null);
  const router = useRouter();
  const access_token = Cookies.get("token");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

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
    event.preventDefault();
    if (!userId) {
      console.log("Please login first.");
      setIsLoginModalOpen(true);
    } else if (rating === null) {
      // If the rating is null, display an error message to the user
      console.log("Please select a rating before submitting.");
    } else {
      try {
        const userID = userId;
        if (!hasUserRating) {
          const data = await createRating({
            access_token,
            product: product,
            user: userID,
            rating: rating,
          });
          if (data) {
            router.refresh();
            handleClose();
          }
        } else {
          const data = await updateRating({
            access_token,
            userRatingId,
            rating,
          });
          if (data) {
            router.refresh();
            handleClose();
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const modalHeight = isLoginModalOpen ? "500px" : "20%";
  const modalWidth = isLoginModalOpen ? "460px" : "45%";

  return (
    <div onClick={handleClose} className={styles.backdrop}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{
          height: modalHeight,
          width: modalWidth,
          y: 0,
          opacity: 1,
          transition: { y: { duration: 0.2 } },
        }}
        exit={{ y: "100%", opacity: 0, transition: { duration: 0.2 } }}
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
      >
        {isLoginModalOpen ? (
          <div className={styles.loginFormContainer}>
            <LoginForm closeForm={() => setIsLoginModalOpen(false)}></LoginForm>
          </div>
        ) : (
          <div className={styles.ratingFormContainer}>
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
        )}
      </motion.div>
    </div>
  );
};

export default RatingModal;

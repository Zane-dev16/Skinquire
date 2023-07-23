"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ConnectProviderRedirect = () => {
  const searchParams = useSearchParams();
  useEffect(() => {
    const access_token = searchParams.get("access_token");
    console.log(access_token);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    console.log(backendUrl);

    // Check if the access_token and provider are present
    if (access_token) {
      // Make a POST request to the backend with the access_token as a query parameter
      fetch(
        `${backendUrl}/api/auth/google/callback?access_token=${access_token}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Handle the response data from the backend
          console.log(data); // This will contain the "jwt" and "user" information
        })
        .catch((error) => {
          // Handle any errors that occurred during the API request
          console.error("Error connecting to the backend:", error);
        });
    }
  }, []);

  return <div>Redirecting..</div>;
};

export default ConnectProviderRedirect;

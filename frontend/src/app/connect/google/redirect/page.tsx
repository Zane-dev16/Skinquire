"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ConnectProviderRedirect = () => {
  const [error, setError] = useState<string>();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const access_token = searchParams.get("access_token");
      if (!access_token) {
        console.error("Access token not found.");
        return;
      }

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) {
        console.error("Backend URL not configured.");
        return;
      }

      try {
        const response = await fetch(
          `${backendUrl}/api/auth/google/callback?access_token=${access_token}`
        );

        if (!response.ok) {
          const json = await response.json();
          const errorMessage = json?.error.message;
          if (errorMessage == "Email is already taken.") {
            setError("Error: account exists but is not registered with google");
          }
          console.log(json);
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.jwt) {
          Cookies.set("token", data.jwt);
          router.back();
        } else {
          console.error("JWT token not received.");
        }
      } catch (error) {
        console.error("Error connecting to the backend:", error);
      }
    };

    fetchData();
  }, [searchParams]);

  if (error) {
    return <div>{error}</div>;
  }

  return <div>Redirecting...</div>;
};

export default ConnectProviderRedirect;

"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ConnectProviderRedirect = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
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

    fetch(`${backendUrl}/api/auth/google/callback?access_token=${access_token}`)
      .then((response) => {
        if (!response.ok) {
          const json = response.json();
          console.log(json);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.jwt) {
          Cookies.set("token", data.jwt);
          router.back();
          console.log("Logged in successfully:", data.user);
        } else {
          console.error("JWT token not received.");
        }
      })
      .catch((error) => {
        console.error("Error connecting to the backend:", error);
      });
  }, [searchParams]);

  return <div>Redirecting...</div>;
};

export default ConnectProviderRedirect;

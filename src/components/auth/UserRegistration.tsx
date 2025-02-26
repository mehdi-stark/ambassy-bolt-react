import React, { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { UserRegistrationError } from "./UserRegistrationError";

export function UserRegistration() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const registerUser = async () => {
      if (!user) return;

      const payload = {
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      try {
        const existingUserResponse = await fetch(
          import.meta.env.VITE_API_SERVER + "/users?clerkId=" + user.id,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const existingUserData = await existingUserResponse.json();

        if (existingUserData.length > 0) {
          sessionStorage.setItem("userId", existingUserData[0].id);
          sessionStorage.setItem("clerkId", user.id);
          navigate("/registration-store");
          return;
        }
        // console.log("Enregistrement de l'utilisateur:", payload);
        // const response = await fetch(
        //   import.meta.env.VITE_API_SERVER + "/users/register",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(payload),
        //   }
        // );

        // const data = await response.json();

        // if (response.ok) {
        //   sessionStorage.setItem("userId", data.userId);
        //   sessionStorage.setItem("clerkId", user.id);
        //   navigate("/dashboard");
        // } else {
        //   signOut();
        //   setError(data.message || "An unknown error occurred.");
        // }
      } catch (error) {
        signOut();
        setError("Network error. Please try again.");
      }
    };

    registerUser();
  }, [user, signOut, navigate]);

  if (error) {
    return <UserRegistrationError errorMessage={error} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-xl animate-pulse">
        We are getting things up... Please wait
      </p>
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";

export function UserRegistrationError({
  errorMessage,
}: {
  errorMessage: string;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
      <p className="text-lg mb-6">{errorMessage}</p>
      <button
        onClick={() => navigate("/login")}
        className="bg-white text-red-900 px-4 py-2 rounded-lg font-bold"
      >
        Back to Login
      </button>
    </div>
  );
}

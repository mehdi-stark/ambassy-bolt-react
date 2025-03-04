import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { updateUserSubscription } from "../../api/user.js"; // Assumed API call to update subscription
import { getUserFromSessionStorage } from "../lib/utils";
import { useUser } from "@clerk/clerk-react";
const SubscriptionSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const modifySubscription = async () => {
      console.log("clerk user from updateUserSubscription", user);
      const userSessionStorage = getUserFromSessionStorage();
      const userId = userSessionStorage?.userId;

      try {
        if (!isSignedIn || !userId) {
          navigate("/login");
          return;
        }
        const clerkId = user?.id;
        await updateUserSubscription(userId, clerkId); // Call to update the subscription in the user object
        navigate("/dashboard"); // Redirect to dashboard when done
      } catch (error) {
        console.error("Failed to update subscription", error);
        // Handle error appropriately
      }
    };

    modifySubscription();
  }, [navigate]);

  return (
    <div
      className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center space-y-4"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spinner animation="border" variant="primary" />
      <p className="ml-2 text-xl text-blue-600">Updating subscription</p>
    </div>
  );
};

export default SubscriptionSuccess;

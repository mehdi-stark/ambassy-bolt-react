import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { SearchPage } from "./components/SearchPage";
import { Dashboard } from "./components/Dashboard";
import { LoginPage } from "./components/auth/LoginPage";
import { RegisterPage } from "./components/auth/RegisterPage";
import { MerchantRegistrationPage } from "./components/MerchantRegistrationPage";
import { AmbassadorsPage } from "./components/AmbassadorsPage";
import { ProfilePage } from "./components/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ClerkProvider } from "@clerk/clerk-react";
import { UserRegistration } from "./components/auth/UserRegistration";
import { AuthLoadingPage } from "./components/auth/AuthLoadingPage";
import CampaignsPage from "./components/CampaignsPage";
import StoreForm from "./components/auth/registration form/StoreForm";
import PricingPage from "./components/PricingPage";
import SubscriptionSuccess from "./components/subscription/SubscriptionSuccess";

function App() {
  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/login"
    >
      <Router>
        <AppContent />
      </Router>
    </ClerkProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavigationPaths = [
    "/login",
    "/register",
    "/user-register",
    "/register/merchant",
    "/registration-form-store",
    "/registration-form-social",
    "/subscription-success",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNavigationPaths.includes(location.pathname) && <Navigation />}
      <div
        className={
          !hideNavigationPaths.includes(location.pathname)
            ? "lg:pl-60 pt-16 lg:pt-0"
            : ""
        }
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth-loading" element={<AuthLoadingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user-register" element={<UserRegistration />} />
          <Route
            path="/register/merchant"
            element={<MerchantRegistrationPage />}
          />
          <Route path="/registration-form-store" element={<StoreForm />} />
          <Route path="/registration-form-social" element={<StoreForm />} />
          <Route
            path="*"
            element={
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <SearchPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <ProtectedRoute>
                      <SearchPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/campaigns"
                  element={
                    <ProtectedRoute>
                      <CampaignsPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/ambassadors" element={<AmbassadorsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/pricing" element={<PricingPage />} />

                {/* Subscription */}
                <Route
                  path="/subscription-success"
                  element={<SubscriptionSuccess />}
                />
              </Routes>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

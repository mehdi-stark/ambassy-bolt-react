import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navigation } from "./components/Navigation";
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
import Settings from "./components/SettingsPage";
import { SupportPage } from "./components/SupportPage";
import SettingsPage from "./components/SettingsPage";
import { RegisterPageV2 } from "./components/auth/RegisterPage copy";
import GlobalCampaign from "./components/global_campaigns/GobalCampaignForm";
import AmbassadorCampaign from "./components/ambassador_campaign/AmbassadorCampaign";
import { RegisterPageRole } from "./components/auth/RegisterPageRole";
import { CollaboratorsPage } from "./components/CollaboratorsPage";
import Search from "./components/SearchPage";
import BentoGridDemo from "./components/ui/bento-grid-demo";
import SearchPage from "./components/SearchPage";

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
    "/auth-loading",
    "/user-register",
    "/register/merchant",
    "/registration",
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
          <Route path="/register-role" element={<RegisterPageRole />} />
          <Route path="/registration" element={<RegisterPageV2 />} />

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
                <Route path="/collaborators" element={<CollaboratorsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/help" element={<SupportPage />} />
                <Route path="/settings" element={<SettingsPage />} />

                {/* Campaigns */}
                {/* <Route
                  path="/ambassador-campaign"
                  element={<AmbassadorCampaign />}
                /> */}

                {/* Formulaire de nouvelle campagne globale */}
                <Route path="/global-campaign" element={<GlobalCampaign />} />

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

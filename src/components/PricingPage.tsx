import React, { useState } from "react";
import { useUserStore } from "../store/Store";
import { sub } from "date-fns";
const PricingPage = () => {
  const { user, subscription, setUser } = useUserStore();
  const [billingCycle, setBillingCycle] = useState("monthly");

  console.log("print user", user);
  console.log("print subscription", subscription);
  // Pricing data with monthly and yearly options (20% discount for yearly)
  const pricingData = {
    ambassador: {
      title: "Ambassador",
      description:
        "For TikTokers, Instagramers, YouTubers, and all social media influencers",
      price: { monthly: "Always Free", yearly: "Always Free" },
      features: [
        { text: "Create and customize your Ambassador profile", checked: true },
        { text: "Explore a wide range of brand opportunities", checked: true },
        {
          text: "Customizable branded links to share with your audience",
          checked: true,
        },
        { text: "Basic analytics", checked: true },
        { text: "Direct messaging", checked: true },
        { text: "Approach the pros", checked: true },
        { text: "Community access", checked: true },
      ],
      buttonText: "Start for Free",
      highlighted: false,
    },
    pro: {
      title: "Pro",
      description: "For shops and brands looking to skyrocket their growth",
      price: { monthly: 39.99, yearly: 383.9 }, // ~20% discount for yearly
      features: [
        { text: "All Ambassador features", checked: true },
        { text: "Advanced campaign analytics", checked: true },
        { text: "Priority support", checked: true },
        { text: "Custom campaign creation", checked: true },
        { text: "Unlimited influencer outreach", checked: true },
        { text: "Performance tracking", checked: true },
        { text: "AI-powered chatbot", checked: true },
        { text: "Exclusive webinars", checked: true },
      ],
      buttonText: "Get Started",
      highlighted: true,
    },
    vip: {
      title: "VIP",
      description:
        "For busy shop owners who want effortless promotion and skyrocket",
      price: { monthly: 299.99, yearly: 2879.9 }, // ~20% discount for yearly
      features: [
        { text: "All Ambassador & Pro features", checked: true },
        { text: "Fully automated management", checked: true },
        { text: "Google Ads Campaign", checked: true },
        { text: "TikTok Ads Campaign", checked: true },
        { text: "TikTok Shop Integration", checked: true },
        { text: "Dedicated account manager", checked: true },
        { text: "Custom reporting", checked: true },
        { text: "Exclusive partnerships", checked: true },
      ],
      buttonText: "Get Started",
      highlighted: false,
    },
  };

  // Helper to format price display
  const formatPrice = (plan, cycle) => {
    const price = pricingData[plan].price[cycle];
    if (typeof price === "string") return price;
    return `$${price}`;
  };

  // Helper to determine cycle text
  const cycleText = billingCycle === "monthly" ? "/monthly" : "/yearly";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-white">
      <div className="grid grid-cols-1 gap-8">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-block px-4 py-1 bg-indigo-900 text-white rounded-full text-sm font-medium mb-6">
            Pricing
          </div>
          <h1 className="text-5xl font-bold mb-3">
            Simple and transparent pricing
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Choose a plan that works for you. No hidden fees. No surprises.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center bg-gray-100 rounded-lg p-1">
            <button
              className={`px-6 py-2 rounded-md ${
                billingCycle === "monthly" ? "bg-white shadow-sm" : ""
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-md ${
                billingCycle === "yearly" ? "bg-white shadow-sm" : ""
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div
          className={`grid grid-cols-1 ${
            subscription.plan === "ambassador"
              ? "md:grid-cols-2"
              : "md:grid-cols-3"
          } gap-8 flex justify-center items-center`}
        >
          {/* Ambassador Plan */}
          {subscription.plan === "ambassador" && (
            <div className="border-2 border-purple-300 rounded-xl p-8 flex flex-col h-full">
              <h2 className="text-2xl font-semibold mb-2">
                {pricingData.ambassador.title}
              </h2>
              <p className="text-gray-600 mb-6">
                {pricingData.ambassador.description}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {formatPrice("ambassador", billingCycle)}
                </span>
                {typeof pricingData.ambassador.price[billingCycle] !==
                  "string" && (
                  <span className="text-gray-500">{cycleText}</span>
                )}
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {pricingData.ambassador.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div
                      className={`mt-1 mr-3 ${
                        feature.checked ? "text-purple-500" : "text-gray-300"
                      }`}
                    >
                      {feature.checked ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-black text-white py-3 rounded-md font-medium mt-auto">
                {pricingData.ambassador.buttonText}
              </button>
            </div>
          )}

          {/* Pro Plan */}
          <div className="flex flex-col h-full items-center justify-center">
            {subscription.plan === "pro" && (
              <h3 className="text-lg text-purple-500 font-semibold mb-2">
                Plan actuel
              </h3>
            )}
            <div
              className={`rounded-xl p-8 flex flex-col h-full ${
                pricingData.pro.highlighted
                  ? "bg-purple-50 border-2 border-purple-200"
                  : ""
              } ${subscription.plan === "pro" ? "border-purple-500" : ""}`}
            >
              <h2 className="text-2xl font-semibold mb-2">
                {pricingData.pro.title}
              </h2>
              <p className="text-gray-600 mb-6">
                {pricingData.pro.description}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {formatPrice("pro", billingCycle)}
                </span>
                <span className="text-gray-500">{cycleText}</span>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {pricingData.pro.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div
                      className={`mt-1 mr-3 ${
                        feature.checked ? "text-purple-500" : "text-gray-300"
                      }`}
                    >
                      {feature.checked ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              {subscription.plan !== "pro" && (
                <button className="w-full bg-purple-500 text-white py-3 rounded-md font-medium mt-auto">
                  {pricingData.pro.buttonText}
                </button>
              )}
            </div>
          </div>

          {/* VIP Plan */}
          <div className="flex flex-col h-full items-center justify-center">
            {subscription.plan === "vip" && (
              <h3 className="text-lg text-amber-500 font-semibold mb-2">
                Plan actuel
              </h3>
            )}
            <div
              className={`rounded-xl p-8 flex flex-col h-full ${
                subscription.plan === "vip"
                  ? "border-2 border-amber-400"
                  : "border-2"
              }`}
            >
              <h2 className="text-2xl font-semibold mb-2">
                {pricingData.vip.title}
              </h2>
              <p className="text-gray-600 mb-6">
                {pricingData.vip.description}
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {formatPrice("vip", billingCycle)}
                </span>
                <span className="text-gray-500">{cycleText}</span>
              </div>
              <div className="space-y-4 mb-8 flex-grow">
                {pricingData.vip.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div
                      className={`mt-1 mr-3 ${
                        feature.checked ? "text-amber-500" : "text-gray-300"
                      }`}
                    >
                      {feature.checked ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
              {subscription.plan !== "vip" && (
                <button className="w-full bg-amber-400 text-black py-3 rounded-md font-medium mt-auto">
                  {pricingData.vip.buttonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

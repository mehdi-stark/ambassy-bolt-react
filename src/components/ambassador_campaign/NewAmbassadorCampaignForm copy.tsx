import React, { useState } from "react";
// import { Card, CardContent } from "./ui/card";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";

const ServiceForm = (ambassador) => {
  const [teamSize, setTeamSize] = useState([15]);
  const [budget, setBudget] = useState([3000]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const services = [
    { id: "web-design", name: "Web Design", icon: "🖥" },
    { id: "ui-ux", name: "UI/UX Design", icon: "✏" },
    { id: "app-design", name: "App Design", icon: "📱" },
    { id: "development", name: "Development", icon: "💻" },
    { id: "technical-seo", name: "Technical SEO", icon: "🔍" },
    { id: "content-writing", name: "Content Writing", icon: "📝" },
    { id: "strategy", name: "Strategy", icon: "📊" },
    { id: "research", name: "Research", icon: "🔎" },
    { id: "other", name: "Other", icon: "✨" },
  ];

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="flex w-full min-h-screen p-4 rounded-xl">
      {/* Form Section */}
      <div className="w-1/2 p-8 bg-white">
        <div className="max-w-xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold">Let's work together</h1>
            </div>
            <p className="text-gray-500 text-sm">
              We're a full-service agency dedicated to helping you go from MVP
              to industry leader. Let our team bring your goals to life.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium mb-4">
                Team size*
                <span className="float-right">
                  {teamSize[0]} - {teamSize[0] + 10} people
                </span>
              </label>
              <Slider
                value={teamSize}
                onValueChange={setTeamSize}
                max={40}
                min={5}
                step={5}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-4">
                Budget*
                <span className="float-right">
                  ${budget[0].toLocaleString()} - $
                  {(budget[0] + 2000).toLocaleString()} USD
                </span>
              </label>
              <Slider
                value={budget}
                onValueChange={setBudget}
                max={10000}
                min={1000}
                step={500}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-4">
                What do you need help with?*
              </label>
              <div className="grid grid-cols-3 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-4 rounded-lg border text-left transition-colors ${
                      selectedServices.includes(service.id)
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="block text-lg mb-1">{service.icon}</span>
                    <span className="text-sm font-medium">{service.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="text-xs text-gray-500">Step 2 of 2</span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Go back</Button>
                <Button>Let's create!</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="w-1/2 relative bg-neutral-100">
        <div className="relative h-full">
          <img
            // src="/api/placeholder/800/1200"
            src={ambassador.avatar || ambassador.ambassador.avatar || ""}
            alt="Testimonial"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <blockquote className="text-3xl font-light mb-8 leading-tight">
              "We teamed up with Untitled UI to completely rebrand and launch,
              which helped us secure over $40M in funding."
            </blockquote>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-light mb-1">Partner</p>
                <p className="font-medium">Powersurge</p>
              </div>
              <div>
                <p className="font-light mb-1">Year</p>
                <p className="font-medium">August 2025</p>
              </div>
              <div>
                <p className="font-light mb-1">Services</p>
                <p className="font-medium">App Design</p>
              </div>
              <div>
                <p className="font-light mb-1">Website</p>
                <p className="font-medium">powersurge.com</p>
              </div>
              <div>
                <p className="font-light mb-1">Investment</p>
                <p className="font-medium">$40,000,000</p>
              </div>
              <div>
                <div className="space-y-1">
                  <p className="font-medium">App Development</p>
                  <p className="font-medium">Marketing Assets</p>
                  <p className="font-medium">Strategy & Research</p>
                  <p className="font-medium">SEO & Content</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 right-8">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                className="opacity-75"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;

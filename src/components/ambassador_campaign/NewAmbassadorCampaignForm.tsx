import React, { useState } from "react";
import AmbassadorCampaignForm from "./AmbassadorCampaignForm";
import { Ambassador } from "../../types";

const ServiceForm = (ambassador) => {
  return (
    <div className="flex w-full min-h-screen p-8 rounded-xl overflow-hidden">
      {/* Form Section */}
      {/* <div className="md:w-1/2 p-8 bg-white overflow-auto h-full">
        <AmbassadorCampaignForm />
      </div> */}
      {/* Form Section */}
      <div className="md:w-1/2 bg-white p-4 h-full">
        <AmbassadorCampaignForm />
      </div>

      {/* Testimonial Section */}
      <div className="w-1/2 relative bg-neutral-100 overflow-hidden h-full rounded-r-xl">
        <div className="relative h-full">
          <img
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

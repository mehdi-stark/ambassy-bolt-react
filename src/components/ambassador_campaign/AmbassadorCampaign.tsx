import React from "react";
import AmbassadorForm from "./AmbassadorForm";
import { Ambassador } from "../../types";

const AmbassadorCampaign = ({ ambassador, onReturn }) => {
  console.log("ambassador", ambassador);

  return (
    <div className="flex flex-col md:flex-row w-full md:h-screen rounded-xl p-1 bg-white md:overflow-hidden overflow-auto">
      {/* Testimonial Section */}
      <div className="w-full md:w-1/2 relative bg-white overflow-hidden rounded-t-xl md:rounded-r-xl p-2 mb-4 md:mb-0">
        <div className="relative h-64 md:h-full">
          <img
            src={ambassador.avatar || ambassador.ambassador.avatar || ""}
            alt="Testimonial"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
            <blockquote className="text-lg md:text-3xl font-light mb-4 md:mb-8 leading-tight">
              "We teamed up with Untitled UI to completely rebrand and launch,
              which helped us secure over $40M in funding."
            </blockquote>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm">
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

            <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                className="opacity-75"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-10 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 bg-white md:h-screen overflow-auto">
        <AmbassadorForm ambassador={ambassador} onReturn={onReturn} />
      </div>
    </div>
  );
};

export default AmbassadorCampaign;

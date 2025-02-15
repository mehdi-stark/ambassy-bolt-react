import React, { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";

const Testimonial = () => {
  //   const { user } = useUser();

  const [user, setUser] = useState<any>();

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      console.log("user :", JSON.parse(userData));

      setUser(JSON.parse(userData));
    }

    console.log("Testimonial");
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <img
        src={user?.avatar}
        alt="Testimonial"
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-xl font-bold mb-2">
        "We teamed up with Untitled UI to completely rebrand and launch, which
        helped us secure over $40M in funding."
      </p>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600">Partner</p>
          <p className="font-bold">Powersurge</p>
        </div>
        <div>
          <p className="text-gray-600">Year</p>
          <p className="font-bold">August 2025</p>
        </div>
        <div>
          <p className="text-gray-600">Services</p>
          <p className="font-bold">
            App Design, App Development, Marketing Assets, Strategy & Research,
            SEO & Content
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600">Website</p>
        <a href="https://powersurge.com" className="text-blue-500 underline">
          powersurge.com
        </a>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600">Investment</p>
        <p className="font-bold">$40,000,000</p>
      </div>
    </div>
  );
};

export default Testimonial;

import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img src={logo} className="mx-auto h-20 w-auto" />
        <Link to="/" className="flex justify-center">
          <h1 className="md:text-xl font-bold text-gradient">Ambassy</h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">{subtitle}</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}

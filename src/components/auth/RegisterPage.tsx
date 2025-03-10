import { SignUp } from "@clerk/clerk-react";

export function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      {/* <SignUp redirectUrl="/user-register" /> */}
      {/* <SignUp
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-indigo-600 hover:bg-indigo-700 text-white rounded-full",
            formFieldInput:
              "rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          },
        }}
        afterSignUpUrl="/user-register"
      /> */}
      {/* <SignUp
        signUp={{
          fields: {
            email: true,
            password: true,
            publicMetadata: {
              role: {
                label: "Votre rôle",
                type: "select",
                options: [
                  { label: "Marque", value: "client" },
                  { label: "Influenceur", value: "influencer" },
                ],
              },
            },
          },
        }}
        afterSignUpUrl="/user-register"
      /> */}
      <SignUp
        appearance={{
          elements: {
            formFieldInput: "border border-gray-300 rounded-lg px-3 py-2",
            formFieldLabel: "text-gray-700 font-medium mb-2",
          },
        }}
        unsafeMetadata={{
          role: "", // La valeur sera mise à jour lors du signup
        }}
        additionalFields={[
          {
            name: "role",
            label: "Votre rôle",
            type: "select",
            options: [
              { label: "Marque", value: "client" },
              { label: "Influenceur", value: "influencer" },
            ],
          },
        ]}
        afterSignUpUrl="/dashboard" // Redirection après inscription
      />
    </div>
  );
}

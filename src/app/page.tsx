"use client";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

//TO DO: Enter necessary inputs, Create logic to communicate with backend

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const steps = [
    {
      label: "Step 1: Personal Information",
      fields: (
        <>
          <label htmlFor="firstName" className="block mb-2">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="border p-2 rounded w-full mb-4"
          />
          <label htmlFor="lastName" className="block mb-2">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </>
      ),
    },
    {
      label: "Step 2: Contact Details",
      fields: (
        <>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
        </>
      ),
    },
    {
      label: "Step 3: Confirmation",
      fields: (
        <>
          <p>Please review your information before submitting:</p>
          <div className="mt-4">
            <p>
              <strong>First Name:</strong> {formData.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {formData.lastName}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
          </div>
        </>
      ),
    },
    {
      label: "Confirm",
      fields: (
        <>
          <h1>hi</h1>
        </>
      ),
    },
  ];

  // Calculate progress as a percentage based on the current step.
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Handle final submission (for example purposes, just logging the data)
  function handleSubmit(e: React.ChangeEvent<any>) {
    e.preventDefault();
    console.log("Form submitted", formData);
    // Add any submission logic here (e.g., API calls)
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex justify-center items-center mb-8">
        <Progress value={progress} className="w-1/3 [&>div]:bg-blue-600" />
      </div>

      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">{steps[currentStep].label}</h2>
        <form onSubmit={handleSubmit}>
          <div>{steps[currentStep].fields}</div>
          <div className="mt-6 flex justify-between">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Back
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-auto"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

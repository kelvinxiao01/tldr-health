"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Progress } from "@/components/ui/progress";

// Define the shape of the form data
interface FormData {
  gender: string;
  age: string;
  annualIncome: string;
  chronicConditions: string;
  pregnant: string;
  smoke: string;
  specialistVisits: string;
  providerPreference: string;
  travel: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    gender: "",
    age: "",
    annualIncome: "",
    chronicConditions: "",
    pregnant: "",
    smoke: "",
    specialistVisits: "",
    providerPreference: "",
    travel: "",
  });
  // currentPage: 0 = Personal Information, 1 = Income, 2 = Health Conditions
  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalPages = 3;
  const progress: number = ((currentPage + 1) / totalPages) * 100;

  // Required field keys for each page
  const pageRequirements: (keyof FormData)[][] = [
    ["gender", "age"],
    ["annualIncome"],
    [
      "chronicConditions",
      "pregnant",
      "smoke",
      "specialistVisits",
      "providerPreference",
      "travel",
    ],
  ];

  // Check if all required fields on the current page are non-empty (after trimming)
  const pageIsValid: boolean = pageRequirements[currentPage].every(
    (field) => formData[field].trim() !== ""
  );

  // Update a given field in the form data
  const updateField = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Define the pages with their title and content
  const pages = [
    {
      title: "Personal Information",
      content: (
        <div className="space-y-4">
          {/* Gender field */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700" htmlFor="gender">
              What is your gender?
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                updateField("gender", e.target.value)
              }
              className="border rounded px-3 py-2 focus:outline-none focus:border-blue-600"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {/* Age field */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700" htmlFor="age">
              What is your age?
            </label>
            <input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateField("age", e.target.value)
              }
              className="border rounded px-3 py-2 focus:outline-none focus:border-blue-600"
              placeholder="Your age"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Income",
      content: (
        <div className="flex flex-col">
          <label
            className="mb-2 font-medium text-gray-700"
            htmlFor="annualIncome"
          >
            What is your estimated annual income?
          </label>
          <input
            id="annualIncome"
            type="number"
            value={formData.annualIncome}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateField("annualIncome", e.target.value)
            }
            className="border rounded px-3 py-2 focus:outline-none focus:border-blue-600"
            placeholder="Annual Income"
          />
        </div>
      ),
    },
    {
      title: "Health Conditions",
      content: (
        <div className="space-y-6">
          {/* Chronic conditions */}
          <div>
            <p className="mb-2 font-medium text-gray-700">
              Do you have any chronic conditions that require frequent medical
              care? (E.g., diabetes, heart disease, asthma.)
            </p>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="chronicConditions"
                  value="yes"
                  checked={formData.chronicConditions === "yes"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateField("chronicConditions", e.target.value)
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="chronicConditions"
                  value="no"
                  checked={formData.chronicConditions === "no"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateField("chronicConditions", e.target.value)
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          {/* Pregnancy */}
          <div>
            <p className="mb-2 font-medium text-gray-700">
              Are you currently pregnant or planning to become pregnant in the
              next year?
            </p>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pregnant"
                  value="yes"
                  checked={formData.pregnant === "yes"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateField("pregnant", e.target.value)
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pregnant"
                  value="no"
                  checked={formData.pregnant === "no"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateField("pregnant", e.target.value)
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          {/* Smoking */}
          <div>
            <p className="mb-2 font-medium text-gray-700">
              Do you smoke or use tobacco?
            </p>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="smoke"
                  value="yes"
                  checked={formData.smoke === "yes"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateField("smoke", e.target.value)
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="smoke"
                  value="no"
                  checked={formData.smoke === "no"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateField("smoke", e.target.value)
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          {/* Specialist visits */}
          <div>
            <p className="mb-2 font-medium text-gray-700">
              Do you need frequent specialist visits?
            </p>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="specialistVisits"
                  value="yes"
                  checked={formData.specialistVisits === "yes"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateField("specialistVisits", e.target.value)
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="specialistVisits"
                  value="no"
                  checked={formData.specialistVisits === "no"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateField("specialistVisits", e.target.value)
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
          {/* Provider preference */}
          <div>
            <p className="mb-2 font-medium text-gray-700">
              Do you prefer having more provider choices or lower costs with a
              limited network?
            </p>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="providerPreference"
                  value="PPO"
                  checked={formData.providerPreference === "PPO"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateField("providerPreference", e.target.value)
                  }
                  className="mr-1"
                />
                PPO
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="providerPreference"
                  value="HMO"
                  checked={formData.providerPreference === "HMO"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateField("providerPreference", e.target.value)
                  }
                  className="mr-1"
                />
                HMO
              </label>
            </div>
          </div>
          {/* Travel */}
          <div>
            <p className="mb-2 font-medium text-gray-700">
              Do you travel frequently or live in multiple locations throughout
              the year?
            </p>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="travel"
                  value="yes"
                  checked={formData.travel === "yes"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateField("travel", e.target.value)
                  }
                  className="mr-1"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="travel"
                  value="no"
                  checked={formData.travel === "no"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateField("travel", e.target.value)
                  }
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>
        </div>
      ),
    },
  ];

  // Handle final form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Final form data:", formData);
    // Add your submission logic here
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Progress bar with blue-600 fill */}
      <div className="flex justify-center mb-6">
        <Progress value={progress} className="w-full [&>div]:bg-blue-600" />
      </div>
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          {pages[currentPage].title}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">{pages[currentPage].content}</div>
          <div className="flex justify-between">
            {currentPage > 0 ? (
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            {currentPage < totalPages - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={!pageIsValid}
                className={`px-4 py-2 rounded ml-auto ${
                  pageIsValid
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-800 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={!pageIsValid}
                className={`px-4 py-2 rounded ml-auto ${
                  pageIsValid
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-300 text-gray-800 cursor-not-allowed"
                }`}
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

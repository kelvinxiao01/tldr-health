"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

const apiUrl = "http://localhost:8000";

// Define the shape of the form data
interface FormData {
  name: string;
  gender: string;
  age: string;
  annualIncome: string;
  chronicConditions: string;
  pregnant: string;
  smoke: string;
  specialistVisits: string;
  providerPreference: string;
  travel: string;
  height: string;
  weight: string;
}

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [totalMedicalExpenditure, setTotalMedicalExpenditure] = useState();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "",
    age: "",
    annualIncome: "",
    chronicConditions: "",
    pregnant: "",
    smoke: "",
    specialistVisits: "",
    providerPreference: "",
    travel: "",
    height: "",
    weight: "",
  });

  // currentPage: 0 = Personal Information, 1 = Income, 2 = Health Conditions
  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalPages = 3;
  const progress: number = ((currentPage + 1) / totalPages) * 100;

  console.log(totalMedicalExpenditure);

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

  function calculateBMI(height: string, weight: string) {
    const heightVal = +height;
    const weightVal = +weight;
    return (weightVal * 703) / heightVal ** 2;
  }

  // Define the pages with their title and content
  const pages = [
    {
      title: "Personal Information",
      content: (
        <div className="space-y-4">
          {/* Name and Gender fields */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700" htmlFor="name">
              What is your name?
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateField("name", e.target.value)
              }
              className="border rounded px-3 py-2 focus:outline-none focus:border-blue-600 mb-2"
              placeholder="Name"
            />
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
              <option value="0">Male</option>
              <option value="1">Female</option>
              <option value="0">Other</option>
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

          {/* Height and Weight fields side by side */}
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col w-1/2">
              <label className="font-medium text-gray-700" htmlFor="height">
                Height (In)
              </label>

              <input
                id="heightIn"
                type="number"
                value={formData.height}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateField("height", e.target.value)
                }
                className="border rounded px-3 py-2 focus:outline-none focus:border-blue-600 mt-2"
                placeholder="Height (in)"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label
                className="mb-2 font-medium text-gray-700"
                htmlFor="weight"
              >
                Weight (lbs)
              </label>
              <input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateField("weight", e.target.value)
                }
                className="border rounded px-3 py-2 focus:outline-none focus:border-blue-600"
                placeholder="Weight"
              />
            </div>
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
                  value="1"
                  checked={formData.chronicConditions === "1"}
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
                  value="0"
                  checked={formData.chronicConditions === "0"}
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
                  value="1"
                  checked={formData.pregnant === "1"}
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
                  value="0"
                  checked={formData.pregnant === "0"}
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
                  value="1"
                  checked={formData.smoke === "1"}
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
                  value="0"
                  checked={formData.smoke === "0"}
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
                  value="1"
                  checked={formData.specialistVisits === "1"}
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
                  value="0"
                  checked={formData.specialistVisits === "0"}
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
                  value="1"
                  checked={formData.travel === "1"}
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
                  value="0"
                  checked={formData.travel === "0"}
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

  async function submitUserForm(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    console.log(isLoading);
    try {
      const bmi = calculateBMI(formData.height, formData.weight);
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          age: +formData.age,
          sex: formData.gender,
          bmi: bmi,
          children: 0,
          smoker: formData.smoke,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }
      const data = await response.json();
      setTotalMedicalExpenditure(data.prediction);
      router.push(
        `/results?prediction=${data.prediction}&age=${+formData.age}&sex=${
          formData.gender
        }&bmi=${bmi}&children=${0}&smoke=${formData.smoke}`
      );
    } catch (error) {
      setIsLoading(false);
      console.log("error sending form data to backend: ", error);
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Progress bar with blue-600 fill */}
      <div className="flex justify-center mb-6">
        <Progress value={progress} className="w-full [&>div]:bg-blue" />
      </div>
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          {pages[currentPage].title}
        </h2>
        <form onSubmit={submitUserForm}>
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
                    ? "bg-blue hover:bg-blue-700 text-white"
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
                    ? "bg-orange-500 hover:bg-orange-600 text-eggshell"
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

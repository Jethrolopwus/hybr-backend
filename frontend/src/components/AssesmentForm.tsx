"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserData, Assessment } from "@/types/generatedTypes";
import { QUESTIONS } from "../utils/questions";
import Question from "./Question";

const AssessmentForm: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<"user" | "questions">("user");
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    company: "",
    industry: "",
    companySize: "",
  });
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUserDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateUserData = () => {
    const newErrors: string[] = [];

    if (!userData.name.trim()) newErrors.push("Name is required");
    if (!userData.email.trim()) newErrors.push("Email is required");
    if (!/^\S+@\S+\.\S+$/.test(userData.email))
      newErrors.push("Email is invalid");
    if (!userData.company.trim()) newErrors.push("Company name is required");
    if (!userData.industry) newErrors.push("Industry is required");
    if (!userData.companySize) newErrors.push("Company size is required");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleQuestionResponse = (id: number, value: number) => {
    setResponses((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateResponses = () => {
    const newErrors: string[] = [];

    if (Object.keys(responses).length < QUESTIONS.length) {
      newErrors.push("Please answer all questions");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleUserDataSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateUserData()) {
      setErrors([]);
      setStep("questions");
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateResponses()) return;

    setIsSubmitting(true);

    try {
      // Submit assessment to API
      const assessment: Assessment = {
        userData,
        responses,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/assessments`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(assessment),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit assessment");
      }

      console.log(response);

      const data = await response.json();
      console.log("I am Data", data.assessment.id);
      router.push(`/result/?id=${data.assessment.id}`);
    } catch (error) {
      setErrors(["Failed to submit assessment. Please try again."]);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl shadow-xl mx-auto">
      {errors.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Please fix the following errors:
              </h3>
              <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {step === "user" ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl flex justify-center font-bold mb-8">
            Your Information
          </h2>
          <form onSubmit={handleUserDataSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleUserDataChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleUserDataChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={userData.company}
                  onChange={handleUserDataChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <div>
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={userData.industry}
                  onChange={handleUserDataChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">Select Industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="companySize"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Size
                </label>
                <select
                  id="companySize"
                  name="companySize"
                  value={userData.companySize}
                  onChange={handleUserDataChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">Select Company Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="501+">501+ employees</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="w-80 bg-[#0675a8] text-white py-3 px-4 rounded-md hover:bg-"
              >
                Continue to Assessment
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Innovation Assessment</h2>
          <p className="mb-6 text-gray-600">
            Please rate each statement on a scale of 1-5 according to the
            provided scale. Your honest assessment will help identify your
            organization's innovation strengths and opportunities.
          </p>

          <form onSubmit={handleSubmit}>
            {QUESTIONS.map((question) => (
              <Question
                key={question.id}
                question={question}
                value={responses[question.id] || null}
                onChange={handleQuestionResponse}
              />
            ))}

            <div className="mt-8 flex space-x-4">
              <button
                type="button"
                onClick={() => setStep("user")}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-blue-600 text-white py-3 px-4 rounded-md ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Assessment"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AssessmentForm;

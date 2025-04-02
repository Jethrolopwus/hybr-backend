import { Question } from "@/types/generatedTypes";

export const QUESTIONS: Question[] = [
    {
      id: 1,
      text: "How effectively does your organization identify and articulate key business challenges?",
      category: "problemIdentification",
      responseType: "effectiveness",
      weight: 1.5
    },
    {
      id: 2,
      text: "How often does your team refine and reframe problems before jumping to solutions?",
      category: "problemIdentification",
      responseType: "frequency",
      weight: 1.2
    },
    {
      id: 3,
      text: "How frequently does your organization involve diverse stakeholders in problem-identification processes?",
      category: "stakeholderEngagement",
      responseType: "frequency",
      weight: 1.0
    },
    {
      id: 4,
      text: "To what degree does your company encourage cross-functional collaboration when defining problems?",
      category: "stakeholderEngagement",
      responseType: "frequency",
      weight: 1.3
    },
    {
      id: 5,
      text: "How effectively does your organization engage with customers or end-users to understand their pain points?",
      category: "customerFocus",
      responseType: "effectiveness",
      weight: 1.4
    },
    {
      id: 6,
      text: "How often does your team conduct field research or ethnographic studies to observe problems firsthand?",
      category: "researchMethods",
      responseType: "frequency",
      weight: 1.1
    },
    {
      id: 7,
      text: "To what extent does your organization use data analytics to identify emerging issues or trends?",
      category: "dataUtilization",
      responseType: "frequency",
      weight: 1.2
    },
    {
      id: 8,
      text: "How effectively does your company leverage customer feedback channels to spot potential problems?",
      category: "customerFocus",
      responseType: "effectiveness",
      weight: 1.3
    }
  ];
  
  export const CATEGORIES = {
    problemIdentification: "Problem Identification",
    stakeholderEngagement: "Stakeholder Engagement",
    customerFocus: "Customer Focus",
    researchMethods: "Research Methods",
    dataUtilization: "Data Utilization"
  };
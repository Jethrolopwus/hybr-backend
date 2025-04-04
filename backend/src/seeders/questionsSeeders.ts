
import { Question } from '../models';

async function seedQuestions() {
  try {
    await Question.sync({ force: true }); 
    
    const sampleQuestions = [
      { 
        text: 'How effectively does your organization identify and articulate key business challenges?', 
        category: 'Problem Identification', 
        maxScore: 5 
      },
      { 
        text: 'How often does your team refine and reframe problems before jumping to solutions?', 
        category: 'Problem Identification', 
        maxScore: 5 
      },
      { 
        text: 'How frequently does your organization involve diverse stakeholders in problem-identification processes?', 
        category: 'Problem Identification', 
        maxScore: 5 
      },
      { 
        text: 'To what degree does your company encourage cross-functional collaboration when defining problems?', 
        category: 'Collaboration', 
        maxScore: 5 
      },
      { 
        text: 'How effectively does your organization engage with customers or end-users to understand their pain points?', 
        category: 'Customer Focus', 
        maxScore: 5 
      },
      { 
        text: 'How often does your team conduct field research or ethnographic studies to observe problems firsthand?', 
        category: 'Research', 
        maxScore: 5 
      },
      { 
        text: 'To what extent does your organization use data analytics to identify emerging issues or trends?', 
        category: 'Data Analytics', 
        maxScore: 5 
      },
      { 
        text: 'How effectively does your company leverage customer feedback channels to spot potential problems?', 
        category: 'Customer Focus', 
        maxScore: 5 
      }
    ];
    
    await Question.bulkCreate(sampleQuestions);
    console.log('Questions have been seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
}

seedQuestions();
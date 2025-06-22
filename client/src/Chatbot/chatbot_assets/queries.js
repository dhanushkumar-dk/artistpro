const queries = [
  // === Profile Category ===
  { id: 1, category: "Profile", prompt: "How can I edit my profile?" },
  {
    id: 2,
    category: "Profile",
    prompt: "What information can I change in my profile?",
  },
  {
    id: 3,
    category: "Profile",
    prompt: "What are the immutable fields in my profile?",
  },
  {
    id: 4,
    category: "Profile",
    prompt: "How do I change my first name and last name?",
  },
  { id: 5, category: "Profile", prompt: "How can I change my password?" },
  {
    id: 6,
    category: "Profile",
    prompt: "How do I update my country, state, and address?",
  },
  { id: 22, category: "Profile", prompt: "Can I see and edit my tickets?" },
  {
    id: 23,
    category: "Profile",
    prompt: "Where can I check my events and activity?",
  },

  // === Instruments Category ===
  {
    id: 7,
    category: "Instruments",
    prompt: "How can I view my owned instruments?",
  },
  {
    id: 8,
    category: "Instruments",
    prompt: "How can I view the details of an owned instrument?",
  },
  {
    id: 9,
    category: "Instruments",
    prompt: "How can I return a rented instrument?",
  },
  {
    id: 10,
    category: "Instruments",
    prompt: "How do I view the instruments I have rented?",
  },
  {
    id: 11,
    category: "Instruments",
    prompt: "Where can I find the details of a rented instrument?",
  },
  {
    id: 12,
    category: "Instruments",
    prompt: "What happens when I click 'Return the Instrument'?",
  },
  { id: 24, category: "Instruments", prompt: "How can I rent an instrument?" },
  {
    id: 25,
    category: "Instruments",
    prompt: "How do I request for instrument details?",
  },

  // === Events Category ===
  { id: 30, category: "Events", prompt: "How can I add a new event?" },
  { id: 31, category: "Events", prompt: "How do genre filters work?" },
  { id: 32, category: "Events", prompt: "How to register for an event?" },
  { id: 33, category: "Events", prompt: "Where can I find event details?" },

  // === Community Category ===
  { id: 40, category: "Community", prompt: "How do I create a post?" },
  { id: 41, category: "Community", prompt: "Who can like posts?" },
  { id: 42, category: "Community", prompt: "Can I delete my post?" },
  { id: 43, category: "Community", prompt: "Who can see the community posts?" },

  // === Chatbot Category ===
  {
    id: 50,
    category: "Chatbot",
    prompt: "What can this chatbot help me with?",
  },

  // === Navigation Category ===
  {
    id: 13,
    category: "Navigation",
    prompt: "How do I navigate to my profile?",
  },
  {
    id: 14,
    category: "Navigation",
    prompt: "How do I navigate to my owned instruments?",
  },
  { id: 15, category: "Navigation", prompt: "How can I check my tickets?" },
  { id: 16, category: "Navigation", prompt: "How can I check my events?" },
  { id: 17, category: "Navigation", prompt: "How do I log out of my account?" },
  { id: 18, category: "Navigation", prompt: "What is the activity page?" },

  // === General Category ===
  { id: 19, category: "General", prompt: "How do I return to the homepage?" },
  {
    id: 20,
    category: "General",
    prompt: "Can I edit my profile from the home page?",
  },
  {
    id: 21,
    category: "General",
    prompt:
      "What should I do if I encounter any issues with my profile or instruments?",
  },
];

export default queries;

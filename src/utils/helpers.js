export const generateName = () => {
  const maleFirstNames = ["Aarav", "Vivaan", "Arjun", "Rohan", "Aryan", "Advait"];
  const femaleFirstNames = ["Aanya", "Ananya", "Advika", "Ishita", "Kiara", "Neha"];
  const lastNames = ["Sharma", "Patel", "Joshi", "Kumar", "Singh", "Verma"];

  const randomFirstName = Math.random() < 0.5
    ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
    : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];

  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
};




// console.log(generateName(5));

export const randomLiveChat = () => {
  // const users = ["User123", "JohnDoe", "Alice", "Bob"];
  const greetings = ["Hi", "Hello", "Hey"];
  // const actions = ["is typing...", "sent a message", "reacted with 😄"];
  const messages = ["How are you doing?", "Any plans for the weekend?", "I like your profile picture!"];

  // const randomUser = users[Math.floor(Math.random() * users.length)];
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  // const randomAction = actions[Math.floor(Math.random() * actions.length)];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return `${randomGreeting}! ${randomMessage}`;
};


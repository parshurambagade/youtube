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


export const formatIsoTimestamp = (isoTimestamp) => {
  // Create a new Date object from the provided ISO timestamp string
  const date = new Date(isoTimestamp);

  // Define formatting options for the resulting date
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Kolkata', // Set the time zone to India (Asia/Kolkata)
  };

  // Convert the date to a formatted string using the specified options
  const formattedDate = date.toLocaleString(undefined, options);

  // Return the formatted date string
  return formattedDate;
};

// Test the function
// const isoTimestamp = '2024-01-18T17:01:56.003Z';
// const formattedDate = formatIsoTimestamp(isoTimestamp);

// Log the result
// console.log(`Formatted Date in Indian Time: ${formattedDate}`);

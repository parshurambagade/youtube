import { formatDistanceToNow } from 'date-fns';
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img10 from "../assets/img10.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img9 from "../assets/img9.jpg";
import img8 from "../assets/img8.jpg";

export const generateName = () => {
  const maleFirstNames = ["Aarav", "Vivaan", "Arjun", "Rohan", "Aryan", "Advait", "Raj", "Kishor","Anant", "Shrikant", "Rahul"];
  const femaleFirstNames = ["Aanya", "Ananya", "Advika", "Ishita", "Kiara", "Neha", "Shruti", "Ravi", "Manasi", "Radha", "Madhuri", "Swapnali"];
  const lastNames = ["Sharma", "Patel", "Joshi", "Kumar", "Singh", "Verma", "Patil", "Jadhav", "Negi", "Dikshit", "Raj"];

  const randomFirstName = Math.random() < 0.5
    ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
    : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];

  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
};


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

export const formatTimeAgo = (isoTimestamp) => {
  const currentTime = new Date();
  const timestamp = new Date(isoTimestamp);
  const timeDifference = currentTime - timestamp;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
};




export const formatCount = (views) => {
  if (views >= 1000000) {
    // Convert to millions with one decimal place
    return (views / 1000000).toFixed(1) + 'M';
  } else if (views >= 1000) {
    // Convert to thousands
    return Math.floor(views / 1000) + 'K';
  } else {
    // Use the original number if less than 1000
    return views;
  }
};

export const generateRandomImage = () => {
  // Array of sample profile pictures
  const profilePics = [
    img1, img2, img4, img3, img5, img6, img7, img8, img9, img10
    ];  

  // Randomly select a profile picture from the array
  const randomProfilePic = profilePics[Math.floor(Math.random() * profilePics.length)];

  // Return the random profile picture
  return randomProfilePic;
};






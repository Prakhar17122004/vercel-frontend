export const getInitials = (fullName) => {
  if (!fullName) return "";
  
  const words = fullName.trim().split(" ");
  let initials = "";
  
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    if (words[i].length > 0) {
      initials += words[i][0];
    }
  }
  console.log("Initials:", initials); // Debugging line
  return initials.toUpperCase();
};

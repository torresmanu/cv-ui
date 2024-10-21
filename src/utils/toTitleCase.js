export const titleCase = (str) => {
  // Handle null or undefined inputs
  if (str === null || str === undefined) {
    return '';
  }

  // Ensure str is a string
  if (typeof str !== 'string') {
    str = str.toString();
  }

  // Remove 'vm_' prefix if present
  if (str?.startsWith('vm_')) {
    str = str?.substring(3);
  }

  // Remove '_id' suffix if present
  if (str?.endsWith('_id')) {
    str = str?.substring(0, str.length - 3);
  }

  // Split the string by dots
  let words = str?.split('.');

  // Capitalize the first letter of each word, handling underscores as well
  let formattedWords = words.map((word) => {
    // Split by underscores and capitalize each part
    return word
      .split('_')
      .map((subWord) => subWord?.charAt(0)?.toUpperCase() + subWord?.slice(1))
      .join(' ');
  });

  // Join the words with a space
  return formattedWords.join(' ');
};
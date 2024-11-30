function longestSubstring(str) {
  let maxLength = 0;
  let start = 0;
  const charIndexMap = {};

  for (let end = 0; end < str.length; end++) {
    const char = str[end];
    const prevIndex = charIndexMap[char];

    if (prevIndex >= start) {
      start = prevIndex + 1;
    }

    charIndexMap[char] = end;
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}

// Example usage:
const string = "abcdddefgi";
const length = longestSubstring(string);
console.log(length); // Output: 3 (for "abc")
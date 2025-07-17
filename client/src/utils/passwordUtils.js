// src/utils/passwordUtils.js

/**
 * Checks password strength based on defined rules.
 * @param {string} password - The password to validate.
 * @returns {Array} - List of issues if any.
 */
export const checkPasswordRules = (password) => {
  const issues = [];
  const specialChars = password.match(/[@#$%/]/g) || [];
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);

  if (password.length < 8) issues.push("Minimum 8 characters required");
  if (specialChars.length < 1)
    issues.push("At least 1 special character required (@, #, $, %, /)");
  if (!hasLower) issues.push("At least 1 lowercase letter required");
  if (!hasUpper) issues.push("At least 1 uppercase letter required");
  if (!hasDigit) issues.push("At least 1 number required");

  return issues;
};

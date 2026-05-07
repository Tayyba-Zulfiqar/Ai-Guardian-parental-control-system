/**
 * Generates a random alphanumeric pairing code
 * @returns {string}
 */
export const generatePairingCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

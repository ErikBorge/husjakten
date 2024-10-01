import { randomBytes, createHash } from "crypto";

export const saltAndHashPassword = (password: string) => {
  const salt = randomBytes(16).toString("hex"); // Generate a random salt
  const hash = createHash("sha256") // Use SHA-256 for hashing
    .update(salt + password) // Combine salt and password
    .digest("hex"); // Get the hash in hexadecimal format

  return { salt, hash }; // Return both salt and hash
};

/**
 * Validates that all required VITE_ environment variables are present
 * and throws a clear error at startup if any are missing.
 *
 * Call this at the top of main.jsx before anything else renders.
 */
const REQUIRED_ENV_VARS = ['VITE_API_URL'];

export function validateEnv() {
  const missing = REQUIRED_ENV_VARS.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    const list = missing.map((k) => `  • ${k}`).join('\n');
    throw new Error(
      `[ChangelogHub] Missing required environment variables:\n${list}\n\n` +
        `Create a .env file in the frontend root with the missing values.\n` +
        `Example:\n  VITE_API_URL=http://localhost:5000/api`
    );
  }
}

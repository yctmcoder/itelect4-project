
 // src/pages/LoginPage.tsx

import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import useAuthStore from "../store/authStore";

function LoginPage() {
  // Form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Authentication state
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  // Redirect after successful login
  const navigate = useNavigate();

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    clearError();

    try {
      await login(email.trim(), password);

      // Redirect only after login succeeds
      navigate("/", { replace: true });
    } catch {
      // The auth store displays the error message
    }
  };

  return (
    <div className="mx-auto max-w-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Library Login
      </h2>

      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Enter your email and password to access the Library App.
      </p>

      <form onSubmit={handleLogin}>
        {/* Email */}
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError();
          }}
          placeholder="Enter your email"
          autoComplete="email"
          required
          disabled={isLoading}
          className="mb-3 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />

        {/* Password */}
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError();
          }}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          disabled={isLoading}
          className="mb-3 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />

        {/* Login error */}
        {error && (
          <p
            role="alert"
            className="mb-3 rounded border border-red-300 bg-red-50 p-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
          >
            {error}
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={
            isLoading ||
            !email.trim() ||
            !password
          }
          className="mt-3 rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

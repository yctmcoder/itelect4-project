// src/pages/LoginPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router";

import useAuthStore from "../store/authStore";

function LoginPage() {
  // Stores the user's name
  const [name, setName] = useState<string>("");

  // Gets the login function from the auth store
  const login = useAuthStore((state) => state.login);

  // Used to redirect after login
  const navigate = useNavigate();

  // Handles login
  const handleLogin = (): void => {
    login(name);

    // Send the user to the Library Dashboard
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-sm">

      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Library Login
      </h2>

      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Enter your name to access the Library App.
      </p>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      />

      <button
        onClick={handleLogin}
        disabled={name === ""}
        className="mt-3 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
      >
        Log In
      </button>

    </div>
  );
}

export default LoginPage;
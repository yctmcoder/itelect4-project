
 // src/store/authStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

// =====================================================
// API CONFIGURATION
// =====================================================

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:4000"
).replace(/\/$/, "");

// =====================================================
// TYPES
// =====================================================

interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
}

interface AuthResponse {
  token?: string;
  user?: AuthUser;
  message?: string;
}

interface AuthState {
  token: string | null;
  userName: string | null;
  userEmail: string | null;
  isLoading: boolean;
  error: string | null;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => void;
  clearError: () => void;
}

// =====================================================
// HELPER: API ERROR HANDLING
// =====================================================

async function parseResponse(
  response: Response
): Promise<AuthResponse> {
  const data: AuthResponse = await response
    .json()
    .catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message ||
        `Authentication failed (HTTP ${response.status})`
    );
  }

  return data;
}

// =====================================================
// ZUSTAND AUTH STORE
// =====================================================

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userName: null,
      userEmail: null,
      isLoading: false,
      error: null,

      // =================================================
      // LOGIN
      // POST /api/auth/login
      // =================================================

      login: async (email, password) => {
        set({
          isLoading: true,
          error: null,
        });

        try {
          const response = await fetch(
            `${API_URL}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
            }
          );

          const data = await parseResponse(response);

          if (!data.token) {
            throw new Error(
              "Login succeeded but no JWT was returned."
            );
          }

          // Used by src/api/client.ts
          localStorage.setItem("token", data.token);

          // Also save authentication in Zustand
          set({
            token: data.token,
            userName:
              data.user?.name || email,
            userEmail:
              data.user?.email || email,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Login failed.";

          set({
            isLoading: false,
            error: message,
          });

          throw new Error(message);
        }
      },

      // =================================================
      // REGISTER
      // POST /api/auth/register
      // =================================================

      register: async (
        name,
        email,
        password
      ) => {
        set({
          isLoading: true,
          error: null,
        });

        try {
          const response = await fetch(
            `${API_URL}/api/auth/register`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                password,
              }),
            }
          );

          await parseResponse(response);

          // The registration endpoint does not need
          // to return a JWT. Log in after registration.
          set({
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Registration failed.";

          set({
            isLoading: false,
            error: message,
          });

          throw new Error(message);
        }
      },

      // =================================================
      // LOGOUT
      // =================================================

      logout: () => {
        // Remove JWT used by the API client
        localStorage.removeItem("token");

        set({
          token: null,
          userName: null,
          userEmail: null,
          error: null,
          isLoading: false,
        });
      },

      // =================================================
      // CLEAR ERROR
      // =================================================

      clearError: () => {
        set({ error: null });
      },
    }),

    // ===================================================
    // ZUSTAND PERSIST CONFIGURATION
    // ===================================================

    {
      name: "library-auth",

      // Reset previously persisted demo-token sessions.
      version: 2,

      migrate: () => ({
        token: null,
        userName: null,
        userEmail: null,
      }),

      partialize: (state) => ({
        token: state.token,
        userName: state.userName,
        userEmail: state.userEmail,
      }),

      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        // Keep client.ts synchronized after page reload.
        // Ignore old demo tokens.
        if (
          state.token &&
          !state.token.startsWith("demo-token-")
        ) {
          localStorage.setItem(
            "token",
            state.token
          );
        } else {
          localStorage.removeItem("token");

          state.token = null;
          state.userName = null;
          state.userEmail = null;
        }
      },
    }
  )
);

export default useAuthStore;

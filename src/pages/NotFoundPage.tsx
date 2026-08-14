// src/pages/NotFoundPage.tsx

import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        404 -- Page Not Found
      </h2>

      <p className="mb-3 text-gray-600 dark:text-gray-400">
        The library page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="text-blue-600 underline hover:text-blue-700"
      >
        Go back to the Library Dashboard
      </Link>
    </div>
  );
}

export default NotFoundPage;
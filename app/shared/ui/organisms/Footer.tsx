import React from "react";

const readmeUrl = `${import.meta.env.VITE_GITHUB_URL}/phrases-grid/blob/main/README.md`

export default function Footer() {
  return (
    <footer className="fixed border-t text-sm text-center text-gray-500 bottom-0 w-full pb-4 pt-4">
      <p>
        Interbanking Challenge by <strong>{import.meta.env.VITE_AUTHOR_NAME}</strong> —{" "}
        <a
          href={import.meta.env.VITE_GITHUB_URL}
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          GitHub
        </a>{" "}
        |{" "}
        <a
          href={import.meta.env.VITE_LINKEDIN_URL}
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          LinkedIn
        </a>{" "}
        |{" "}
        <a
          href={readmeUrl}
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          README
        </a>
      </p>
    </footer>
  );
}

/** @type {import('tailwindcss').Config} */
export default {
  safelist: [
    'text-sm', 'text-gray-400', 'text-gray-200', 'text-center', 'underline', 'cursor-pointer', 'text-left', 'text-right',
    'px-4', 'py-1', 'rounded-md', 'bg-slate-950', 'bg-slate-800', 'mb-2', 'rounded-lg', 'block', 'inline-block'
  ],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


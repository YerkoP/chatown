/** @type {import('tailwindcss').Config} */
export default {
  safelist: [
    'text-sm', 'text-gray-400', 'text-gray-200', 'text-center', 'underline', 'cursor-pointer', 'text-left', 'text-right',
    'px-4', 'py-1', 'rounded-md', 'bg-slate-950', 'bg-slate-800', 'mb-2', 'rounded-lg', 'block', 'inline-block',
    'col-start-1', 'col-end-7', 'row-start-2', 'row-end-6', 'z-20'
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


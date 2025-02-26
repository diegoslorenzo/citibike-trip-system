import { useState } from "react";

interface Props {
  onSearch: (year: number, month?: number) => void;
}

const Form: React.FC<Props> = ({ onSearch }) => {
  const [year, setYear] = useState<number | "">("");
  const [month, setMonth] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (typeof year === "string") {
      alert("Por favor, ingresa un año válido.");
      return;
    }
  
    if (year < 2000 || year > new Date().getFullYear()) {
      alert("El año debe estar entre 2000 y el actual.");
      return;
    }
  
    const parsedMonth = month === "" ? undefined : month;
  
    if (parsedMonth !== undefined && (parsedMonth < 1 || parsedMonth > 12)) {
      alert("El mes debe estar entre 1 y 12.");
      return;
    }
  
    onSearch(year, parsedMonth);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
            Year *
          </label>
          <div className="mt-2">
            <input
              name="year"
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value) || "")}
              placeholder="Año"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label htmlFor="month" className="block text-sm/6 font-medium text-gray-900">
            Month (optional)
          </label>
          <div className="mt-2">
            <input
              name="month"
              type="number"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value) || "")}
              placeholder="Mes (opcional)"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="sm:col-span-3"></div>
      </div>
      <div className="mt-2 text-center">
        <button type="submit" className="cursor-pointer rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Search</button>
      </div>
    </form>
  );
};

export default Form;

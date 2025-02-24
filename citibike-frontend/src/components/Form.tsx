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
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(Number(e.target.value) || "")}
        placeholder="Año"
      />
      <input
        type="number"
        value={month}
        onChange={(e) => setMonth(Number(e.target.value) || "")}
        placeholder="Mes (opcional)"
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default Form;

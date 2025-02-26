import { useState } from "react";
import Form from "./components/Form";
import DatasetList from "./components/DatasetList";
import { fetchDatasets } from "./services/api";

function App() {
    const [datasets, setDatasets] = useState([]);([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false); // For the message when there are no datasets

    const handleSearch = async (year: number, month?:number) => {
        setIsLoading(true);
        setError(null);
        setHasSearched(true); // Se ha realizado una búsqueda
        
        
        try {
            const data = await fetchDatasets(year, month);
            setDatasets(data);
        } catch (err) {
            setError("Error al obtener los datos. Intenta nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center">New York City's CitiBike Datasets search</h1>
            <Form onSearch={handleSearch} />
            <DatasetList datasets={datasets} isLoading={isLoading} error={error} hasSearched={hasSearched} />
        </div>
    );
}

export default App;

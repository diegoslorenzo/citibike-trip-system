import { useState } from "react";
import Form from "./components/Form";
import DatasetList from "./components/DatasetList";
import { fetchDatasets } from "./services/api";

function App() {
    const [datasets, setDatasets] = useState([]);

    const handleSearch = async (year: number, month?:number) => {
        const data = await fetchDatasets(year, month);
        setDatasets(data);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-center">New York City's CitiBike Datasets search</h1>
            <Form onSearch={handleSearch} />
            <DatasetList datasets={datasets} />
        </div>
    );
}

export default App;

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
        <div>
            <h1>Buscador de Datasets CitiBike</h1>
            <Form onSearch={handleSearch} />
            <DatasetList datasets={datasets} />
        </div>
    );
}

export default App;

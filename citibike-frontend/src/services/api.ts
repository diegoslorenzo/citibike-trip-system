const API_URL = "http://127.0.0.1:8000/api/v1/citibike-datatset/";

export const fetchDatasets = async (year: number, month?: number) => {
    try {
        const response = await fetch(`${API_URL}?year=${year}${month ? `&month=${month}` : ''}`);
        if (!response.ok) {
            throw new Error("Error al obtener los datos.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en la petición:", error);
        return [];
    }
};

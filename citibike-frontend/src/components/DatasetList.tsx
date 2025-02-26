interface Dataset {
  name: string;
  url: string;
}

interface Props {
  datasets: Dataset[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

const DatasetList: React.FC<Props> = ({ datasets, isLoading, error, hasSearched }) => {
  return (
    <div className="mt-6 text-center">
      {/* 🟢 Loader while loading */}
      {isLoading && (
        <div className="text-center py-4">
          <span className="loader"></span>
          <p className="text-gray-500">Loading datasets...</p>
        </div>
      )}

      {/* 🔴 Error mesage if the API fails */}
      {error && !isLoading && (
        <p className="text-center text-red-500 py-4">{error}</p>
      )}

      {/* Message when nothing has been searched for yet */}
      {!hasSearched && !isLoading && !error && (
        <p className="text-center text-gray-500 py-4">Make a search to view datasets.</p>
      )}

      {/* 🟠 Mensaje cuando no hay datasets disponibles */}
      {hasSearched && datasets.length === 0 && !isLoading && !error && (
        <p className="text-center text-gray-500 py-4">No datasets available.</p>
      )}

      {/* 🟣 Lista de datasets */}
      {!isLoading && !error && datasets.length > 0 && (
        <ul role="list" className="divide-y divide-gray-100 bg-white shadow-sm rounded-md">
          {datasets.map((dataset) => (
            <li key={dataset.name} className="flex items-center justify-between gap-x-6 py-5 hover:bg-gray-50 p-3">
              <div className="min-w-0">
                <a href={dataset.url} className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                    />
                  </svg>
                  <span className="text-blue-600 hover:underline">{dataset.name}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DatasetList;

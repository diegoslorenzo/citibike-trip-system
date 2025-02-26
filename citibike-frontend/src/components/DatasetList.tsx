interface Dataset {
  name: string;
  url: string;
}

interface Props {
  datasets: Dataset[];
}

const DatasetList: React.FC<Props> = ({ datasets }) => {
  return (
    <div>
      {datasets.length === 0 ? (
        // Message when there are no datasets
        <p className="text-center text-gray-500 py-4">No datasets availables.</p>
      ) : (
        <ul role="list" className="divide-y divide-gray-100">
          {datasets.map((dataset) => (
            <li
              key={dataset.name} // Use the dataset name as the key
              className="flex items-center justify-between gap-x-6 py-5 hover:bg-gray-50 p-3"
            >
              <div className="min-w-0">
                <a href={dataset.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
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
                  <span className="text-gray-800 hover:underline">{dataset.name}</span>
                </a>
              </div>

              <div className="flex flex-none items-center gap-x-4">
                <a
                  href={dataset.url}
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                    />
                  </svg>
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

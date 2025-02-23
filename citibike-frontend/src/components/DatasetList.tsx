interface Dataset {
    name: string;
    url: string;
  }
  
  interface Props {
    datasets: Dataset[];
  }
  
  const DatasetList: React.FC<Props> = ({ datasets }) => {
    return (
      <ul>
        {datasets.map((dataset: Dataset, index: number) => (
          <li key={index}>
            <a href={dataset.url} target="_blank" rel="noopener noreferrer">
              {dataset.name}
            </a>
          </li>
        ))}
      </ul>
    );
  };
  
  export default DatasetList;
  
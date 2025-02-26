# Citibike Trip System

## About

This project allows you to query and analyze data from the CitiBike system in New York City using an API in FastAPI and a web interface in React with TypeScript.

Both services run in Docker containers using docker-compose, making them easy to deploy and run.

## 🛠️ Technology

### Backend
- **Programming Language**: Python 3.10
- **Framework**: FastAPI
- **Server**: Uvicorn
### Frontend
- **Language**: TypeScript
- **Framework**: React 
- **UI**: TailwindCSS 
### Docker & Docker Compose 🐳
- **Containers**: Docker, Docker Compose

## 🏗️ Architecture and scope

### Dataset Format and Structure
The CitiBike website provides downloadable files with trip data in a monthly format. These files have been determined to follow a pattern in their name based on the date of the corresponding month:

- The format is {year}{month} in YYYYMM (e.g., January 2024 → 202401).
- They can optionally be prefixed with "JC-".
- All files end in one of these two extensions:
- citibike-tripdata.csv.zip
- citibike-tripdata.zip

As a result, 4 possible combinations were identified for each month:
1. JC-YYYYMM-citibike-tripdata.csv.zip
2. JC-YYYYMM-citibike-tripdata.zip
3. YYYYMM-citibike-tripdata.csv.zip
4. YYYYMM-citibike-tripdata.zip

### API Decision
Since there are multiple possible formats for the same month, the API has been designed to:

- ✅ Automatically check all possible file name combinations for a given year and month.
- ✅ Check which ones are available for download on the CitiBike server.
- ✅ Return a JSON with the list of available files in the following format:

```json
[
  {
    "name": "JC-202402-citibike-tripdata.csv.zip",
    "url": "https://s3.amazonaws.com/tripdata/JC-202402-citibike-tripdata.csv.zip"
  },
  {
    "name": "202403-citibike-tripdata.csv.zip",
    "url": "https://s3.amazonaws.com/tripdata/202403-citibike-tripdata.csv.zip"
  },
  {
    "name": "202409-citibike-tripdata.zip",
    "url": "https://s3.amazonaws.com/tripdata/202409-citibike-tripdata.zip"
  },
  {
    "name": "JC-202409-citibike-tripdata.csv.zip",
    "url": "https://s3.amazonaws.com/tripdata/JC-202409-citibike-tripdata.csv.zip"
  }
]

```

### Frontend Decision
To provide a seamless user experience, the frontend allows users to enter a year and an optional month and view available datasets.

The design includes:
- ✅ A form to enter search filters (year and optional month).
- ✅ A loader while the query is being performed.
- ✅ A message if no searches have been performed or no results are found.
- ✅ A list of available files with direct download links.


## 🐳 Deployment

### Prerequisites
- Docker installed.
- Git for version control.

### Quickstart

1. Clone the Repository

```git clone https://github.com/diegoslorenzo/citibike-trip-system.git```

or download it from https://github.com/diegoslorenzo/citibike-trip-system

2. Go to the project

```cd citibike-trip-system```

3. Build and Deploy Docker Containers

```docker-compose up --build -d```

4. Run in the browser at http://localhost:5173 or load swagger UI in http://localhost:8000/docs 

## 🧪 Testing

### Running tests:

```docker exec -it citibike-system pytest -v```

### Code coverage:

```docker exec -it citibike-system pytest --cov=app --cov-report=term-missing -v```

or for make HTML inform:

``` docker exec -it citibike-system pytest --cov=app --cov-report=html ```



## 🔄 Future implementations and questions to resolve


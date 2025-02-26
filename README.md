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
- **Server**: Serve 
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

**How would you ensure the solution scales and the API has a low latency?**

When the API starts receiving millions of requests per day, a single server is not enough to handle the load. The solution is to scale horizontally, i.e. add multiple instances of the backend and distribute the requests between them using a Load Balancer. 

A Load Balancer is a component that receives all the requests from clients and distributes them between multiple instances of the backend.

Example with 3 instances and a Load Balancer:

```
                +-----------------------+
                |                       |
  Client  --->  |     Load Balancer     | ---> API instance 1
                | (Distributes traffic) | ---> API instance 2
                |                       | ---> API instance 3
                +-----------------------+
```

If we have only one instance, it will become overloaded when it receives too many requests.

To avoid this, we can deploy multiple instances in parallel with this strategies:
1. Approach 1: ✅ Docker + Kubernetes: We run multiple copies of the backend as pods in a cluster.
2. Approach 2: ✅ Auto Scaling: More instances are created automatically when the load increases.

**How and what would you monitor if you had to go to production with your solution?**

 1. What to monitor?
- Error Rate (HTTP 4xx, 5xx): If there is an increase in 500 responses (internal errors), something is wrong.
- Response Latency: How long it takes for the API to respond .
- CPU & Memory: If the API uses too much CPU/RAM, it might need more resources.
- Number of requests per second.

2. How to monitor?
- API logs
- Alerts and notifications: Slack, Teams, email,...

To ensure that the API in production is stable, we must:
- ✅ Monitor latency, errors, and traffic.
- ✅ Centralize logs with Datadog or CloudWatch or New Relic to detect errors.
- ✅ Configure alerts in Slack/Teams/... to act quickly on problems.
- ✅ Automate autoscaling to handle millions of requests without degradation (kubernetes/Auto Scaling).


**What authentication method should we use and why? (There is no good answer, just explain any method or framework that you know and mention its benefits and disadvantages: JWT, OAUTH ..etc).**
**Describe the changes needed at the front-end level to be able to authenticate with the API properly**

Authentication with OAuth2

How it works:

1. The user sends their username and password to the /token endpoint.
2. The server responds with an access token and a refresh token.
3. The access token is used in each request to authenticate.

When the access token expires, the refresh token allows a new one to be obtained without having to log in again.

✅ Advantages:
- ✔️ Secure for apps with users and third-party authentication (Google, Facebook, etc.).
- ✔️ Supports permissions and scopes (different access levels).
- ✔️ Tokens can be easily revoked.

❌ Disadvantages:
- ⛔ May require token storage in the backend.





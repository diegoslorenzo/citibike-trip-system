# Use the official Python 3.10 image from the Docker Hub
FROM python:3.10

# Define working directory
WORKDIR /app

# Copy dependencies and code
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# Expose port 8000 and run the API with Uvicorn
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

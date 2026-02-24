# Use an official Python runtime as a parent image
FROM python:3.11-slim-bookworm

# Set working directory
WORKDIR /app

# Install system dependencies if required for MySQL wrappers
RUN apt-get update && apt-get install -y pkg-config default-libmysqlclient-dev build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the actual application code
COPY . .

# Expose the port (by default 8080)
EXPOSE 8080

# Run the FastAPI server using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

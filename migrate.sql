CREATE DATABASE IF NOT EXISTS bridge_ecosystem;
USE bridge_ecosystem;

CREATE TABLE IF NOT EXISTS data_test (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    matchScore INT NOT NULL,
    type VARCHAR(100),
    location VARCHAR(100),
    expertise JSON,
    matchReasons JSON,
    verified BOOLEAN DEFAULT FALSE,
    projectsCompleted INT DEFAULT 0,
    avgRating FLOAT DEFAULT 0,
    description TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    contact_website VARCHAR(255),
    services JSON
);

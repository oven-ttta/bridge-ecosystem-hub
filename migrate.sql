CREATE DATABASE IF NOT EXISTS bridge_ecosystem;
USE bridge_ecosystem;

CREATE TABLE IF NOT EXISTS companies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    taxId VARCHAR(255),
    type TINYINT,
    companyNameTh VARCHAR(255),
    companyName VARCHAR(255),
    company_status TINYINT,
    register_date VARCHAR(20),
    typeofService VARCHAR(255),
    subtypeofService VARCHAR(255),
    additionalInfo TEXT,
    location VARCHAR(255),
    city VARCHAR(255),
    district VARCHAR(255),
    subdistrict VARCHAR(255),
    zip VARCHAR(20),
    country VARCHAR(255),
    status TINYINT,
    website VARCHAR(255),
    officeNumber VARCHAR(50),
    phoneNumber VARCHAR(50),
    faxNumber VARCHAR(50),
    is_tech TINYINT(1) DEFAULT 0,
    typeofServiceNonTech VARCHAR(255),
    typeofServiceNonTechOtherName VARCHAR(255),
    subtypeofServiceNonTech VARCHAR(255),
    registerCapital DOUBLE,
    oldTaxId VARCHAR(255),
    objective TEXT,
    financeYearLatestRecord VARCHAR(20),
    is_verified TINYINT(1) DEFAULT 0
);

-- Mock Data Generation Procedure
DELIMITER //
CREATE PROCEDURE generate_mock_companies()
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE i <= 10000 DO
        INSERT INTO companies (
            taxId, 
            type, 
            companyNameTh, 
            companyName, 
            company_status, 
            register_date, 
            typeofService, 
            subtypeofService, 
            additionalInfo, 
            location, 
            city, 
            district, 
            subdistrict, 
            zip, 
            country, 
            status, 
            website, 
            officeNumber, 
            phoneNumber, 
            faxNumber, 
            is_tech, 
            typeofServiceNonTech, 
            typeofServiceNonTechOtherName, 
            subtypeofServiceNonTech, 
            registerCapital, 
            oldTaxId, 
            objective, 
            financeYearLatestRecord, 
            is_verified
        ) VALUES (
            CONCAT('TAX', LPAD(i, 10, '0')),
            FLOOR(1 + RAND() * 4),
            CONCAT('บริษัท ตัวอย่างที่ ', i, ' จำกัด'),
            CONCAT('Example Company No. ', i, ' Co., Ltd.'),
            1,
            '2024-01-01',
            CASE WHEN i % 2 = 0 THEN 'IT Solutions' ELSE 'Consulting' END,
            CASE WHEN i % 2 = 0 THEN 'Software Development' ELSE 'Business Management' END,
            'Information about example company',
            '123/456 ถนน ตัวอย่าง',
            CASE (i % 5) 
                WHEN 0 THEN 'กรุงเทพมหานคร' 
                WHEN 1 THEN 'เชียงใหม่' 
                WHEN 2 THEN 'ระยอง' 
                WHEN 3 THEN 'ขอนแก่น' 
                ELSE 'ภูเก็ต' 
            END,
            'เขต/อำเภอ ตัวอย่าง',
            'แขวง/ตำบล ตัวอย่าง',
            '10110',
            'Thailand',
            1,
            CONCAT('https://www.example', i, '.com'),
            '02-123-4567',
            '081-234-5678',
            '02-123-4568',
            CASE WHEN i % 2 = 0 THEN 1 ELSE 0 END,
            NULL,
            NULL,
            NULL,
            RAND() * 10000000,
            NULL,
            'Business objectives go here',
            '2566',
            CASE WHEN i % 3 = 0 THEN 1 ELSE 0 END
        );
        SET i = i + 1;
    END WHILE;
END //
DELIMITER ;

-- Execute the procedure
CALL generate_mock_companies();

-- Cleanup procedure
DROP PROCEDURE generate_mock_companies;

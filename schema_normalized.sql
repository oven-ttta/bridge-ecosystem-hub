-- ═══════════════════════════════════════════════════════════════
-- BDI Normalized Schema
-- แยกจาก bdi_acc_company ออกเป็น 5 ตาราง
-- ═══════════════════════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS bdi_fp_dev;
USE bdi_fp_dev;

-- ─────────────────────────────────────────────────────────────
-- 1. bdi_company  (ข้อมูลหลักของบริษัท)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bdi_company (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    tax_id          VARCHAR(255) UNIQUE,
    old_tax_id      VARCHAR(255),
    type            TINYINT          COMMENT '1=บริษัท, 2=หจก., 3=ห้างหุ้นส่วน ฯลฯ',
    company_name_th VARCHAR(255)     NOT NULL,
    company_name    VARCHAR(255),
    objective       TEXT             COMMENT 'วัตถุประสงค์ / รายละเอียดกิจการ',
    register_date   DATE,
    register_capital DOUBLE          DEFAULT 0,
    company_status  TINYINT          DEFAULT 1 COMMENT '0=ปิด, 1=เปิด',
    is_tech         TINYINT(1)       DEFAULT 0,
    is_verified     TINYINT(1)       DEFAULT 0,
    created_at      TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────────────────────
-- 2. bdi_company_address  (ที่อยู่)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bdi_company_address (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id      BIGINT           NOT NULL,
    location        VARCHAR(255),
    subdistrict     VARCHAR(255),
    district        VARCHAR(255),
    city            VARCHAR(255)     COMMENT 'จังหวัด',
    zip             VARCHAR(20),
    country         VARCHAR(255)     DEFAULT 'Thailand',
    CONSTRAINT fk_address_company
        FOREIGN KEY (company_id) REFERENCES bdi_company(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ─────────────────────────────────────────────────────────────
-- 3. bdi_company_contact  (ช่องทางติดต่อ)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bdi_company_contact (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id      BIGINT           NOT NULL,
    website         VARCHAR(255),
    office_number   VARCHAR(50),
    phone_number    VARCHAR(50),
    fax_number      VARCHAR(50),
    CONSTRAINT fk_contact_company
        FOREIGN KEY (company_id) REFERENCES bdi_company(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ─────────────────────────────────────────────────────────────
-- 4. bdi_company_catalog  (Service & Product Catalog ← สำคัญ)
--    แต่ละบริษัทมีได้หลายรายการ
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bdi_company_catalog (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id      BIGINT           NOT NULL,

    catalog_type    ENUM('product','service')  NOT NULL
                    COMMENT 'product=สินค้าพร้อมขาย, service=รับจ้างพัฒนา',

    -- Tech
    typeof_service          VARCHAR(255)  COMMENT 'หมวดหมู่เทคโนโลยี (ถ้า is_tech=1)',
    subtypeof_service       VARCHAR(255)  COMMENT 'หมวดย่อย (ถ้า is_tech=1)',

    -- Non-tech
    typeof_service_nontech          VARCHAR(255)  COMMENT 'หมวดหมู่ (ถ้า is_tech=0)',
    typeof_service_nontech_other    VARCHAR(255)  COMMENT 'ชื่ออื่น ๆ',
    subtypeof_service_nontech       VARCHAR(255),

    additional_info TEXT   COMMENT 'รายละเอียดเพิ่มเติมของรายการนี้',

    created_at      TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_catalog_company
        FOREIGN KEY (company_id) REFERENCES bdi_company(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ─────────────────────────────────────────────────────────────
-- 5. bdi_company_finance  (ข้อมูลการเงิน)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bdi_company_finance (
    id                      BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id              BIGINT      NOT NULL UNIQUE, -- 1:1 กับ company
    register_capital        DOUBLE      DEFAULT 0,
    finance_year_latest     VARCHAR(20) COMMENT 'ปีบัญชีล่าสุดที่บันทึก',
    CONSTRAINT fk_finance_company
        FOREIGN KEY (company_id) REFERENCES bdi_company(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ═══════════════════════════════════════════════════════════════
-- INDEX (ช่วย query เร็วขึ้น)
-- ═══════════════════════════════════════════════════════════════
CREATE INDEX idx_company_city       ON bdi_company_address(city);
CREATE INDEX idx_company_is_tech    ON bdi_company(is_tech);
CREATE INDEX idx_company_verified   ON bdi_company(is_verified);
CREATE INDEX idx_catalog_type       ON bdi_company_catalog(catalog_type);
CREATE INDEX idx_catalog_service    ON bdi_company_catalog(typeof_service);

-- ═══════════════════════════════════════════════════════════════
-- MIGRATION: ย้ายข้อมูลจาก bdi_acc_company (ตารางเดิม)
-- รันหลังจากสร้างตารางใหม่แล้วเท่านั้น
-- ═══════════════════════════════════════════════════════════════

-- 1. ย้ายข้อมูลหลัก
INSERT INTO bdi_company (
    id, tax_id, old_tax_id, type, company_name_th, company_name,
    objective, register_capital, company_status,
    is_tech, is_verified, register_date
)
SELECT
    id, taxId, oldTaxId, type, companyNameTh, companyName,
    objective, registerCapital, company_status,
    is_tech, is_verified,
    CASE
        WHEN register_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' THEN STR_TO_DATE(register_date, '%Y-%m-%d')
        ELSE NULL
    END
FROM bdi_acc_company;

-- 2. ย้ายที่อยู่
INSERT INTO bdi_company_address (company_id, location, subdistrict, district, city, zip, country)
SELECT id, location, subdistrict, district, city, zip, country
FROM bdi_acc_company;

-- 3. ย้ายข้อมูลติดต่อ
INSERT INTO bdi_company_contact (company_id, website, office_number, phone_number, fax_number)
SELECT id, website, officeNumber, phoneNumber, faxNumber
FROM bdi_acc_company;

-- 4. ย้าย Catalog — Tech services
INSERT INTO bdi_company_catalog (company_id, catalog_type, typeof_service, subtypeof_service, additional_info)
SELECT id, 'service', typeofService, subtypeofService, additionalInfo
FROM bdi_acc_company
WHERE is_tech = 1 AND typeofService IS NOT NULL;

-- 5. ย้าย Catalog — Non-tech services
INSERT INTO bdi_company_catalog (
    company_id, catalog_type,
    typeof_service_nontech, typeof_service_nontech_other, subtypeof_service_nontech,
    additional_info
)
SELECT
    id, 'service',
    typeofServiceNonTech, typeofServiceNonTechOtherName, subtypeofServiceNonTech,
    additionalInfo
FROM bdi_acc_company
WHERE is_tech = 0 AND typeofServiceNonTech IS NOT NULL;

-- 6. ย้ายการเงิน
INSERT INTO bdi_company_finance (company_id, register_capital, finance_year_latest)
SELECT id, registerCapital, financeYearLatestRecord
FROM bdi_acc_company;

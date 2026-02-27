import csv
import re
import os

input_file = r'c:\Users\supad\Desktop\bridge-ecosystem-hub\csv\bdi_acc_company.csv'
output_file = r'c:\Users\supad\Desktop\bridge-ecosystem-hub\csv\bdi_acc_company_updated.csv'

def extract_tsic(objective_text):
    if not objective_text:
        return ""
    
    # Extract digit
    match = re.search(r'\b(\d{4,5})\b', objective_text)
    if match:
        return match.group(1)
        
    # Keyword mapping
    text_lower = objective_text.lower()
    
    # Software / Programming / Web
    if "ซอฟต์แวร์" in text_lower and ("ให้คำปรึกษา" in text_lower):
        return "62021"
    if "ซอฟต์แวร์" in text_lower:
        return "62011"
    if "โปรแกรมเว็บเพจ" in text_lower or "เครือข่าย" in text_lower:
        return "62012"
    if "การบริการเทคโนโลยีสารสนเทศ" in text_lower:
        return "62090"
    if "ฮาร์ดแวร์" in text_lower:
        return "62011"
        
    # IT equipment Sales
    if "ขายส่งคอมพิวเตอร์" in text_lower:
        return "46510"
    if ("ขายส่งอุปกรณ์" in text_lower and "อิเล็กทรอนิกส์" in text_lower) or "ขายส่งโทรศัพท์" in text_lower:
        return "46520"
    if "สื่อสารโทรคมนาคม" in text_lower:
        return "47420"
        
    # Advertising
    if "โฆษณา" in text_lower:
        return "73101"
        
    # Data Processing / Hosting
    if "การบริหารจัดการและประมวลผลข้อมูล" in text_lower:
        return "63110"
    if "การจัดการสิ่งอำนวยความสะดวกด้านคอมพิวเตอร์" in text_lower:
        return "62030"
        
    # Other specific
    if "คอนกรีตซีเมนต์" in text_lower:
        return "23959"
    if "การขนส่ง" in text_lower:
        return "52292"
    if "ให้สินเชื่อ" in text_lower:
        return "64922"
    if "บำบัดและการกำจัดของเสีย" in text_lower:
        return "38210"
    if "เก็บเงิน" in text_lower:
        return "82910"
    if "สีข้าว" in text_lower:
        return "10611"
    if "ผลิตน้ำตาล" in text_lower:
        return "10720"
        
    return ""

rows = []
headers = []
with open(input_file, mode='r', encoding='utf-8-sig') as infile:
    reader = csv.reader(infile)
    try:
        headers = next(reader)
    except StopIteration:
        pass
    for row in reader:
        rows.append(row)

with open(output_file, mode='w', encoding='utf-8-sig', newline='') as outfile:
    writer = csv.writer(outfile, quoting=csv.QUOTE_ALL)
    
    if 'tsic' not in headers:
        headers.append('tsic')
    
    writer.writerow(headers)
    
    obj_idx = headers.index('objective') if 'objective' in headers else -1
    tsic_idx = headers.index('tsic')
        
    for row in rows:
        while len(row) < len(headers):
            row.append("")
            
        if obj_idx != -1 and obj_idx < len(row):
            tsic_val = extract_tsic(row[obj_idx])
            if tsic_val:  
                row[tsic_idx] = tsic_val
            elif len(row[tsic_idx]) == 0:
                row[tsic_idx] = "" 
            
        writer.writerow(row)

os.replace(output_file, input_file)
print("Updated TSIC columns using keyword mapping!")

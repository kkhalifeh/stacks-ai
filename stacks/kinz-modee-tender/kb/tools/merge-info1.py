"""
Merge INFO-1 form (exported from browser) + audited financial statements
into a single unprotected PDF for submission.

Usage:
  1. Export INFO-1 from the browser: Print > Save as PDF > save as "info1-form.pdf"
  2. Run: python3 scripts/merge-info1.py

Output: ../Tender Docs/INFO-1-Complete.pdf
"""

from pypdf import PdfReader, PdfWriter
from pathlib import Path

# ── Paths ──
BASE = Path(__file__).resolve().parent.parent.parent  # "MODEE Tender" folder
FINANCIALS = BASE / "audited financials"

# Input files
INFO1_FORM = BASE / "Tender Docs" / "info1-form.pdf"  # Exported from browser
FS_2023 = FINANCIALS / "F.S Kinz for information tec.2023.pdf"
FS_2024 = FINANCIALS / "شركة كنز لتكنولوجيا المعلومات 2024 - rotated.pdf"

# Output
OUTPUT = BASE / "Tender Docs" / "INFO-1-Complete.pdf"

def merge():
    writer = PdfWriter()

    # 1. INFO-1 form page(s)
    if not INFO1_FORM.exists():
        print(f"ERROR: {INFO1_FORM}")
        print("  Export INFO-1 from the browser first:")
        print("  1. Open http://localhost:5173")
        print("  2. Click INFO-1 in sidebar")
        print("  3. Export > Save as PDF")
        print(f"  4. Save to: {INFO1_FORM}")
        return

    reader = PdfReader(str(INFO1_FORM))
    print(f"INFO-1 form: {len(reader.pages)} page(s)")
    for page in reader.pages:
        writer.add_page(page)

    # 2. FY 2023 financial statements (includes FY 2022 comparative)
    if not FS_2023.exists():
        print(f"ERROR: Missing {FS_2023}")
        return

    reader = PdfReader(str(FS_2023))
    print(f"FY 2023 statements: {len(reader.pages)} pages")
    for page in reader.pages:
        writer.add_page(page)

    # 3. FY 2024 financial statements (rotated)
    if not FS_2024.exists():
        print(f"ERROR: Missing {FS_2024}")
        return

    reader = PdfReader(str(FS_2024))
    print(f"FY 2024 statements: {len(reader.pages)} pages")
    for page in reader.pages:
        writer.add_page(page)

    # Write merged output
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with open(str(OUTPUT), 'wb') as f:
        writer.write(f)

    total = sum(1 for _ in PdfReader(str(OUTPUT)).pages)
    print(f"\nMerged PDF: {OUTPUT}")
    print(f"Total pages: {total}")
    print("This PDF should be submitted UNPROTECTED (no password).")

if __name__ == '__main__':
    merge()

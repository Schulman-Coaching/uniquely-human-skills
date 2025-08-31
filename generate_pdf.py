#!/usr/bin/env python3
"""
Script to generate PDF from HTML file using weasyprint.
"""

from weasyprint import HTML

def html_to_pdf(html_file, pdf_file):
    """Convert HTML file to PDF."""
    try:
        HTML(html_file).write_pdf(pdf_file)
        print(f"Successfully generated {pdf_file}")
    except Exception as e:
        print(f"Error generating PDF: {e}")

if __name__ == "__main__":
    html_file = "Uniquely_Human_Skills_Program_Outline.html"
    pdf_file = "Uniquely_Human_Skills_Program_Outline.pdf"
    html_to_pdf(html_file, pdf_file)
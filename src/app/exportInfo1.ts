import { PDFDocument } from 'pdf-lib';
import html2canvas from 'html2canvas';
import { infoAttachments } from './App';

// A4 dimensions in points (72 dpi)
const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;

/**
 * Render all INFO-1 page components to images, merge with financial PDFs,
 * and download as a single unprotected PDF.
 */
export async function exportInfo1Merged(): Promise<void> {
  const mergedDoc = await PDFDocument.create();

  // Step 1: Capture the rendered INFO-1 page(s) from the print view
  // We look for elements with data-info-page attribute
  const pageElements = document.querySelectorAll<HTMLElement>('[data-info-page]');

  if (pageElements.length === 0) {
    alert('No INFO-1 pages found. Make sure INFO-1 is the active section.');
    return;
  }

  for (const el of pageElements) {
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      width: 794,
      height: 1123,
    });

    const imgData = canvas.toDataURL('image/png');
    const imgBytes = await fetch(imgData).then(r => r.arrayBuffer());
    const img = await mergedDoc.embedPng(imgBytes);

    const page = mergedDoc.addPage([A4_WIDTH, A4_HEIGHT]);
    page.drawImage(img, {
      x: 0,
      y: 0,
      width: A4_WIDTH,
      height: A4_HEIGHT,
    });
  }

  // Step 2: Append all financial statement PDFs
  for (const att of infoAttachments) {
    const response = await fetch(att.url);
    const pdfBytes = await response.arrayBuffer();
    const srcDoc = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedDoc.copyPages(srcDoc, srcDoc.getPageIndices());
    for (const page of copiedPages) {
      mergedDoc.addPage(page);
    }
  }

  // Step 3: Download
  const mergedBytes = await mergedDoc.save();
  const blob = new Blob([mergedBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'INFO-1-Complete.pdf';
  a.click();
  URL.revokeObjectURL(url);
}

import html2pdf from 'html2pdf.js';

export const exportToPDF = async (elementId, filename = "Resume.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Resume container element not found for PDF export");
  }

  // Configure html2pdf options for exact A4 rendering
  const opt = {
    margin: 0,
    filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      letterRendering: true,
      allowTaint: true
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    // Generate and save PDF
    await html2pdf().set(opt).from(element).save();
    return true;
  } catch (err) {
    console.error("html2pdf generation error:", err);
    throw err;
  }
};

export const printResume = () => {
  window.print();
};

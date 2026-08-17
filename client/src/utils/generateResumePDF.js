import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generateResumePDF(
  element,
  fileName = "Resume.pdf"
) {
  if (!element) {
    throw new Error(
      "Resume preview element was not found."
    );
  }

  const exportId =
    `resume-export-${Date.now()}`;

  const exportHeight = Math.max(
    1123,
    element.scrollHeight || 1123
  );

  element.setAttribute(
    "data-pdf-export-id",
    exportId
  );

  let canvas;

  try {
    canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: 794,
      height: exportHeight,
      windowWidth: 794,
      windowHeight: exportHeight,
      onclone: (documentClone) => {
        const clonedElement =
          documentClone.querySelector(
            `[data-pdf-export-id="${exportId}"]`
          );

        if (!clonedElement) {
          return;
        }

        clonedElement.classList.add(
          "resume-preview--exporting"
        );

        const wrapper =
          clonedElement.parentElement;

        if (wrapper) {
          wrapper.style.width = "794px";
          wrapper.style.height =
            `${exportHeight}px`;
          wrapper.style.overflow = "visible";
        }
      },
    });
  } finally {
    element.removeAttribute(
      "data-pdf-export-id"
    );
  }

  const imageData =
    canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth =
    pdf.internal.pageSize.getWidth();

  const pageHeight =
    pdf.internal.pageSize.getHeight();

  const imageWidth = pageWidth;

  const imageHeight =
    (canvas.height * imageWidth) /
    canvas.width;

  let heightLeft = imageHeight;
  let position = 0;

  pdf.addImage(
    imageData,
    "PNG",
    0,
    position,
    imageWidth,
    imageHeight,
    undefined,
    "FAST"
  );

  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imageHeight;

    pdf.addPage();

    pdf.addImage(
      imageData,
      "PNG",
      0,
      position,
      imageWidth,
      imageHeight,
      undefined,
      "FAST"
    );

    heightLeft -= pageHeight;
  }

  pdf.save(fileName);
}

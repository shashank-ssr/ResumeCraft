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

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

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
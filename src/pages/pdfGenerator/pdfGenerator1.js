import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const generatePdfUrl = async () => {
  const pdfDoc = await PDFDocument.create();

  const pageWidth=600;
  const pageHeight=800;
  // Margin Define
  const margin = 30;

  //Font Load
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);



  const page = pdfDoc.addPage([pageWidth,pageHeight]);

  // Boundary Draw
  page.drawRectangle({
    x:margin,
    y:margin,
    width:pageWidth - margin * 2,
    height:pageHeight - margin*2,
    borderColor:rgb(0,0,0),
    borderWidth:2,
  });

    // =========================
  // 🔹 HEADER START
  // =========================

  const headerY = pageHeight - margin - 30;

  //Title (Left)
  page.drawText("My Company Pvt. Ltd.",{x:margin + 10, y:headerY, size:18, font});
    // Right side (Date)
  page.drawText("Date: 24-06-2026",{
    x:pageWidth - margin - 150,
    y:headerY,
    size:12,
    font
  });

    // 🔹 Separator Line
    page.drawLine({
      start:{x:margin, y:headerY - 15},
      end:{x:pageWidth - margin , y:headerY - 15},
      thickness:1,
      color:rgb(0,0,0),
    });


     // =========================
  // 🔹 HEADER END
  // =========================
  



  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  return url; // 👈 IMPORTANT
};

export const generatePdfBytes = async () => {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([600, 800]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText("Bilty Demo", { x: 50, y: 750, size: 20, font });

  const pdfBytes = await pdfDoc.save();

  return pdfBytes; // ✅ return bytes instead of URL
};
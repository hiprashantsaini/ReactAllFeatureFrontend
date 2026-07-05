import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const createAccountLedgerPdf = async (headerData,registerData,summary,totalOB,companyDetails)=>  {
  //variables
  const compName = companyDetails?.COMPNAME || "";
  const compPhone = companyDetails?.COMPPHONE ? 'Ph. ' + companyDetails.COMPPHONE?.trim() : '';
  const compMail = companyDetails?.COMPMAIL ? 'Email: ' + companyDetails.COMPMAIL?.trim().toLowerCase() : '';
  const gstpan = (companyDetails?.COMPGST ? 'GSTIN: ' + companyDetails.COMPGST?.trim() : '') +''+''+ (companyDetails?.COMPPAN ? ' PAN: ' + companyDetails.COMPPAN?.trim() : '');
  const compAddressLine1 = companyDetails?.COMPADD || ''
  const compAddressLine2 = companyDetails?.COMPCSZ || ''
  const bank1 = companyDetails?.COMPBAN1 || ''
  const bank2 = companyDetails?.COMPBAN2 || ''
  const bank3 = companyDetails?.COMPBAN3 || ''


  try {
    const pdfDoc = await PDFDocument.create();
    const pageWidth = 595.28; //A4
    const pageHeight = 841.89; //A4
    const margin = 30;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const boldItalics = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);
    const fontSize = 10;
    const spaceY=5;

    let yPos;
    let page;

  

    //Header creation
    page = pdfDoc.addPage([pageWidth,pageHeight]);

    page.drawRectangle({
      x: margin,
      y: margin,
      width: pageWidth - 2 * margin,
      height: pageHeight - 2 * margin,
      borderWidth: 1,
      borderColor: rgb(0,0,0),
    })

    const textHeight = font.heightAtSize(fontSize);

    console.log("Text Height :", textHeight)
    yPos = pageHeight - margin - 20;
    page.drawText(`${compName}`,{x:margin + 10 , y:yPos, size:fontSize,font:boldItalics});
    yPos -=textHeight + spaceY;
    page.drawText(`${compName}`,{x:margin + 10 , y:yPos, size:fontSize,font:font});


    const pdfBytes= await pdfDoc.save();
    const blob = new Blob([pdfBytes],{type:"application/pdf"});

    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.log("Error creating PDF :",error);
    return null
  }
}

export default createAccountLedgerPdf;
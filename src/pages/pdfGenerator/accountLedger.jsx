import moment from 'moment';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// format DD MMM YYYY
export const formatDateFullYear = (date)=>{
  let validData
  if (moment(date).format('YYYY-MM-DD') === '1900-01-01' || date === null || date?.trim() === '') {
    validData = ''
  } else {
    validData = moment(date).format('DD MMM YYYY')
  }
  return validData
}

export const createPDF = async (headerData, registerData, summary, totalOB, companyDetails) => {

    // Variables - 
    const compName = companyDetails?.COMPNAME || ''
    const compPhone = companyDetails?.COMPPHONE ? 'Ph. ' + companyDetails.COMPPHONE?.trim() : '';
    const compMail = companyDetails?.COMPMAIL ? 'Email: ' + companyDetails.COMPMAIL?.trim().toLowerCase() : '';
    const gstpan = (companyDetails?.COMPGST ? 'GSTIN: ' + companyDetails.COMPGST?.trim() : '') +''+''+ (companyDetails?.COMPPAN ? ' PAN: ' + companyDetails.COMPPAN?.trim() : '');
    const compAddressLine1 = companyDetails?.COMPADD || ''
    const compAddressLine2 = companyDetails?.COMPCSZ || ''
    const bank1 = companyDetails?.COMPBAN1 || ''
    const bank2 = companyDetails?.COMPBAN2 || ''
    const bank3 = companyDetails?.COMPBAN3 || ''

    const customerName = headerData?.customerAccname || ''  
    const customerAddressLine1 = headerData?.address || ''
    const customerAddressLine2 = headerData?.csz || ''
    const customerAddressLine3 = headerData?.csz1 || ''
    const customerMobile = headerData?.mobileno || ''
    const fromDate = formatDateFullYear(headerData?.from) || ''
    const toDate = formatDateFullYear(headerData?.to) || ''

    try {
        const pdfDoc = await PDFDocument.create();
        const pageWidth = 595.28; 
        const pageHeight = 841.89;
        const margin = 50;
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const italics = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
        const boldItalics = await pdfDoc.embedFont(StandardFonts.HelveticaBoldOblique);

        const fontSize = 10;

        const headerHeight = 90;
        const footerHeight = 50;
        const rowHeight = 20;
        const transactions = registerData;
        let yPos;
        let page;
        let previousBalance = Number(totalOB) || 0;
        let totalDebit = 0;
        let totalCredit = 0;

        const addFooter = () => {
            const footerY = 40;

            page.drawText(bank1, { x: (pageWidth - font.widthOfTextAtSize(bank1, fontSize)) / 2, y: footerY, size: fontSize, font });
            page.drawText(bank2, { x: (pageWidth - font.widthOfTextAtSize(bank2, fontSize)) / 2, y: footerY - 15, size: fontSize, font });
            page.drawText(bank3, { x: (pageWidth - font.widthOfTextAtSize(bank3, fontSize)) / 2, y: footerY - 30, size: fontSize, font });
        };

        const createNewPage = (pageNumber) => {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            yPos = pageHeight - 50;

            page.drawText(`${compName}`, { x: margin, y: yPos, size: 14, font: boldItalics });
            page.drawText(`${compPhone}`, { x: pageWidth - margin - font.widthOfTextAtSize(compPhone, fontSize), y: yPos, size: fontSize, font });
            page.drawText(`${compAddressLine1}`, { x: margin, y: yPos - 15, size: fontSize, font });
            page.drawText(`${compMail}`, { x: pageWidth - margin - font.widthOfTextAtSize(compMail, fontSize), y: yPos - 15, size: fontSize, font});
            page.drawText(`${compAddressLine2}`, { x: margin, y: yPos - 30, size: fontSize, font });
            page.drawText(`${gstpan}`, { x: pageWidth - margin - font.widthOfTextAtSize(gstpan, fontSize), y: yPos - 30, size: fontSize, font});

            page.drawText("To,", { x: margin, y: yPos - 55, size: fontSize, font: boldFont });
            page.drawText(`${customerName}`, { x: margin, y: yPos - 70, size: 12, font: boldFont });
            page.drawText(`${customerAddressLine1}`, { x: margin, y: yPos - 85, size: fontSize, font: boldFont });
            page.drawText(`${customerAddressLine2}`, { x: margin, y: yPos - 100, size: fontSize, font: boldFont });
            page.drawText(`${customerAddressLine3}`, { x: margin, y: yPos - 115, size: fontSize, font: boldFont });
        if (customerMobile != null && customerMobile != '') {
            page.drawText(`Ph. ${customerMobile}`, { x: margin, y: yPos - 130, size: fontSize, font: boldFont });
        }

            page.drawText(`Account Statement from ${fromDate} to ${toDate}`, { x: margin, y: yPos - 160, size: 12, font: boldFont });
            page.drawText(`Page ${pageNumber}`, { x: pageWidth - margin - font.widthOfTextAtSize(`Page ${pageNumber}`, fontSize), y: yPos - 160, size: fontSize, font });

            const tableTop = yPos - 180;
            page.drawLine({ start: { x: 50, y: tableTop + 12 }, end: { x: 545, y: tableTop + 12 }, thickness: 1, color: rgb(0, 0, 0) });

            page.drawText("Date", { x: 50, y: tableTop, size: fontSize, font: boldFont });
            page.drawText("Particulars", { x: 120, y: tableTop, size: fontSize, font: boldFont });
            page.drawText("Debit", { x: 378 - font.widthOfTextAtSize("Debit", fontSize), y: tableTop, size: fontSize, font: boldFont });
            page.drawText("Credit", { x: 457 - font.widthOfTextAtSize("Credit", fontSize), y: tableTop, size: fontSize, font: boldFont });
            page.drawText("Balance", { x: 542 - font.widthOfTextAtSize("Balance", fontSize), y: tableTop, size: fontSize, font: boldFont });

            page.drawLine({ start: { x: 50, y: tableTop - 5 }, end: { x: 545, y: tableTop - 5 }, thickness: 1, color: rgb(0, 0, 0) });

            addFooter();
            return tableTop - 20;
        };

        let currentPageNumber = 1;  // Inital number for page
        yPos = createNewPage(currentPageNumber);
        currentPageNumber++; // updating page number on ending of page

        transactions.forEach((txn, index) => {
            if (yPos - rowHeight < footerHeight) {
                yPos = createNewPage(currentPageNumber);
                currentPageNumber++; 
            }

            let debit = index === 0 ? 0 : Number(txn.debit) || 0;
            let credit = index === 0 ? 0 : Number(txn.credit) || 0;
            let type = txn.type?.toLowerCase() || '';

            if (index !== 0) {
                totalDebit += debit;
                totalCredit += credit;
            }

            previousBalance = previousBalance + debit - credit;
            const balanceSuffix = previousBalance >= 0 ? " Dr" : " Cr";
            const formattedBalance = Math.abs(previousBalance).toFixed(2) + balanceSuffix;

            page.drawText(formatDateFullYear(txn.date), { x: 50, y: yPos, size: fontSize, font });
            page.drawText(index === 0 ? "Opening Balance" : txn.narr1 + txn.narration, { x: 120, y: yPos, size: fontSize, font });
            page.drawText(index !== 0 ? debit.toFixed(2) : '', { x: 380 - font.widthOfTextAtSize(debit.toFixed(2), fontSize), y: yPos, size: fontSize, font });
            page.drawText(index !== 0 ? credit.toFixed(2) : '', { x: 460 - font.widthOfTextAtSize(credit.toFixed(2), fontSize), y: yPos, size: fontSize, font: type === 'r' ? boldFont : font });
            page.drawText(formattedBalance, { x: 545 - font.widthOfTextAtSize(formattedBalance, fontSize), y: yPos, size: fontSize, font });

            yPos -= rowHeight;
        });

        if (yPos - rowHeight * 4 < footerHeight) {
            yPos = createNewPage();
            currentPageNumber++;
        }

        // **Draw top line before totals**
        page.drawLine({ start: { x: 50, y: yPos + 13 }, end: { x: 545, y: yPos + 13 }, thickness: 1, color: rgb(0, 0, 0) });

        // **Total row**
        const openingBalance = Number(totalOB) || 0;
        const openingBalanceSuffix = openingBalance >= 0 ? " Dr" : " Cr";
        const formattedOpeningBalance = Math.abs(openingBalance).toFixed(2) + openingBalanceSuffix;

        let finalBalance = openingBalance + totalDebit - totalCredit;
        const balanceSuffix = finalBalance >= 0 ? " Dr" : " Cr";
        const formattedBalance = Math.abs(finalBalance).toFixed(2) + balanceSuffix;
        
        page.drawText("Opening Bal.", { x: 120, y: yPos, size: fontSize, font: boldFont })
        page.drawText(formattedOpeningBalance, { x: 280 - font.widthOfTextAtSize(formattedOpeningBalance, fontSize)+13, y: yPos, size: fontSize, font: boldFont });
        page.drawText(totalDebit.toFixed(2), { x: 380 - font.widthOfTextAtSize(totalDebit.toFixed(2), fontSize), y: yPos, size: fontSize, font: boldFont });
        page.drawText(totalCredit.toFixed(2), { x: 460 - font.widthOfTextAtSize(totalCredit.toFixed(2), fontSize), y: yPos, size: fontSize, font: boldFont });
        page.drawText(formattedBalance, { x: 545 - font.widthOfTextAtSize(formattedBalance, fontSize), y: yPos, size: fontSize, font: boldFont });

        yPos -= rowHeight;

        // **Sale, Payment, Return rows**
        const summaryRows = [
            { label: "Sale", value: summary.sale },
            { label: "Payment", value: summary.pmt },
            { label: "Return", value: summary.ret },
        ];

        summaryRows.forEach((row) => {
            page.drawText(row.label, { x: 120, y: yPos, size: fontSize, font });
            page.drawText(row.value.toFixed(2), { x: 280 - font.widthOfTextAtSize(row.value.toFixed(2), fontSize), y: yPos, size: fontSize, font });

            yPos -= rowHeight;
        });

        // **Final bottom line after Sale, Payment, and Return**
        page.drawLine({ start: { x: 50, y: yPos + 13 }, end: { x: 545, y: yPos + 10 }, thickness: 1, color: rgb(0, 0, 0) });
  const pdfBytes = await pdfDoc.save();

          const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

  return url; // 👈 IMPORTANT

    } catch (error) {
        console.error("Error creating PDF:", error);
        return null;
    }
};

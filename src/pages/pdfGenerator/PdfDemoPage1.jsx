import { useEffect, useState } from "react";
import createAccountLedgerPdf from "./practiceAccLeg";

const headerData = {
  customerAccname: "Mohan Kumar Traders",
  address: "Shop No. 24, Main Market",
  csz: "Karol Bagh",
  csz1: "New Delhi - 110005",
  mobileno: "9876543210",
  from: "2026-01-01",
  to: "2026-06-30",
};

const companyDetails = {
  COMPNAME: "ABC Distributors Pvt Ltd",
  COMPPHONE: "01145678901",
  COMPMAIL: "accounts@abcdistributors.com",
  COMPGST: "07ABCDE1234F1Z5",
  COMPPAN: "ABCDE1234F",
  COMPADD: "Plot No. 12, Industrial Area",
  COMPCSZ: "Delhi - 110020",

  COMPBAN1:
    "Bank: HDFC Bank | A/C No: 12345678901234",
  COMPBAN2:
    "IFSC: HDFC0001234 | Branch: Nehru Place",
  COMPBAN3:
    "UPI: abcdistributors@hdfcbank",
};

const totalOB = 25000;

// const registerData = [
//   {
//     date: "2026-01-01",
//     narr1: "",
//     narration: "",
//     debit: 0,
//     credit: 0,
//     type: "",
//   },

//   {
//     date: "2026-01-05",
//     narr1: "Invoice #INV-1001 ",
//     narration: "Sale of FMCG Products",
//     debit: 15000,
//     credit: 0,
//     type: "S",
//   },

//   {
//     date: "2026-01-10",
//     narr1: "Receipt #RCPT-2001 ",
//     narration: "Payment Received",
//     debit: 0,
//     credit: 10000,
//     type: "R",
//   },

//   {
//     date: "2026-01-15",
//     narr1: "Invoice #INV-1002 ",
//     narration: "Sale of Grocery Items",
//     debit: 22000,
//     credit: 0,
//     type: "S",
//   },

//   {
//     date: "2026-01-20",
//     narr1: "Receipt #RCPT-2002 ",
//     narration: "Cheque Payment",
//     debit: 0,
//     credit: 15000,
//     type: "R",
//   },

//   {
//     date: "2026-02-01",
//     narr1: "Invoice #INV-1003 ",
//     narration: "Sale of Beverages",
//     debit: 18000,
//     credit: 0,
//     type: "S",
//   },

//   {
//     date: "2026-02-12",
//     narr1: "Credit Note #CN-001 ",
//     narration: "Goods Return",
//     debit: 0,
//     credit: 5000,
//     type: "R",
//   },

//   {
//     date: "2026-02-18",
//     narr1: "Invoice #INV-1004 ",
//     narration: "Sale of Household Items",
//     debit: 27500,
//     credit: 0,
//     type: "S",
//   },

//   {
//     date: "2026-03-02",
//     narr1: "Receipt #RCPT-2003 ",
//     narration: "NEFT Payment",
//     debit: 0,
//     credit: 20000,
//     type: "R",
//   },

//   {
//     date: "2026-03-15",
//     narr1: "Invoice #INV-1005 ",
//     narration: "Sale of Personal Care Products",
//     debit: 32000,
//     credit: 0,
//     type: "S",
//   },

//   {
//     date: "2026-03-25",
//     narr1: "Receipt #RCPT-2004 ",
//     narration: "UPI Payment",
//     debit: 0,
//     credit: 12000,
//     type: "R",
//   },

//   {
//     date: "2026-04-05",
//     narr1: "Invoice #INV-1006 ",
//     narration: "Sale of Stationery",
//     debit: 12500,
//     credit: 0,
//     type: "S",
//   },

//   {
//     date: "2026-04-18",
//     narr1: "Receipt #RCPT-2005 ",
//     narration: "RTGS Payment",
//     debit: 0,
//     credit: 18000,
//     type: "R",
//   },

//   {
//     date: "2026-05-01",
//     narr1: "Invoice #INV-1007 ",
//     narration: "Sale of Electronics Accessories",
//     debit: 45000,
//     credit: 0,
//     type: "S",
//   },

//   {
//     date: "2026-05-20",
//     narr1: "Receipt #RCPT-2006 ",
//     narration: "Bank Transfer",
//     debit: 0,
//     credit: 25000,
//     type: "R",
//   },

//   {
//     date: "2026-06-05",
//     narr1: "Invoice #INV-1008 ",
//     narration: "Sale of Kitchen Appliances",
//     debit: 38000,
//     credit: 0,
//     type: "S",
//   },

//   {
//     date: "2026-06-15",
//     narr1: "Receipt #RCPT-2007 ",
//     narration: "Final Settlement",
//     debit: 0,
//     credit: 30000,
//     type: "R",
//   },
// ];


// for page break 


const registerData = [
  {
    date: "2026-01-01",
    narr1: "",
    narration: "",
    debit: 0,
    credit: 0,
    type: "",
  },

  ...Array.from({ length: 100 }, (_, i) => ({
    date: `2026-01-${String((i % 28) + 1).padStart(2, "0")}`,
    narr1: `Invoice #INV-${1000 + i} `,
    narration: `Dummy Transaction ${i + 1}`,
    debit: i % 2 === 0 ? 5000 + i * 100 : 0,
    credit: i % 2 !== 0 ? 3000 + i * 50 : 0,
    type: i % 2 === 0 ? "S" : "R",
  })),
];
const summary = {
  sale: 210000,
  pmt: 130000,
  ret: 5000,
};

const PdfDemoPage1 = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    let url;
    const loadPdf = async () => {
      // url = await generatePdfUrl();
      // url = await createPDF(headerData,registerData,summary,totalOB,companyDetails);
      url = await createAccountLedgerPdf(headerData,registerData,summary,totalOB,companyDetails);
      setPdfUrl(url);
    };
    loadPdf();

    // cleanup: revoke the blob URL when component unmounts
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  if (!pdfUrl) return <p>Loading PDF...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>PDF Demo Viewer</h2>
      <iframe
        src={pdfUrl}
        title="PDF Viewer"
        width="100%"
        height="800px"
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default PdfDemoPage1;
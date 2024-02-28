import PDFDocument from 'pdfkit';
import fs from 'fs';
import { v4 } from "uuid"
import path from 'path'
import { fileURLToPath } from 'url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));



async function generatePDF(req, res) {
    const text = req.query.text;
    const fileName = v4()+".pdf";
    
    const docc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

    docc.pipe(res);
    docc.fontSize(12).text(text, 100, 100);
    docc.end();

}

export default generatePDF;
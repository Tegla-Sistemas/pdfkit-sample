"use strict";
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { title } = require('process');

const register = async (server) => {

    const generatePDF = server.post('/api/generate-pdf', async (req, res) => {
        try {
            const { text } = req.body;
            if (!text) {
                return res.status(400).json({ error: 'Text is required to generate PDF.' });
            }

            const pdfOptions = {
                displayTitle: true,
                pdfVersion: '1.4',
                subset: 'PDF/A-1a',
                tagged: true,
                size: 'A4',
                margin: 50
            };

            const doc = new PDFDocument(pdfOptions);
            doc.info.Producer = 'Tegla Sistemas';
            doc.info.Title = 'Sample PDF Document';
            doc.info.Author = 'Alessandro Oliveira';
            doc.info.Creator = 'Tegla Sistemas';
            doc.info.Subject = 'PDF Generation';
            doc.info.Keywords = 'pdf, generation, api';
            // console.log("[doc.info]",doc.info);
            // console.log("[doc.options]",doc.options);
            doc.font('fonts/GoogleSans-VariableFont_GRAD,opsz,wght.ttf')

            // Set response headers
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');

            doc.pipe(fs.createWriteStream('./tmp/document.pdf')); // write to PDF
            doc.pipe(res);

            // Create header for all pages
            const header = (doc) => {
                doc.fontSize(16).text('Sample PDF Document', { align: 'center' });
                doc.moveDown();
                doc.fontSize(12);
            };
            
            doc.on('pageAdded', () => header(doc));

            header(doc); // initial header
            // Add text to PDF
            doc.fontSize(12).text(text, {
                align: 'justify'
            }); 

            doc.addPage(); // add a new page to demonstrate header on multiple pages
            doc.fontSize(12).text('This is the second page of the PDF.', {
                align: 'justify'
            });

            doc.end();
        } catch (error) {
            console.error('Error generating PDF:', error);
            res.status(500).json({ error: 'Failed to generate PDF.' });
        }
    });

    return generatePDF;

};

module.exports = { register };
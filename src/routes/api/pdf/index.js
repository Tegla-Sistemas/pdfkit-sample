"use strict";
const PDFDocument = require('pdfkit');
const fs = require('fs');

const register = async (server) => {

    const generatePDF = server.post('/api/generate-pdf', async (req, res) => {
        try {
            const { text } = req.body;
            if (!text) {
                return res.status(400).json({ error: 'Text is required to generate PDF.' });
            }
            const doc = new PDFDocument();

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
                align: 'left'
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
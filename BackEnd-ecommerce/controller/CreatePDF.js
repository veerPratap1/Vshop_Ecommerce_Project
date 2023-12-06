const path = require("path");
const { generatePdf } = require("../services/GeneratePdf");

exports.createPDF = async (req, res) => {
  const item = { ...req.body };

  const { pdf } = await generatePdf(item);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=invoice.pdf`
  );
  res.send(pdf);
};

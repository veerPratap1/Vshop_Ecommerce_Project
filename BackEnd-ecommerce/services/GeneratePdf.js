const puppeteer = require("puppeteer");
const path = require("path");
const { invoiceTemplate } = require("./invoiceTemplate");


exports.generatePdf = async (item) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(invoiceTemplate(item), {
    waitUntil: "domcontentloaded",
  });
  await page.emulateMediaType("screen");

  const pdf = await page.pdf({
    path: path.resolve(__dirname, "../Pdf", `invoice${item.id}.pdf`),
    format: "A4",
  });
  await browser.close();

  return pdf;
};

url = "./portfolio_pdf.pdf";
var thePdf = null;
var scale = 1;
var pdfjsLib = window["pdfjs-dist/build/pdf"];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "//mozilla.github.io/pdf.js/build/pdf.worker.js";

pdfjsLib.getDocument(url).promise.then(function (pdf) {
  thePdf = pdf;
  viewer = document.getElementById("pdf-viewer");

  for (page = 1; page <= pdf.numPages; page++) {
    canvas = document.createElement("canvas");
    canvas.className = "pdf-page-canvas";
    viewer.appendChild(canvas);
    renderPage(page, canvas);
  }
});

function renderPage(pageNumber, canvas) {
  thePdf.getPage(pageNumber).then(function (page) {
    var scale = 2;
    viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    page.render({ canvasContext: canvas.getContext("2d"), viewport: viewport });
  });
}

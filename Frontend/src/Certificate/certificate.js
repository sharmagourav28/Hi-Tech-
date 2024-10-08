document.addEventListener("DOMContentLoaded", () => {
  // Fetch data from the backend (replace with your actual API endpoint)
  fetch("https://localhost:5000")
    .then((response) => response.json())
    .then((data) => {
      // Populate certificate fields with fetched data
      document.getElementById("certificateNo").textContent = data.certificateNo;
      document.getElementById("dateOfTest").textContent = data.dateOfTest;
      document.getElementById("customerName").textContent = data.customerName;
      document.getElementById("typeOfVessel").textContent = data.typeOfVessel;
      document.getElementById("testStartTime").textContent = data.testStartTime;
      document.getElementById("testEndTime").textContent = data.testEndTime;
      document.getElementById("capacity").textContent = data.capacity;
      document.getElementById("yearOfManufacture").textContent =
        data.yearOfManufacture;
      document.getElementById("drawingNo").textContent = data.drawingNo;
      document.getElementById("codeOfConstruction").textContent =
        data.codeOfConstruction;
      document.getElementById("shellThickness").textContent =
        data.shellThickness;
      document.getElementById("materialOfShell").textContent =
        data.materialOfShell;
      document.getElementById("plateThickness1").textContent =
        data.plateThickness1;
      document.getElementById("materialOfPlate1").textContent =
        data.materialOfPlate1;
      document.getElementById("plateThickness2").textContent =
        data.plateThickness2;
      document.getElementById("materialOfPlate2").textContent =
        data.materialOfPlate2;
      document.getElementById("hydroTestPressure").textContent =
        data.hydroTestPressure;
      document.getElementById("testMedium").textContent = data.testMedium;
      document.getElementById("pressureGaugeID").textContent =
        data.pressureGaugeID;
      document.getElementById("calibrationCertificateNo").textContent =
        data.calibrationCertificateNo;
      document.getElementById("calibrationDueDate").textContent =
        data.calibrationDueDate;
      document.getElementById("weldingDetails").textContent =
        data.weldingDetails;
      document.getElementById("weldingRodsUsed").textContent =
        data.weldingRodsUsed;
      document.getElementById("welderCode").textContent = data.welderCode;
      document.getElementById("weldTest").textContent = data.weldTest;
      document.getElementById("sweatingLeak").textContent = data.sweatingLeak;
      document.getElementById("pressureLoss").textContent = data.pressureLoss;
      document.getElementById("structuralDistortion").textContent =
        data.structuralDistortion;
      document.getElementById("testWitnessedBy").textContent =
        data.testWitnessedBy;
      document.getElementById("inspectionBy").textContent = data.inspectionBy;
      document.getElementById("inspectionDate").textContent =
        data.inspectionDate;
    })
    .catch((error) => console.error("Error fetching certificate data:", error));
});

function generatePDF() {
  const { jsPDF } = window.jspdf; // Access the jsPDF library from window
  const certificateElement = document.getElementById("certificate");

  // Convert the certificate HTML to canvas
  html2canvas(certificateElement, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");

    // Create a new jsPDF document with A3 size and landscape orientation
    const pdf = new jsPDF("landscape", "mm", "a3");

    // Calculate image dimensions to fit within A3 size
    const imgWidth = 420; // A3 width in mm
    const pageHeight = 297; // A3 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Center the image on the PDF
    const positionX = 0;
    const positionY = (pageHeight - imgHeight) / 2;

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", positionX, positionY, imgWidth, imgHeight);

    // Save the generated PDF
    pdf.save("Hydro_Test_Certificate.pdf");
  });
}

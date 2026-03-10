import React from "react";

// This page exposes the CV PDF as a public route and provides a friendly fallback link.
const CvPage = () => {
  const pdfUrl = `${process.env.PUBLIC_URL}/Manuel_Torres_Schulten_CV_Updated.pdf`;

  return (
    <div style={{ padding: "24px" }}>
      <h1>Curriculum Vitae</h1>
      <p>
        If the PDF does not load automatically, you can{" "}
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
          download it here
        </a>
        .
      </p>
      <div style={{ width: "100%", height: "80vh" }}>
        <iframe
          title="Manuel Torres Schulten CV"
          src={pdfUrl}
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
};

export default CvPage;


export default function DynamicHtmlRenderer({ htmlContent }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      style={{ whiteSpace: "pre-line" }}
    />
  );
}

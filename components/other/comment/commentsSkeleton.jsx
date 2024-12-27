export default function CommentsSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#f2f2f2",
        borderRadius: "8px",
        padding: "20px 0",
        marginBottom: 40
      }}
    >
      <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        <span style={{display: "inline-block", width: 150, height: 30, backgroundColor: "#cfcfcf", animation: 'pulse 1.5s infinite'}}></span>
        <div style={{alignSelf: "flex-start", width: "100%", marginTop: 30, display: "flex", flexWrap: "wrap"}}>
            <div style={{width: "33.333%", height: 300, padding: 20}}>
                <div style={{width: "100%", height: "100%", backgroundColor: "#cfcfcf", animation: 'pulse 1.5s infinite'}}>
                </div>
            </div>
            <div style={{width: "33.333%", height: 300, padding: 20}}>
                <div style={{width: "100%", height: "100%", backgroundColor: "#cfcfcf", animation: 'pulse 1.5s infinite'}}>
                </div>
            </div>
            <div style={{width: "33.333%", height: 300, padding: 20}}>
                <div style={{width: "100%", height: "100%", backgroundColor: "#cfcfcf", animation: 'pulse 1.5s infinite'}}>
                </div>
            </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}

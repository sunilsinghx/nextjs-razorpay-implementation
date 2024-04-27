"use client"
import { useSearchParams } from "next/navigation";
function page() {
  const searchParams = useSearchParams();

  const referenceNumber = searchParams.get("reference");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height:"80vh",
        margin:"50px"
      }}
    >
      <h1
        style={{
          fontWeight: "bold",
          backgroundColor: "green",
          padding: "10px",
        }}
      >
        Reference no: {referenceNumber}
      </h1>
    </div>
  );
}

export default page;

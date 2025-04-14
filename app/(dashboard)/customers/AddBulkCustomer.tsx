import FileUploader, { FileContainer } from "@/components/FileUploader";
import Button from "@/components/utilities/Button";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

const Description = styled.p`
  font-size: 0.75rem;
  margin-top: 36px;
  text-align: center;
  color: #595957;
  width: 258px;
`;

const DownloadLink = styled(Link)`
  font-weight: 700;
  text-decoration: underline;
  color: #6e62b6;
`;
export const AddBulkCustomer = () => {
  const [file, setFile] = useState<FileList | null>(null);
  return (
    <div style={{ paddingLeft: 12 }}>
      <p
        style={{
          fontSize: "0.75rem",
          marginBottom: "24px",
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        Upload XLSX
      </p>

      <FileUploader
        onFileSelect={(files: FileList) => setFile(files)}
        render={(handleClick) => (
          <FileContainer
            onClick={handleClick}
            file={file}
            // error="Invalid XLSX file format"
            title="Upload a file or drag and drop XLSX file"
            onRemove={() => setFile(null)}
          />
        )}
      />
      {!file ? (
        <Description>
          Please <DownloadLink href={"#"}> download</DownloadLink> this XLSX
          file to follow the proper arrangement before uploading.
        </Description>
      ) : (
        <Button fullWidth variant="yellow" style={{ marginTop: "36px" }}>
          Upload
        </Button>
      )}
    </div>
  );
};

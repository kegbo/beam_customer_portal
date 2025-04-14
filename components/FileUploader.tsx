import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { CloudUploadIcon } from "./icons/cloud-upload";
import { CheckboxBaseIcon } from "./icons/checkbox-circle-white";
import { ErrorMessage } from "./Input";
import { DuplicateIcon } from "./icons/duplicate";
import ProgressBar from "./ProgressBar";

const HiddenInput = styled.input`
  display: none;
`;

export const FilePreviewWrapper = styled.div`
  max-width: 258px;
  height: 114px;
  border-radius: 5px;
  border: 1px dashed #8c8c89;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: #8c8c89;
  flex-direction: column;
  gap: 6px;
  padding: 0 37px;
  text-align: center;
  margin: 0 auto;
  
  @media (max-width: 576px) {
    max-width: 100%;
    height: 100px;
    padding: 0 20px;
    font-size: 0.7rem;
  }
`;

const FileTrigger = styled.div<{ $isFilled: boolean }>`
  width: 149px;
  height: 32px;
  border: 1px dashed transparent;
  border-radius: 5px;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  gap: 10px;
  user-select: none;
  cursor: pointer;
  color: ${({ $isFilled }) => ($isFilled ? "#595957" : "")};
  background-color: ${({ $isFilled }) => ($isFilled ? "#E4F5EE" : "white")};
  border-color: ${({ $isFilled }) => ($isFilled ? "#00934C" : "#595957")};
  
  @media (max-width: 576px) {
    width: 140px;
    height: 30px;
    font-size: 11px;
    padding-left: 8px;
    gap: 6px;
  }
`;

const FileAlert = styled.div`
  width: 191px;
  height: 36px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  
  @media (max-width: 576px) {
    width: 100%;
    max-width: 191px;
    height: 32px;
    padding: 0 10px;
    font-size: 0.7rem;
  }
`;

const ErrorHolder = styled(FileAlert)`
  border: 0.031rem solid #d14343;
  background-color: #fdf4f4;
  color: #a73636;
  gap: 4px;
`;

const SuccessHolder = styled(FileAlert)`
  border: 0.031rem solid #00934c;
  background-color: #e4f5ee;
  color: #575759;
  display: grid;
  grid-template-columns: 15px 1fr 18px;
  justify-content: center;
  gap: 6px;
  
  @media (max-width: 576px) {
    grid-template-columns: 12px 1fr 15px;
    gap: 4px;
  }
`;

interface FileUploaderProps {
  trigger?: React.ReactNode;
  onFileSelect: (files: FileList) => void;
  fileTypes?: string;
  label?: string;
  defaultValue?: string | null;
  maxFiles?: number;
  error?: string;
  render?: (func: () => void) => React.ReactNode;
  onRemove?: () => void;
}

export const FileContainer = ({
  title,
  icon,
  file,
  error,
  onRemove,
  onClick,
  loading,
  uploadProgress,
}: {
  title?: string;
  icon?: React.ReactNode;
  file?: FileList | null;
  error?: string;
  onClick?: () => void;
  onRemove?: () => void;
  loading?: boolean;
  uploadProgress?: number;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 576);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <FilePreviewWrapper>
      {file && error !== "" ? (
        <>
          <SuccessHolder>
            <DuplicateIcon width={isMobile ? 15 : 18} height={isMobile ? 15 : 18} />
            <p className="truncate-text">{file[0].name}</p>
            <button onClick={onRemove}>
              <CheckboxBaseIcon width={isMobile ? 18 : 20} height={isMobile ? 18 : 20} />{" "}
            </button>
          </SuccessHolder>
          {loading && (
            <ProgressBar
              hidePercentage
              height="4px"
              progress={uploadProgress || 0}
            />
          )}
        </>
      ) : error ? (
        <ErrorHolder className="truncate-text">
          <svg
            width={isMobile ? "15" : "17"}
            height={isMobile ? "14" : "16"}
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.49891 0.00488281C4.08167 0.00488281 0.503906 3.58265 0.503906 7.99989C0.503906 12.4171 4.08167 15.9949 8.49891 15.9949C12.9161 15.9949 16.4939 12.4171 16.4939 7.99989C16.4939 3.58265 12.9161 0.00488281 8.49891 0.00488281ZM7.49953 12.9968V10.998H9.49829V12.9968H7.49953ZM7.49953 3.00301V9.99864H9.49829V3.00301H7.49953Z"
              fill="#D14343"
            />
          </svg>
          {error}
        </ErrorHolder>
      ) : (
        <button
          onClick={onClick}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            padding: 0,
            cursor: "pointer",
            width: "100%",
          }}
        >
          {icon || <DuplicateIcon width={isMobile ? 20 : 24} height={isMobile ? 20 : 24} />}
          <p style={{ color: "#8C8C89", fontSize: isMobile ? "11px" : "inherit", marginTop: "8px" }}>
            {title || "Upload a file or drag and drop"}
          </p>
        </button>
      )}
    </FilePreviewWrapper>
  );
};

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  fileTypes = "*",
  label = "Upload File",
  defaultValue = null,
  maxFiles = 1,
  error,
  render,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 576);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && files.length <= maxFiles) {
      onFileSelect(files);
      setFileName(files[0].name as string);
    }
  };

  return (
    <div>
      <HiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={fileTypes}
        multiple={maxFiles > 1}
        defaultValue={defaultValue || undefined}
      />
      <div style={{ display: "inline-block" }}>
        {render ? (
          render(handleClick)
        ) : !fileName ? (
          <FileTrigger onClick={handleClick} $isFilled={false}>
            <span className="truncate-text" style={{ width: isMobile ? 80 : 90 }}>
              Upload receipt
            </span>
            <CloudUploadIcon width={isMobile ? 20 : 24} height={isMobile ? 20 : 24} />
          </FileTrigger>
        ) : (
          <FileTrigger
            onClick={() => {
              setFileName(null);
            }}
            $isFilled={true}
          >
            <span className="truncate-text" style={{ width: isMobile ? 80 : 90 }}>
              {fileName}
            </span>
            <CheckboxBaseIcon width={isMobile ? 20 : 24} height={isMobile ? 20 : 24} />
          </FileTrigger>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    </div>
  );
};

export default FileUploader;
"use client";
import CardBox from "@/app/components/shared/CardBox";
import { FileInput, Label, Button } from "flowbite-react";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

const Media = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<
    { file: File; url: string | null }[]
  >([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const fileArray = Array.from(selected);

    const newPreviews = fileArray.map((file) => {
      const fileType = file.type;
      const url = fileType.startsWith("image/")
        ? URL.createObjectURL(file)
        : null;
      return { file, url };
    });

    setFiles((prev) => [...prev, ...fileArray]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeFile = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    setFiles(updatedFiles);
  };

  const clearAllFiles = () => {
    setFiles([]);
    setPreviews([]);
  };

  const renderFilePreview = () => {
    if (previews.length === 0) return null;

    return (
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {previews.map(({ file, url }, index) => {
          const fileType = file.type;
          let icon = "mdi:file";
          if (fileType.includes("pdf")) icon = "mdi:file-pdf-box";
          else if (fileType.includes("zip") || fileType.includes("rar"))
            icon = "mdi:folder-zip";
          else if (fileType.includes("word")) icon = "mdi:file-word-box";
          else if (fileType.includes("excel")) icon = "mdi:file-excel-box";

          return (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center border rounded p-2 bg-white shadow"
            >
              {url ? (
                <img
                  src={url}
                  alt={`preview-${index}`}
                  className="h-24 w-24 object-cover rounded"
                />
              ) : (
                <Icon icon={icon} height={48} className="text-gray-600" />
              )}
              <span className="text-xs mt-1 truncate max-w-[80px] text-center">
                {file.name}
              </span>
              <button
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                title="Remove"
              >
                <Icon icon="mdi:close" height={16} />
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <CardBox>
      <h5 className="card-title mb-4">Media</h5>

      <div className="flex w-full items-center justify-center">
        <Label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-[1px] border-dashed border-primary bg-lightprimary"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <Icon
              icon="solar:cloud-upload-outline"
              height={32}
              className="mb-3 text-darklink"
            />
            <p className="mb-2 text-sm text-darklink">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-darklink">
              SVG, PNG, JPG, GIF, PDF, DOCX, ZIP (MAX. 800x400px)
            </p>
          </div>
          <FileInput
            id="dropzone-file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx,.zip,.rar"
            multiple
          />
        </Label>
      </div>

      {previews.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Button size="xs" color="failure" onClick={clearAllFiles}>
            Clear All
          </Button>
        </div>
      )}

      {renderFilePreview()}
    </CardBox>
  );
};

export default Media;

"use client";
import React, { useRef } from "react";
import CardBox from "@/app/components/shared/CardBox";
import { FileInput, Label } from "flowbite-react";
import { Icon } from "@iconify/react";

const Media = ({ register, errors, setValue, getValues }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("media", file, { shouldValidate: true });
    }
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
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <FileInput
            id="dropzone-file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/gif"
          />
        </Label>
      </div>

      {/* Hidden input for react-hook-form */}
      {/* <input
        type="file"
        className="hidden"
        {...register("media", {
          required: "An image file is required",
        })}
      />

      {errors.media && (
        <p className="text-error text-sm mt-2">{errors.media.message}</p>
      )} */}
    </CardBox>
  );
};

export default Media;

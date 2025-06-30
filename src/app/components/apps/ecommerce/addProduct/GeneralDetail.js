"use client";
import CardBox from "@/app/components/shared/CardBox";
import { Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
// import TiptapEdit from "../editor/TiptapEdit";
import dynamic from "next/dynamic";

// Dynamically import the editor and disable SSR
const TiptapEdit = dynamic(() => import("../editor/TiptapEdit"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const GeneralDetail = ({ register, errors, setValue, getValues }) => {
  return (
    <CardBox>
      <h5 className="card-title mb-4">General</h5>

      {/* Product Name */}
      <div className="mb-4">
        <Label htmlFor="productName" value="Product Name" />
        <span className="text-error ms-1">*</span>
        <TextInput
          id="productName"
          placeholder="Product Name"
          {...register("productName", { required: "Product Name is required" })}
          className="form-rounded-md"
        />
        {errors.productName && (
          <span className="text-error text-sm">
            {errors.productName.message}
          </span>
        )}
        <small className="text-xs text-darklink">
          A product name is required and recommended to be unique.
        </small>
      </div>

      {/* Product Code */}
      <div className="mb-4">
        <Label htmlFor="productCode" value="Product Code" />
        <span className="text-error ms-1">*</span>
        <TextInput
          id="productCode"
          {...register("productCode", { required: "Product Code is required" })}
          className="form-rounded-md"
        />
        {errors.productCode && (
          <span className="text-error text-sm">
            {errors.productCode.message}
          </span>
        )}
        <small className="text-xs text-darklink">Write the product code.</small>
      </div>

      {/* Description with Tiptap */}
      <div className="mb-4">
        <Label htmlFor="description" value="Description" />
        <TiptapEdit
          onChange={(val) => setValue("description", val)}
          defaultValue={getValues("description")}
          register={register}
          setValue={setValue}
          errors={errors}
        />
        <small className="text-xs text-darklink">
          Set a description for better visibility.
        </small>
      </div>
    </CardBox>
  );
};

export default GeneralDetail;

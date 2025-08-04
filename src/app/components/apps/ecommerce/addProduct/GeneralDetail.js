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
        <Label htmlFor="product_name" value="Product Name" />
        <span className="text-error ms-1">*</span>
        <TextInput
          id="product_name"
          placeholder="Product Name"
          {...register("product_name", {
            required: "Product Name is required",
          })}
          className="form-rounded-md"
        />
        {errors.product_name && (
          <span className="text-error text-sm">
            {errors.product_name.message}
          </span>
        )}
        <small className="text-xs text-darklink">
          A product name is required and recommended to be unique.
        </small>
      </div>

      {/* Product Code */}
      <div className="mb-4">
        <Label htmlFor="product_code" value="Product Code" />
        <span className="text-error ms-1">*</span>
        <TextInput
          id="product_code"
          {...register("product_code", {
            required: "Product Code is required",
          })}
          className="form-rounded-md"
        />
        {errors.product_code && (
          <span className="text-error text-sm">
            {errors.product_code.message}
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

"use client";
import React from "react";
import CardBox from "@/app/components/shared/CardBox";
import { Label, TextInput, Textarea } from "flowbite-react";

const MetaData = ({ register, errors }) => {
  return (
    <CardBox>
      <h5 className="card-title mb-4">MetaData</h5>

      {/* Meta Title */}
      <div className="mb-4">
        <Label htmlFor="metaTitle" value="Meta Title" />
        <span className="text-error ms-1">*</span>
        <TextInput
          id="metaTitle"
          type="text"
          placeholder="Meta Title"
          className="form-rounded-md"
          {...register("metaTitle", {
            required: "Meta title is required",
            minLength: {
              value: 5,
              message: "Title must be at least 5 characters",
            },
          })}
        />
        {errors.metaTitle && (
          <p className="text-error text-sm">{errors.metaTitle.message}</p>
        )}
        <small className="text-xs text-darklink">
          A meta title is required.
        </small>
      </div>

      {/* Meta Description */}
      <div>
        <Label htmlFor="metaDescription" value="Meta Description" />
        <Textarea
          id="metaDescription"
          rows={6}
          placeholder="Write Meta Description..."
          className="form-control-textarera"
          {...register("metaDescription", {
            required: "Meta description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
        />
        {errors.metaDescription && (
          <p className="text-error text-sm">{errors.metaDescription.message}</p>
        )}
      </div>
    </CardBox>
  );
};

export default MetaData;

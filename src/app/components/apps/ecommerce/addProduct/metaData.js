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
        <Label htmlFor="meta_title" value="Meta Title" />
        <span className="text-error ms-1">*</span>
        <TextInput
          id="meta_title"
          type="text"
          placeholder="Meta Title"
          className="form-rounded-md"
          {...register("meta_title", {
            required: "Meta title is required",
            minLength: {
              value: 5,
              message: "Title must be at least 5 characters",
            },
          })}
        />
        {errors.meta_title && (
          <p className="text-error text-sm">{errors.meta_title.message}</p>
        )}
        <small className="text-xs text-darklink">
          A meta title is required.
        </small>
      </div>

      {/* Meta Description */}
      <div>
        <Label htmlFor="meta_description" value="Meta Description" />
        <Textarea
          id="meta_description"
          rows={6}
          placeholder="Write Meta Description..."
          className="form-control-textarera"
          {...register("meta_description", {
            required: "Meta description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
        />
        {errors.meta_description && (
          <p className="text-error text-sm">
            {errors.meta_description.message}
          </p>
        )}
      </div>
    </CardBox>
  );
};

export default MetaData;

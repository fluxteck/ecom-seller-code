"use client";
import React, { useEffect, useState } from "react";
import CardBox from "@/app/components/shared/CardBox";
import { Label, Radio, RangeSlider, Select, TextInput } from "flowbite-react";
import { get } from "lodash";

const Pricing = ({ register, setValue, watch, getValues, errors }) => {
  const [discountType, setDiscountType] = useState(
    getValues("discount_type") || "no-discount"
  );
  // console.log(getValues("discount_type"));
  useEffect(() => {
    setDiscountType(getValues("discount_type") || "no-discount");
  }, [getValues("discount_type")]);
  const handleRadioChange = (event) => {
    setDiscountType(event.target.value);
    if (event.target.value === "no-discount") {
      setValue("discount", 0); // Clear discount if no discount is selected
    }
    setDiscountType(event.target.value);
    setValue("discount_type", event.target.value);
  };

  // Optional: Keep form in sync if the discount type changes from outside
  // useEffect(() => {
  //   setValue("discount_type", discountType);
  // }, [discountType, setValue]);

  return (
    <CardBox>
      <h5 className="card-title mb-4">Pricing</h5>

      {/* Base Price */}
      <div className="mb-4">
        <Label htmlFor="base_price" value="Base Price" />
        <span className="text-error ms-1">*</span>
        <TextInput
          id="base_price"
          type="text"
          placeholder="Product Price"
          {...register("base_price", {
            required: "Base price is required",
            pattern: {
              value: /^[0-9]+(\.[0-9]{1,2})?$/,
              message: "Enter a valid price",
            },
          })}
        />
        {errors.base_price && (
          <p className="text-error text-sm">{errors.base_price.message}</p>
        )}
        <small className="text-xs text-darklink">Set the product price.</small>
      </div>

      {/* Discount Type */}
      <Label value="Discount Type" />
      <div className="grid grid-cols-12 gap-6 my-2">
        {["no-discount", "percentage", "fixed-price"].map((type) => (
          <div className="lg:col-span-4 col-span-12" key={type}>
            <div
              className={`border border-ld p-4 rounded-md hover:border-primary hover:bg-lightprimary cursor-pointer ${
                discountType === type ? "border-primary bg-lightprimary" : ""
              }`}
            >
              <div className="flex items-center gap-4 sm:ps-2">
                <Radio
                  id={type}
                  name="discount"
                  value={type}
                  checked={discountType === type}
                  onChange={handleRadioChange}
                />
                <Label
                  htmlFor={type}
                  className="cursor-pointer text-ld font-semibold text-base"
                >
                  {type === "no-discount"
                    ? "No Discount"
                    : type === "percentage"
                    ? "Percentage %"
                    : "Fixed Price"}
                </Label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Discount Input Based on Type */}
      {discountType !== "no-discount" && (
        <div className="my-6">
          <Label htmlFor="discount" value="Discount" />
          <TextInput
            id="discount"
            type="number"
            placeholder="10"
            min={0}
            max={100}
            {...register("discount", {
              required: "Discount is required",
              min: {
                value: 0,
                message: "Minimum discount is 0",
              },
              max: {
                value: discountType === "percentage" ? 100 : undefined,
                message: discountType === "percentage" ? "Max 100%" : undefined,
              },
            })}
          />
          {errors.discount && (
            <p className="text-error text-sm">{errors.discount.message}</p>
          )}
          <small className="text-xs text-darklink">
            Set a discount{discountType === "percentage" ? " %" : " price"}
          </small>
        </div>
      )}

      {/* {discountType === "fixed-price" && (
        <div className="my-6">
          <Label htmlFor="discountFixed" value="Discounted Price" />
          <span className="text-error ms-1">*</span>
          <TextInput
            id="discountFixed"
            type="text"
            placeholder="99.99"
            {...register("discountFixed", {
              required: "Discounted price is required",
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message: "Enter a valid amount",
              },
            })}
          />
          {errors.discountFixed && (
            <p className="text-error text-sm">{errors.discountFixed.message}</p>
          )}
          <small className="text-xs text-darklink">
            Set the final fixed discounted price.
          </small>
        </div>
      )} */}

      {/* Tax Class & GST */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="lg:col-span-6 col-span-12">
          <Label htmlFor="tax_class" value="Tax Class" />
          <span className="text-error ms-1">*</span>
          <Select
            id="tax_class"
            {...register("tax_class", {
              required: "Tax class is required",
            })}
          >
            <option value="">Select an option</option>
            <option value="Tax Free">Tax Free</option>
            <option value="Taxable Goods">Taxable Goods</option>
          </Select>
          {errors.tax_class && (
            <p className="text-error text-sm">{errors.tax_class.message}</p>
          )}
          <small className="text-xs text-darklink">Set the tax class.</small>
        </div>

        <div className="lg:col-span-6 col-span-12">
          <Label htmlFor="gst_amount" value="GST Amount (%)" />
          <span className="text-error ms-1">*</span>
          <TextInput
            id="gst_amount"
            type="text"
            placeholder="18"
            {...register("gst_amount", {
              required: "GST amount is required",
              pattern: {
                value: /^[0-9]+(\.[0-9]{1,2})?$/,
                message: "Enter a valid percentage",
              },
            })}
          />
          {errors.gst_amount && (
            <p className="text-error text-sm">{errors.gst_amount.message}</p>
          )}
          <small className="text-xs text-darklink">
            Set the GST percentage (e.g., 18).
          </small>
        </div>
      </div>
    </CardBox>
  );
};

export default Pricing;

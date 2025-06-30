import React from "react";
import CardBox from "@/app/components/shared/CardBox";
import { Label, Select, TextInput } from "flowbite-react";

const ShippingDetails = ({ register, errors }) => {
  return (
    <>
      <CardBox>
        <h5 className="card-title mb-4">Shipping Details</h5>
        <div>
          {/* Unit Select for Dimensions */}
          <div className="mb-2 block">
            <Label htmlFor="dimensionUnit" value="Select the Unit" />
            <span className="text-error ms-1">*</span>
          </div>
          <Select
            id="dimensionUnit"
            className="select-md"
            {...register("dimensionUnit", {
              required: "Dimension unit is required",
            })}
            defaultValue=""
          >
            <option value="" disabled>
              Select the Unit
            </option>
            <option value="Inch">Inch</option>
            <option value="Centimeter">Centimeter</option>
            <option value="Feet">Feet</option>
          </Select>
          {errors.dimensionUnit && (
            <p className="text-error text-xs mt-1">
              {errors.dimensionUnit.message}
            </p>
          )}

          {/* Dimensions Inputs */}
          <div className="mb-2 block mt-4">
            <Label htmlFor="length" value="Dimension (L x W x H)" />
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-4 col-span-12">
              <TextInput
                id="length"
                type="text"
                sizing="md"
                placeholder="L"
                className="form-rounded-md"
                {...register("length", {
                  required: "Length is required",
                  pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: "Length must be a valid number",
                  },
                })}
              />
              {errors.length && (
                <p className="text-error text-xs mt-1">
                  {errors.length.message}
                </p>
              )}
            </div>
            <div className="lg:col-span-4 col-span-12">
              <TextInput
                id="width"
                type="text"
                sizing="md"
                placeholder="W"
                className="form-rounded-md"
                {...register("width", {
                  required: "Width is required",
                  pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: "Width must be a valid number",
                  },
                })}
              />
              {errors.width && (
                <p className="text-error text-xs mt-1">
                  {errors.width.message}
                </p>
              )}
            </div>
            <div className="lg:col-span-4 col-span-12">
              <TextInput
                id="height"
                type="text"
                sizing="md"
                placeholder="H"
                className="form-rounded-md"
                {...register("height", {
                  required: "Height is required",
                  pattern: {
                    value: /^[0-9]*\.?[0-9]+$/,
                    message: "Height must be a valid number",
                  },
                })}
              />
              {errors.height && (
                <p className="text-error text-xs mt-1">
                  {errors.height.message}
                </p>
              )}
            </div>
          </div>

          {/* Unit Select for Weight */}
          <div className="mb-2 block mt-4">
            <Label htmlFor="weightUnit" value="Select the Unit (Weight)" />
            <span className="text-error ms-1">*</span>
          </div>
          <Select
            id="weightUnit"
            className="select-md"
            {...register("weightUnit", { required: "Weight unit is required" })}
            defaultValue=""
          >
            <option value="" disabled>
              Select the Unit
            </option>
            <option value="Kg">Kg</option>
            <option value="Gram">Gram</option>
          </Select>
          {errors.weightUnit && (
            <p className="text-error text-xs mt-1">
              {errors.weightUnit.message}
            </p>
          )}

          {/* Weight Input */}
          <div className="mb-4 mt-4">
            <Label htmlFor="weight" value="Weight" />
            <span className="text-error ms-1">*</span>
            <TextInput
              id="weight"
              type="text"
              sizing="md"
              placeholder="ex: 0.1, 10"
              className="form-rounded-md"
              {...register("weight", {
                required: "Weight is required",
                pattern: {
                  value: /^[0-9]*\.?[0-9]+$/,
                  message: "Weight must be a valid number",
                },
              })}
            />
            {errors.weight && (
              <p className="text-error text-xs mt-1">{errors.weight.message}</p>
            )}
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default ShippingDetails;

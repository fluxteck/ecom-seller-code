"use client";
import React, { useEffect, useState } from "react";
import CardBox from "@/app/components/shared/CardBox";
import { HiOutlinePlusSm, HiOutlineX } from "react-icons/hi";
import { Button, Label, Select, TextInput } from "flowbite-react";

const Variation = ({ register, errors, setValue, isSubmitted, getValues }) => {
  const formVariations = getValues("variations") || [];
  const [variations, setVariations] = useState(() => {
    // If variations from form are empty, initialize with one default variation
    if (formVariations.length === 0) {
      return [{ id: 1, type: "Size", value: "" }];
    }
    // If formVariations exist but have no id, assign ids here
    return formVariations.map((v, idx) => ({
      id: v.id || idx + 1,
      type: v.type,
      value: v.value,
    }));
  });

  // 2. Generate nextId dynamically based on max id found in variations
  const [nextId, setNextId] = useState(() => {
    if (variations.length === 0) return 1;
    return variations.length + 1;
  });

  // 3. Update form field whenever local variations state changes
  useEffect(() => {
    setValue("variations", variations, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [variations, setValue]);
  // useEffect(() => {
  //   const data = getValues("variations");
  //   setVariations(data);
  //   // setValue("variations", data, {
  //   //   shouldValidate: true,
  //   //   shouldDirty: true,
  //   // });
  // }, [getValues]);

  useEffect(() => {
    // Sync variations local state with react-hook-form

    setValue("variations", variations, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [variations, setValue]);

  // Handle change for type and value, update both local state and react-hook-form field
  const handleTypeChange = (id, e) => {
    const updated = variations.map((v) =>
      v.id === id ? { ...v, type: e.target.value } : v
    );
    setVariations(updated);
    // setValue("variations", updated);
  };

  const handleValueChange = (id, e) => {
    const updated = variations.map((v) =>
      v.id === id ? { ...v, value: e.target.value } : v
    );
    setVariations(updated);
    // setValue("variations", updated);
  };

  const addVariation = () => {
    const updated = [...variations, { id: nextId, type: "Size", value: "" }];
    setVariations(updated);
    // setValue("variations", updated);
    setNextId(nextId + 1);
  };

  const removeVariation = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      const updated = variations.filter((v) => v.id !== id);
      setVariations(updated);
      // setValue("variations", updated);
    }
  };

  return (
    <CardBox>
      <h5 className="card-title mb-4">Variation</h5>

      {variations.map((variation, index) => {
        return (
          <div
            key={index}
            className="grid grid-cols-12 md:gap-30 gap-5 items-end mb-3"
          >
            <div className="md:col-span-4 col-span-12">
              <Label htmlFor={`variations.${index}.type`} value="Type" />
              <span className="text-error ms-1">*</span>
              <Select
                id={`variations.${index}.type`}
                className="select-md"
                {...register(`variations.${index}.type`, {
                  required: "Type is required",
                })}
                value={variation.type}
                onChange={(e) => handleTypeChange(variation.id, e)}
                required
              >
                <option value="Size">Size</option>
                <option value="Color">Color</option>
                <option value="Material">Material</option>
                <option value="Style">Style</option>
              </Select>
              {errors.variations?.[index]?.type && (
                <p className="text-error text-xs mt-1">
                  {errors.variations[index].type.message}
                </p>
              )}
            </div>

            <div className="md:col-span-4 col-span-12">
              <Label htmlFor={`variations.${index}.value`} value="Value" />
              <TextInput
                id={`variations.${index}.value`}
                type="text"
                placeholder="Variation"
                className="form-rounded-md"
                {...register(`variations.${index}.value`, {
                  required: "Value is required",
                })}
                value={variation.value}
                onChange={(e) => handleValueChange(variation.id, e)}
              />
              {isSubmitted && errors.variations?.[index]?.value && (
                <p className="text-error text-xs mt-1">
                  {errors.variations[index].value.message}
                </p>
              )}
            </div>

            <div className="md:col-span-4 col-span-12">
              <Button
                color={"lighterror"}
                onClick={() => removeVariation(variation.id)}
                type="button"
              >
                <HiOutlineX size={20} />
              </Button>
            </div>
          </div>
        );
      })}

      <Button
        color={"lightprimary"}
        className="w-fit flex items-center gap-2 mt-4"
        onClick={addVariation}
        type="button"
      >
        <HiOutlinePlusSm size={18} /> Add another variation
      </Button>
    </CardBox>
  );
};

export default Variation;

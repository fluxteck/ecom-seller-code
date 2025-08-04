"use client";
import React, { useState, useEffect, useRef } from "react";
import CardBox from "@/app/components/shared/CardBox";
import { Button, Label, TextInput } from "flowbite-react";
import { HiOutlinePlusSm, HiOutlineX } from "react-icons/hi";
import useCategories from "@/hooks/products/use-categories";
// import { Controller } from "react-hook-form";

const ProductData = ({
  control,
  errors,
  setValue,
  getValues,
  isSubmitted,
  Controller,
}) => {
  const { categories, error, loading } = useCategories();

  const catRef = useRef(null);
  const typeRef = useRef(null);
  const tagRef = useRef(null);

  // Local input states for typing/filtering
  const [catInput, setCatInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  // Dropdown visibility states
  const [showCatOptions, setShowCatOptions] = useState(false);
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [showTagOptions, setShowTagOptions] = useState(false);

  // Options from your categories hook (fallback to empty array)
  const catOptions = categories?.categories || [];
  const typeOptions = categories?.productTypes || [];
  const tagOptions = categories?.tags || [];

  // Filter options based on input text (case insensitive)
  const filteredCatOptions = catOptions.filter((option) =>
    (option.name || option).toLowerCase().includes(catInput.toLowerCase())
  );
  const filteredTypeOptions = typeOptions.filter((option) =>
    (option.name || option).toLowerCase().includes(typeInput.toLowerCase())
  );
  const filteredTagOptions = tagOptions.filter((option) =>
    (option.name || option).toLowerCase().includes(tagInput.toLowerCase())
  );

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (catRef.current && !catRef.current.contains(event.target)) {
        setShowCatOptions(false);
      }
      if (typeRef.current && !typeRef.current.contains(event.target)) {
        setShowTypeOptions(false);
      }
      if (tagRef.current && !tagRef.current.contains(event.target)) {
        setShowTagOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <CardBox>
      <h5 className="card-title mb-4">Product Details</h5>

      {/* Categories */}
      <div className="mb-4" ref={catRef}>
        <Label htmlFor="cat" value="Categories" />
        <span className="text-error ms-1">*</span>
        <div className="relative">
          <Controller
            control={control}
            name="categories"
            rules={{
              required: "At least one category is required",
              validate: (value) =>
                (Array.isArray(value) && value.length > 0) ||
                "At least one category is required",
            }}
            render={({ field }) => (
              <>
                <TextInput
                  id="cat"
                  autoComplete="off"
                  value={catInput}
                  onFocus={() => setShowCatOptions(true)}
                  onChange={(e) => setCatInput(e.target.value)}
                  className="form-control"
                  placeholder="Type to search categories"
                />
                {showCatOptions && (
                  <div className="absolute top-10 left-0 mt-1 w-full bg-white dark:bg-dark rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {loading ? (
                      <div className="py-2 px-3 text-sm text-gray-500">
                        Loading...
                      </div>
                    ) : filteredCatOptions.length > 0 ? (
                      filteredCatOptions.map((option, i) => {
                        const id = option._id || option.id || option;
                        const name = option.name || option;
                        return (
                          <div
                            key={id}
                            className="py-2 px-3 bg-hover cursor-pointer"
                            onClick={() => {
                              // Add selected if not already included
                              if (!field.value?.some((cat) => cat.id === id)) {
                                field.onChange([
                                  ...(field.value || []),
                                  { id, name },
                                ]);
                              }
                              setCatInput("");
                              setShowCatOptions(false);
                            }}
                          >
                            {name}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-2 px-3 text-sm text-gray-400">
                        No categories found.
                      </div>
                    )}
                  </div>
                )}

                {/* Display selected categories */}
                <div className="mt-2 flex gap-1 flex-wrap">
                  {(field.value || []).map((cat) => (
                    <span
                      key={cat.id}
                      className="bg-lightprimary py-1 px-2 rounded-full text-primary flex items-center"
                    >
                      {cat.name}
                      <HiOutlineX
                        size={12}
                        className="cursor-pointer ml-1"
                        onClick={() => {
                          const newValue = (field.value || []).filter(
                            (c) => c.id !== cat.id
                          );
                          field.onChange(newValue);
                        }}
                      />
                    </span>
                  ))}
                </div>
              </>
            )}
          />
          {isSubmitted && errors.categories && (
            <p className="text-error text-sm mt-1">
              {errors.categories.message}
            </p>
          )}
        </div>
      </div>

      {/* Product Type */}
      <div className="mb-4" ref={typeRef}>
        <Label htmlFor="type" value="Product Type" />
        <span className="text-error ms-1">*</span>
        <div className="relative">
          <Controller
            control={control}
            name="product_type"
            rules={{
              required: "At least one product type is required",
              validate: (value) =>
                (Array.isArray(value) && value.length > 0) ||
                "At least one product type is required",
            }}
            render={({ field }) => (
              <>
                <TextInput
                  id="type"
                  autoComplete="off"
                  value={typeInput}
                  onFocus={() => setShowTypeOptions(true)}
                  onChange={(e) => setTypeInput(e.target.value)}
                  className="form-control"
                  placeholder="Type to search product types"
                />
                {showTypeOptions && (
                  <div className="absolute top-10 left-0 mt-1 w-full bg-white dark:bg-dark rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {loading ? (
                      <div className="py-2 px-3 text-sm text-gray-500">
                        Loading...
                      </div>
                    ) : filteredTypeOptions.length > 0 ? (
                      filteredTypeOptions.map((option, i) => {
                        const id = option._id || option.id || option;
                        const name = option.name || option;
                        return (
                          <div
                            key={id}
                            className="py-2 px-3 bg-hover cursor-pointer"
                            onClick={() => {
                              if (
                                !field.value?.some((type) => type.id === id)
                              ) {
                                field.onChange([
                                  ...(field.value || []),
                                  { id, name },
                                ]);
                              }
                              setTypeInput("");
                              setShowTypeOptions(false);
                            }}
                          >
                            {name}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-2 px-3 text-sm text-gray-400">
                        No types found.
                      </div>
                    )}
                  </div>
                )}

                {/* Display selected types */}
                <div className="mt-2 flex gap-1 flex-wrap">
                  {(field.value || []).map((type) => (
                    <span
                      key={type.id}
                      className="bg-lightprimary py-1 px-2 rounded-full text-primary flex items-center"
                    >
                      {type.name}
                      <HiOutlineX
                        size={12}
                        className="cursor-pointer ml-1"
                        onClick={() => {
                          const newValue = (field.value || []).filter(
                            (t) => t.id !== type.id
                          );
                          field.onChange(newValue);
                        }}
                      />
                    </span>
                  ))}
                </div>
              </>
            )}
          />
          {isSubmitted && errors.product_type && (
            <p className="text-error text-sm mt-1">
              {errors.product_type.message}
            </p>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-4" ref={tagRef}>
        <Label htmlFor="tags" value="Tags" />
        <div className="relative">
          <Controller
            control={control}
            name="tags"
            render={({ field }) => (
              <>
                <TextInput
                  id="tags"
                  autoComplete="off"
                  value={tagInput}
                  onFocus={() => setShowTagOptions(true)}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && tagInput.trim()) {
                      const newTag = { id: null, name: tagInput.trim() };
                      if (
                        !field.value?.some((tag) => tag.name === newTag.name)
                      ) {
                        field.onChange([...(field.value || []), newTag]);
                      }
                      setTagInput("");
                      e.preventDefault();
                    }
                  }}
                  className="form-control"
                  placeholder="Type to search or add tags"
                />
                {showTagOptions && (
                  <div className="absolute top-10 left-0 mt-1 w-full bg-white dark:bg-dark rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {loading ? (
                      <div className="py-2 px-3 text-sm text-gray-500">
                        Loading...
                      </div>
                    ) : filteredTagOptions.length > 0 ? (
                      filteredTagOptions.map((option, i) => {
                        const id = option._id || option.id || option;
                        const name = option.name || option;
                        return (
                          <div
                            key={id}
                            className="py-2 px-3 bg-hover cursor-pointer"
                            onClick={() => {
                              if (!field.value?.some((tag) => tag.id === id)) {
                                field.onChange([
                                  ...(field.value || []),
                                  { id, name },
                                ]);
                              }
                              setTagInput("");
                              setShowTagOptions(false);
                            }}
                          >
                            {name}
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-2 px-3 text-sm text-gray-400">
                        No tags found.
                      </div>
                    )}
                  </div>
                )}

                {/* Display selected tags */}
                <div className="mt-2 flex gap-1 flex-wrap">
                  {(field.value || []).map((tag, i) => (
                    <span
                      key={tag.id || i}
                      className="bg-lightprimary py-1 px-2 rounded-full text-primary flex items-center"
                    >
                      {tag.name}
                      <HiOutlineX
                        size={12}
                        className="cursor-pointer ml-1"
                        onClick={() => {
                          const newValue = (field.value || []).filter(
                            (t) => (t.id || t.name) !== (tag.id || tag.name)
                          );
                          field.onChange(newValue);
                        }}
                      />
                    </span>
                  ))}
                </div>
              </>
            )}
          />
        </div>
      </div>

      {/* Add Default Category Button */}
      <div className="mt-2">
        <Button
          color="lightprimary"
          className="w-fit flex items-center gap-2"
          type="button"
          onClick={() => {
            if (
              catOptions.length > 0 &&
              !getValues("categories")?.some(
                (cat) =>
                  cat.id ===
                  (catOptions[0]._id || catOptions[0].id || catOptions[0])
              )
            ) {
              const item = {
                id: catOptions[0]._id || catOptions[0].id || catOptions[0],
                name: catOptions[0].name || catOptions[0],
              };
              const newCats = [...(getValues("categories") || []), item];
              setValue("categories", newCats, { shouldValidate: true });
            }
          }}
        >
          <HiOutlinePlusSm size={18} /> Add selected category
        </Button>
      </div>
    </CardBox>
  );
};

export default ProductData;

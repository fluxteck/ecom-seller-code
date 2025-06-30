"use client";
import React from "react";
import { useForm } from "react-hook-form";
import BreadcrumbComp from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbComp";
import Media from "@/app/components/apps/ecommerce/addProduct/Media";
import Variation from "@/app/components/apps/ecommerce/addProduct/Variation";
import Pricing from "@/app/components/apps/ecommerce/addProduct/Pricing";
import { Button } from "flowbite-react";
import Status from "@/app/components/apps/ecommerce/addProduct/Status";
import ProductData from "@/app/components/apps/ecommerce/addProduct/ProductData";
import MetaData from "@/app/components/apps/ecommerce/addProduct/metaData";
import ShippingDetails from "@/app/components/apps/ecommerce/addProduct/ShippingDetails";
import GeneralDetail from "@/app/components/apps/ecommerce/addProduct/GeneralDetail";

const BCrumb = [{ to: "/", title: "Home" }, { title: "Add Product" }];

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    console.log("✅ Final form data:", data);
    const { data: details, error } = await handleSubmitProduct({
      ...data,
      description: "tesing...",
    });
    if (details.success) {
      alert("Product submitted successfully!");
      reset();
    }
    console.log(details);
    console.log("❌ Error:", error);

    // You can now send `data` to your API
  };

  const handleSubmitProduct = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        // console.error("Error saving product:", error);
        // alert("Product submission failed: " + error.message);
        return { error: error.message };
      }

      const data = await response.json();
      return { data: data };
      // console.log("Product saved successfully:", data);
      // alert("Product submitted successfully!");
    } catch (err) {
      console.error("Network or server error:", err);
      return { error: "Network or server error. Please try again later." };
    }
  };

  return (
    <>
      <BreadcrumbComp title="Add Product" items={BCrumb} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-12 gap-30">
          <div className="lg:col-span-8 col-span-12">
            <div className="flex flex-col gap-30">
              <GeneralDetail
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
              />
              <Media
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
              />
              <Variation
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                isSubmitted={formState.isSubmitted}
              />
              <Pricing
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
              />
              <MetaData
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
              />
            </div>
          </div>

          <div className="lg:col-span-4 col-span-12">
            <div className="flex flex-col gap-30">
              <Status
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                watch={watch}
              />
              <ProductData
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                control={control}
                isSubmitted={formState.isSubmitted}
              />
              <ShippingDetails
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
              />
            </div>
          </div>

          <div className="lg:col-span-8 col-span-12">
            <div className="sm:flex gap-3">
              <Button
                color={"primary"}
                className="sm:mb-0 mb-3 w-fit"
                type="submit"
              >
                Save changes
              </Button>
              <Button color={"lighterror"} className="w-fit" type="button">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddProduct;

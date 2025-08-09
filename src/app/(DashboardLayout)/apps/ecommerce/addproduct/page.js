"use client";
import React from "react";
// import { useForm } from "react-hook-form";
import BreadcrumbComp from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbComp";
// import Media from "@/app/components/apps/ecommerce/addProduct/Media";
import Variation from "@/app/components/apps/ecommerce/addProduct/Variation";
import Pricing from "@/app/components/apps/ecommerce/addProduct/Pricing";
import { Button } from "flowbite-react";
import Status from "@/app/components/apps/ecommerce/addProduct/Status";
import ProductData from "@/app/components/apps/ecommerce/addProduct/ProductData";
import MetaData from "@/app/components/apps/ecommerce/addProduct/metaData";
import ShippingDetails from "@/app/components/apps/ecommerce/addProduct/ShippingDetails";
import GeneralDetail from "@/app/components/apps/ecommerce/addProduct/GeneralDetail";
import { addProductToDB } from "ecom-sdk/product";

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
    Controller,
    reset,
    onSubmit,
    formState: { errors },
  } = addProductToDB();

  const submitAndHandle = async (formData) => {
    // console.log(formData);

    const { result, error } = await onSubmit(formData);

    if (error) {
      console.error("❌ Product submission failed:", error);
      return;
    } else {
      reset();
      console.log("✅ Product added:", result);
      // Use the returned result however you want
    }
  };

  return (
    <>
      <BreadcrumbComp title="Add Product" items={BCrumb} />
      <form onSubmit={handleSubmit(submitAndHandle)}>
        <div className="grid grid-cols-12 gap-30">
          <div className="lg:col-span-8 col-span-12">
            <div className="flex flex-col gap-30">
              <GeneralDetail
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
              />
              {/* <Media
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
              /> */}
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
                Controller={Controller}
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

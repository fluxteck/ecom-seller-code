"use client";
import React from "react";
import BreadcrumbComp from "@/app/(DashboardLayout)/layout/shared/breadcrumb/BreadcrumbComp";
import { Button } from "flowbite-react";
import { useParams } from "next/navigation";
// import { editProduct } from "ecommerce-sdk/product";
import { editProduct } from "ecom-sdk/product";
import MetaData from "@/app/components/apps/ecommerce/addProduct/metaData";
import GeneralDetail from "@/app/components/apps/ecommerce/addProduct/GeneralDetail";
import Media from "@/app/components/apps/ecommerce/addProduct/Media";
import Variation from "@/app/components/apps/ecommerce/addProduct/Variation";
import Pricing from "@/app/components/apps/ecommerce/addProduct/Pricing";
import Status from "@/app/components/apps/ecommerce/addProduct/Status";
import ProductData from "@/app/components/apps/ecommerce/addProduct/ProductData";
import ShippingDetails from "@/app/components/apps/ecommerce/addProduct/ShippingDetails";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Edit Product",
  },
];

const EditProduct = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    onSubmit,
    setValue,
    getValues,
    formState,
    Controller,
    watch,
    control,
    reset,
    formState: { errors },
    loading,
    error,
    data,
  } = editProduct(id);
  // console.log(getValues("variations"));
  // console.log(error);

  function handleCancel() {
    // console.log("in");

    reset();
  }
  const submitAndHandle = async (formData) => {
    // console.log("in");

    // console.log(formData);

    const { result, error } = await onSubmit(formData);

    if (error) {
      console.error("❌ Product submission failed:", error);
      return;
    } else {
      console.log("✅ Product added:", result);
      // Use the returned result however you want
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);

    return <div>Error:{error ? "error" : "Something went wrong"}</div>;
  }
  if (!data) {
    return <div>No product data found</div>;
  }
  return (
    <>
      <BreadcrumbComp title="Edit Product" items={BCrumb} />
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
              {/* <Thumbnail /> */}
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
                type="submit"
                className="sm:mb-0 mb-3 w-fit"
              >
                Save changes
              </Button>
              <Button
                onClick={handleCancel}
                color={"lighterror"}
                className="w-fit"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditProduct;

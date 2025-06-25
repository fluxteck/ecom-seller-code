'use client'
import CardBox from "@/app/components/shared/CardBox";
import { HiOutlinePlusSm,HiOutlineX  } from "react-icons/hi";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";

const MetaData = () => {


  return (

    <>
      <CardBox>
        <h5 className="card-title mb-4">MetaData</h5>
      
<div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="metatitle" value="Meta Title" />
            <span className="text-error ms-1">*</span>
          </div>
          <TextInput
            id="metatitle"
            type="text"
            sizing="md"
            className="form-rounded-md"
            placeholder="Meta Title"
          />
          <small className="text-xs text-darklink">
            A meta title is required.
          </small>
        </div>



        <div className="">
                  <div className="mb-2 block">
                    <Label htmlFor="metades" value="Meta Description" />
                  </div>
                  <Textarea
                    id="metades"
                    placeholder="Write Meta Description..."
                    required
                    rows={8}
                    className="form-control-textarera"
                  />
                </div>

        {/* <Button
          color={"lightprimary"}
          className="w-fit flex items-center gap-2 mt-4"
        //   onClick={addVariation}
        >
          <HiOutlinePlusSm size={18} /> Add another variation
        </Button> */}
      </CardBox>
    </>
  );
};

export default MetaData;

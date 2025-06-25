import CardBox from "@/app/components/shared/CardBox";
import { Badge, Label, Select, TextInput } from "flowbite-react";
import React from "react";

const ShippingDetails = () => {
  return (
    <>
      <CardBox>
        <h5 className="card-title mb-4">Shipping Details</h5>
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="dimension" value="Select the Unit" />
            <span className="text-error ms-1">*</span>
          </div>
          <Select id="dimension" className="select-md" required>
            {/* <option selected>Select the Unit</option> */}
            <option>Inch</option>
            <option>Centimeter</option>
            <option>Feet</option>
          </Select>

          <div className="mb-2 block mt-4">
            <Label htmlFor="length" value="Dimension" />
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-4 col-span-12">
              <div className="mb-4">
                <TextInput
                  id="length"
                  type="text"
                  sizing="md"
                  className="form-rounded-md"
                  placeholder="L"
                />
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12">
              <div className="mb-4">
                {/* <div className="mb-2 block">
                      <Label htmlFor="width" value="W" />
                      <span className="text-error ms-1">*</span>
                    </div> */}
                <TextInput
                  id="width"
                  type="text"
                  sizing="md"
                  className="form-rounded-md"
                  placeholder="W"
                />
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12">
              <div className="mb-4">
                {/* <div className="mb-2 block">
                      <Label htmlFor="height" value="H" />
                      <span className="text-error ms-1">*</span>
                    </div> */}
                <TextInput
                  id="height"
                  type="text"
                  sizing="md"
                  className="form-rounded-md"
                  placeholder="H"
                />
              </div>
            </div>
            
          </div>
          <div className="mb-2 block">
            <Label htmlFor="weight" value="Select the Unit (Weight)" />
            <span className="text-error ms-1">*</span>
          </div>
          <Select id="weight" className="select-md" required>
            {/* <option selected>Select the Unit</option> */}
            <option>Kg</option>
            <option>Gram</option>
          
          </Select>
          <div className="mb-4 mt-4">
                <div className="mb-2 block">
                      <Label htmlFor="weight" value="Weight" />
                      <span className="text-error ms-1">*</span>
                    </div>
                <TextInput
                  id="weight"
                  type="text"
                  sizing="md"
                  className="form-rounded-md"
                  placeholder="ex: 0.1, 10"
                />
              </div>

        </div>
      </CardBox>
    </>
  );
};

export default ShippingDetails;

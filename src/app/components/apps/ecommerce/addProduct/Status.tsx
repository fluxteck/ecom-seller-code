'use client'
import CardBox from "@/app/components/shared/CardBox";
import { Badge, Label, Select } from "flowbite-react";
import React, { useState } from "react";

const Status = () => {

  const [selectedStatus, setSelectedStatus] = useState("Active");

  return (
    <>
      <CardBox>
        <div className="flex justify-between items-center mb-4">
          <h5 className="card-title">Status</h5>
          {selectedStatus === "Active" ? (
            <Badge color={"success"} className="h-3 w-3 p-0"></Badge>
          ) : (
            <Badge color={"warning"} className="h-3 w-3 p-0"></Badge>
          )}
        </div>
        <div className="">
         
          <Select id="countries" className="select-md" required
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}>
            
            <option value="Publish">Active</option>
            <option value="Inactive">Inactive</option>
          </Select>
          <small className="text-xs text-darklink">
            Set the product status.
          </small>
        </div>
      </CardBox>
    </>
  );
};

export default Status;

"use client";
import CardBox from "@/app/components/shared/CardBox";
import { Badge, Label, Select } from "flowbite-react";
import React, { useEffect, useState } from "react";

const Status = ({ register, setValue, watch }) => {
  const [selectedStatus, setSelectedStatus] = useState("Inactive");

  // If using react-hook-form, sync form state
  useEffect(() => {
    if (setValue) {
      setValue("status", selectedStatus);
    }
  }, [selectedStatus, setValue]);

  const handleChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  // For react-hook-form watch (optional)
  const currentStatus = watch ? watch("status") : selectedStatus;

  return (
    <CardBox>
      <div className="flex justify-between items-center mb-4">
        <h5 className="card-title">Status</h5>
        {currentStatus === "Active" ? (
          <Badge color="success" className="h-3 w-3 p-0" />
        ) : (
          <Badge color="warning" className="h-3 w-3 p-0" />
        )}
      </div>
      <div>
        <Select
          id="status"
          className="select-md"
          required
          value={currentStatus}
          onChange={handleChange}
          {...(register ? register("status", { required: true }) : {})}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Select>
        <small className="text-xs text-darklink">Set the product status.</small>
      </div>
    </CardBox>
  );
};

export default Status;

"use client";
import {
  Badge,
  Table,
  Dropdown,
  Checkbox,
  TextInput,
  Button,
  Modal,
} from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Icon } from "@iconify/react";
import CardBox from "@/app/components/shared/CardBox";
import { ProductContext } from "@/app/context/Ecommercecontext/index";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import SimpleBar from "simplebar-react";
import { useProductsContext } from "ecom-sdk/product";
import Link from "next/link";
// import { useRouter } from "next/navigation";

const ProductTablelist = () => {
  const { products, pagination, loading, error, fetchProducts } =
    useProductsContext();

  // console.log(products);

  // console.log(products);
  // const router=useRouter()

  // console.log(products);
  // console.log(error);

  useEffect(() => {
    if (!products.length) {
      fetchProducts({ page: 1, limit: 10 });
    }
  }, []);

  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    // searchProducts(event.target.value);
  };

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedProducts(products.map((product) => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleSelectProduct = (productId) => {
    const index = selectedProducts.indexOf(productId);
    if (index === -1) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error: {error.message}
      </div>
    );
  }
  if (!products || products.length === 0) {
    return <div className="text-center py-10">No products found.</div>;
  }
  return (
    <>
      <CardBox>
        <div className="flex gap-3 justify-between items-center mb-5">
          <TextInput
            id="search"
            placeholder="Search Products"
            className="form-control w-full sm:max-w-60 max-w-full"
            sizing="md"
            required
            onChange={handleSearch}
            value={search}
            icon={() => <Icon icon="solar:magnifer-line-duotone" height={18} />}
          />
          <div className="flex gap-4">
            {selectAll ? (
              <Button color={"lightprimary"} className="btn-circle p-0">
                <Icon
                  icon="solar:trash-bin-minimalistic-outline"
                  height={18}
                  // onClick={handleDelete}
                />
              </Button>
            ) : (
              <Button color={"lightprimary"} className="btn-circle p-0">
                <Icon icon="solar:filter-outline" height={18} />
              </Button>
            )}
          </div>
        </div>

        <SimpleBar className="max-h-[580px]">
          <div className="border rounded-md border-ld overflow-x-auto">
            <Table>
              <Table.Head>
                <Table.HeadCell className="text-base font-semibold py-3">
                  <Checkbox
                    className="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Products
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Date
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Status
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Price
                </Table.HeadCell>
                <Table.HeadCell className="text-base font-semibold py-3">
                  Action
                </Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y divide-border dark:divide-darkborder">
                {products.map((item, index) => (
                  <Table.Row key={index}>
                    <Table.Cell className="whitespace-nowrap">
                      <Checkbox
                        className="checkbox"
                        onChange={() => toggleSelectProduct(item.id)}
                        checked={selectedProducts.includes(item.id)}
                      />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap lg:min-w-auto min-w-[250px]">
                      <div className="flex  gap-3 items-center">
                        {/* <img
                          src={item.photo}
                          alt="icon"
                          width={56}
                          height={56}
                          className="h-14 w-14 rounded-full"
                        /> */}
                        <div className="text-no-wrap">
                          <h6 className="text-base">{item.product_name}</h6>
                          <p className="text-sm text-darklink">
                            {item.product_code}
                          </p>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      <p className="text-sm text-darklink font-medium">
                        {format(new Date(item.created_at), "E, MMM d yyyy")}
                      </p>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      <div className="flex gap-2 text-sm items-center text-darklink font-medium">
                        {item.status === "Active" ? (
                          <Badge color={"success"} className="h-2 w-2 p-0" />
                        ) : (
                          <Badge color={"error"} className="h-2 w-2 p-0" />
                        )}
                        {item.status}
                      </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      <h5 className="text-base">${item.base_price}</h5>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap">
                      <Dropdown
                        label=""
                        dismissOnClick={false}
                        renderTrigger={() => (
                          <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                            <HiOutlineDotsVertical size={22} />
                          </span>
                        )}
                      >
                        <Link href={`/apps/ecommerce/editproduct/${item.id}`}>
                          <Dropdown.Item
                            className="flex gap-3"
                            // onClick={() => handleEdit(item.id)}
                          >
                            <Icon
                              icon="solar:pen-new-square-broken"
                              height={18}
                            />
                            <span>Edit</span>
                          </Dropdown.Item>
                        </Link>
                      </Dropdown>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </SimpleBar>
      </CardBox>
    </>
  );
};

export default ProductTablelist;

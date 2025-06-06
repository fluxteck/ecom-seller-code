"use client";
import React from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Badge, Button, Checkbox, Label } from "flowbite-react";
import Image from "next/image";
import TitleIconCard from "../../shared/TitleIconCard";

export interface TableTypeDense {
  avatar?: any;
  name?: string;
  post?: string;
  pname?: string;
  teams: {
    id: string;
    color: string;
    text: string;
  }[];
  status?: string;
  statuscolor?: string;
  budget?: string;
}

const basicTableData: TableTypeDense[] = [
  {
    avatar: "/images/profile/user-1.jpg",
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    status: "Active",
    statuscolor: "success",
    teams: [
      {
        id: "1",
        color: "error",
        text: "S",
      },
      {
        id: "2",
        color: "secondary   ",
        text: "D",
      },
    ],
    budget: "$3.9",
  },
  {
    avatar: "/images/profile/user-2.jpg",
    name: "Andrew McDownland",
    post: "Project Manager",
    pname: "Real Homes WP Theme",
    status: "Pending",
    statuscolor: "warning",
    teams: [
      {
        id: "1",
        color: "secondary",
        text: "N",
      },
      {
        id: "2",
        color: "warning   ",
        text: "X",
      },
      {
        id: "3",
        color: "primary   ",
        text: "A",
      },
    ],
    budget: "$24.5k",
  },
  {
    avatar: "/images/profile/user-3.jpg",
    name: "Christopher Jamil",
    post: "Project Manager",
    pname: "MedicalPro WP Theme",
    status: "Completed",
    statuscolor: "primary",
    teams: [
      {
        id: "1",
        color: "secondary",
        text: "X",
      },
    ],
    budget: "$12.8k",
  },
  {
    avatar: "/images/profile/user-7.jpg",
    name: "Nirav Joshi",
    post: "Frontend Engineer",
    pname: "Hosting Press HTML",
    status: "Active",
    statuscolor: "success",
    teams: [
      {
        id: "1",
        color: "primary",
        text: "X",
      },
      {
        id: "2",
        color: "error",
        text: "Y",
      },
    ],
    budget: "$2.4k",
  },
  {
    avatar: "/images/profile/user-5.jpg",
    name: "Micheal Doe",
    post: "Content Writer",
    pname: "Helping Hands WP Theme",
    status: "Cancel",
    statuscolor: "error",
    teams: [
      {
        id: "1",
        color: "secondary",
        text: "S",
      },
    ],
    budget: "$9.3k",
  },
];

const columnHelper = createColumnHelper<TableTypeDense>();

const defaultColumns = [
  columnHelper.accessor("avatar", {
    cell: (info) => (
      <div className="flex items-center space-x-2 p-1">
        <Image
          src={info.getValue()}
          alt="User Avatar"
          height={42}
          width={42}
          className="h-10 w-10 rounded-full"
        />
        <div className="truncate max-w-32">
          <h6 className="text-sm font-medium">{info.row.original.name}</h6>
          <p className="text-xs">{info.row.original.post}</p>
        </div>
      </div>
    ),
    header: () => <span>User</span>,
  }),
  columnHelper.accessor("pname", {
    header: () => <span>Project Name</span>,
    cell: (info) => <p className="text-base">{info.getValue()}</p>,
  }),
  columnHelper.accessor("teams", {
    header: () => <span>Team</span>,
    cell: (info) => (
      <div className="flex">
        {info.getValue().map((team) => (
          <div className="-ms-2" key={team.id}>
            <div
              className={`bg-${team.color} text-white border-2 border-white dark:border-darkborder h-10 w-10 flex justify-center items-center text-xl font-medium text-ld rounded-full`}
            >
              {team.text}
            </div>
          </div>
        ))}
      </div>
    ),
  }),
  columnHelper.accessor("status", {
    header: () => <span>Status</span>,
    cell: (info) => (
      <Badge
        color={`light${info.row.original.statuscolor}`}
        className="capitalize"
      >
        {info.getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor("budget", {
    header: () => <span>Budget</span>,
    cell: (info) => <h6 className="text-base">{info.getValue()}</h6>,
  }),
];

const ReactColumnVisibilityTable = () => {
  const [data] = React.useState(basicTableData);

  // const [columnVisibility, setColumnVisibility] = React.useState({});

  // const table = useReactTable({
  //     data,
  //     columns,
  //     columnVisibility,
  //     onColumnVisibilityChange: setColumnVisibility,
  //     getCoreRowModel: getCoreRowModel(),
  // });
  const [columns] = React.useState(() => [...defaultColumns]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });

  const handleDownload = () => {
    const headers = [
      "Name",
      "post",
      "pname",
      "status",
      "statuscolor",
      "teams",
      "budget",
    ];
    const rows = data.map((item) => [
      item.name,
      item.post,
      item.pname,
      item.status,
      item.statuscolor,
      item.teams.map((items) => items.text).join(", "),
      item.budget,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((e) => e.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "table-data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <TitleIconCard title="Column Visibility Table" onDownload={handleDownload}>
      <div className="pb-4">
        <div className="mt-4 flex flex-wrap  gap-6">
          <div>
            <Checkbox
              className="checkbox"
              {...{
                type: "checkbox",
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />
            <label className="ml-2">Toggle All</label>
          </div>
          {table.getAllColumns().map((column) => (
            <div key={column.id} className="flex items-center">
              <Checkbox
                className="checkbox"
                checked={column.getIsVisible()}
                onChange={() =>
                  setColumnVisibility((prev) => ({
                    ...prev,
                    [column.id]: !column.getIsVisible(),
                  }))
                }
              />
              <label className="ml-2">{column.id}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="border border-ld rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`text-base text-ld font-semibold text-left border-b  border-ld  p-2`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border dark:divide-darkborder">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`whitespace-nowrap  p-2  text-sm`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TitleIconCard>
  );
};

export default ReactColumnVisibilityTable;

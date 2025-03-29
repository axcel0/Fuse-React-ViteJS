import { Checkbox, Typography } from "@mui/material";
import React from "react";
import CustomerItem from "./CustomerItem";

interface Customer {
  id: number;
  name: string;
  emailSubs: string;
  location: string;
  orders: string;
  amountSpent: number;
}

const data: Customer[] = [
  {
    id: 1,
    name: "Esther Howard",
    emailSubs: "Subscribed",
    location: "Great Falls, Maryland",
    orders: "2 Orders",
    amountSpent: 250.0,
  },
  {
    id: 2,
    name: "Esther Howard",
    emailSubs: "Subscribed",
    location: "Great Falls, Maryland",
    orders: "2 Orders",
    amountSpent: 250.0,
  },
  {
    id: 3,
    name: "Esther Howard",
    emailSubs: "Subscribed",
    location: "Great Falls, Maryland",
    orders: "2 Orders",
    amountSpent: 250.0,
  },
  {
    id: 4,
    name: "Esther Howard",
    emailSubs: "Subscribed",
    location: "Great Falls, Maryland",
    orders: "2 Orders",
    amountSpent: 250.0,
  },
  {
    id: 5,
    name: "Esther Howard",
    emailSubs: "Subscribed",
    location: "Great Falls, Maryland",
    orders: "2 Orders",
    amountSpent: 250.0,
  },
  {
    id: 6,
    name: "Esther Howard",
    emailSubs: "Subscribed",
    location: "Great Falls, Maryland",
    orders: "2 Orders",
    amountSpent: 250.0,
  },
  {
    id: 7,
    name: "Esther Howard",
    emailSubs: "Subscribed",
    location: "Great Falls, Maryland",
    orders: "2 Orders",
    amountSpent: 250.0,
  },
  {
    id: 8,
    name: "Esther Howard",
    emailSubs: "Subscribed",
    location: "Great Falls, Maryland",
    orders: "2 Orders",
    amountSpent: 250.0,
  },
];

const CustomerTable = () => {
  return (
    <div className="border-l-3 border-r-3 border-b-1 border-[#f8fafb] rounded-bl-[10px] rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px] overflow-hidden mb-10">
      <div className="pl-2 pr-6 py-2 flex items-center justify-between bg-[#f8fafb]  text-[#6d6d6d]">
        <div className="flex gap-3 items-center w-[22%]">
          <Checkbox></Checkbox>
          <Typography>Customers</Typography>
        </div>
        <div className="w-[18%]">
          <Typography>Email Subscription</Typography>
        </div>
        <div className="w-[15%]">
          <Typography>Location</Typography>
        </div>
        <div className="w-[15%]">
          <Typography>Orders</Typography>
        </div>
        <div className="w-[15%]">
          <Typography>Amount Spent</Typography>
        </div>
        <div className="w-[5%] flex justify-center">
          <Typography>Action</Typography>
        </div>
      </div>
      {data &&
        data.map((item) => (
          <CustomerItem
            key={item.id}
            fullName={item.name}
            emailSubs={item.emailSubs}
            location={item.location}
            orders={item.orders}
            amountSpent={item.amountSpent}
          />
        ))}
      <div className="text-end mt-3">
        <Typography>
          Learn more about{" "}
          <span className="text-blue-500 underline">customers</span>
        </Typography>
      </div>
    </div>
  );
};

export default CustomerTable;

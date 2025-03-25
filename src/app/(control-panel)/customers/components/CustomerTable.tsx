import {
  Checkbox,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const CustomerTable = () => {
  return (
    <TableContainer className="rounded-tr-md rounded-tl-md">
      <Table component={Paper} className="p-2">
        <TableHead className="bg-[#f8fafb]">
          <TableRow>
            <TableCell className="py-2 px-1 flex items-center gap-5">
              <Checkbox />
              <Typography>Customers</Typography>
            </TableCell>
            <TableCell className="py-2 px-1 text-center">
              Email Subcription
            </TableCell>
            <TableCell className="py-2 px-1 text-center">Location</TableCell>
            <TableCell className="py-2 px-1 text-center">Orders</TableCell>
            <TableCell className="py-2 px-1 text-center">
              Amount Spent
            </TableCell>
            <TableCell className="py-2 px-1 text-center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="bg-white">
          <TableRow className="border-b-1">
            <TableCell className="py-2 px-1 flex items-center gap-5">
              <Checkbox />
              Customers
            </TableCell>
            <TableCell className="py-2 px-1 text-center">
              Email Subcription
            </TableCell>
            <TableCell className="py-2 px-1 text-center">Location</TableCell>
            <TableCell className="py-2 px-1 text-center">Orders</TableCell>
            <TableCell className="py-2 px-1 text-center">
              Amount Spent
            </TableCell>
            <TableCell className="py-2 px-1 text-center">Action</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-2 px-1 flex items-center gap-5">
              <Checkbox />
              Customers
            </TableCell>
            <TableCell className="py-2 px-1 text-center">
              Email Subcription
            </TableCell>
            <TableCell className="py-2 px-1 text-center">Location</TableCell>
            <TableCell className="py-2 px-1 text-center">Orders</TableCell>
            <TableCell className="py-2 px-1 text-center">
              Amount Spent
            </TableCell>
            <TableCell className="py-2 px-1 text-center">Action</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-2 px-1 flex items-center gap-5">
              <Checkbox />
              Customers
            </TableCell>
            <TableCell className="py-2 px-1 text-center">
              Email Subcription
            </TableCell>
            <TableCell className="py-2 px-1 text-center">Location</TableCell>
            <TableCell className="py-2 px-1 text-center">Orders</TableCell>
            <TableCell className="py-2 px-1 text-center">
              Amount Spent
            </TableCell>
            <TableCell className="py-2 px-1 text-center">Action</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-2 px-1 flex items-center gap-5">
              <Checkbox />
              Customers
            </TableCell>
            <TableCell className="py-2 px-1 text-center">
              Email Subcription
            </TableCell>
            <TableCell className="py-2 px-1 text-center">Location</TableCell>
            <TableCell className="py-2 px-1 text-center">Orders</TableCell>
            <TableCell className="py-2 px-1 text-center">
              Amount Spent
            </TableCell>
            <TableCell className="py-2 px-1 text-center">Action</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-2 px-1 flex items-center gap-5">
              <Checkbox />
              Customers
            </TableCell>
            <TableCell className="py-2 px-1 text-center">
              Email Subcription
            </TableCell>
            <TableCell className="py-2 px-1 text-center">Location</TableCell>
            <TableCell className="py-2 px-1 text-center">Orders</TableCell>
            <TableCell className="py-2 px-1 text-center">
              Amount Spent
            </TableCell>
            <TableCell className="py-2 px-1 text-center">Action</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;

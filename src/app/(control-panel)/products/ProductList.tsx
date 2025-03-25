import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
// import { Delete, Edit } from '@mui/icons-material';
import { useGetProductsQuery } from "@/store/api/productApi";

const ProductList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <Typography>Đang tải...</Typography>;
  if (error) return <Typography>Lỗi {JSON.stringify(error)}</Typography>;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Danh sách sản phẩm
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên Cản phẩm</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => <TableRow key={product.id}></TableRow>)}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductList;
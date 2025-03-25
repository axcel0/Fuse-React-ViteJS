import FuseUtils from "@fuse/utils";
import mockApi from "@mock-utils/mockApi";
import { http, HttpResponse } from "msw";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

const products: Product[] = [
  {
    id: FuseUtils.generateGUID(),
    name: "Iphone 15 Pro Max",
    price: 1000,
    description: "Mô tả Iphone 15 Pro Max",
    image: "",
  },
  {
    id: FuseUtils.generateGUID(),
    name: "Iphone 16 Pro Max",
    price: 1000,
    description: "Mô tả Iphone 16 Pro Max",
    image: "",
  },
  {
    id: FuseUtils.generateGUID(),
    name: "Iphone 14 Pro Max",
    price: 1000,
    description: "Mô tả Iphone 15 Pro Max",
    image: "",
  },
  {
    id: FuseUtils.generateGUID(),
    name: "Iphone 13 Pro Max",
    price: 1000,
    description: "Mô tả Iphone 13 Pro Max",
    image: "",
  },
];

products.forEach((item) => mockApi("products").create(item));

const productApi = [
  http.get("/api/mock/products", async () => {
    const items = await mockApi("products").findAll();
    return HttpResponse.json(items, { status: 200 });
  }),
];

export default productApi;

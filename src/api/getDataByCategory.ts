import { Categories, CategoryType } from "@/constants/Categories";
import getDataWithAuth from "./getDataWithAuth";

export interface DataByCategoryAndPage {
  ok: boolean;
  data: CategoryData[];
}

export interface CategoryData {
  boundingBox: BoundingBox;
  _id: string;
  workspace: string;
  store: string;
  title: string;
  desc: string;
  imageUrl: string;
  previewUrl: string;
  category: string;
  date: string;
  author: string;
  optional: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface BoundingBox {
  minx: number;
  maxx: number;
  miny: number;
  maxy: number;
}

const checkValidCategory = (category: string): boolean => {
  return Categories.includes(category as CategoryType);
};

const getDataByCategoryAndPage = async (category: string, page = 1) => {
  // checkValidCategory 함수를 사용해 유효성을 검사한다.
  const validCategory = checkValidCategory(category);
  if (!validCategory) {
    throw new Error(`Invalid category: ${category}`);
  }
  const url = `/data?category=${category}&page=${page}`;
  const options = {
    method: "GET",
  };

  const response: DataByCategoryAndPage = await getDataWithAuth(url, options);
  return response.data;
};

export default getDataByCategoryAndPage;

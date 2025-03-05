import axios from "axios";
import axiosUrl from "../lib/axios";

// ฟังก์ชันที่ใช้ดึงข้อมูล Location จาก API

interface Params {
  page?: number;
  perPage?: number;
  categoryId?: string;
  typeId?: string;
  subTypeId?: string;
  barcode?: string;
  productId?: string;
  productName?: string;
  unitId?: string;
  zoneId?: string;
  areaId?: string;
  subAreaId?: string;
  searchByCategory?: string;
  searchByType?: string;
  searchBySubType?: string;
  searchByBarcode?: string;
  searchByProductId?: string;
  searchByProductName?: string;
  searchByUnit?: string;
  sortByCategory?: string;
  sortByType?: string;
  sortBySubType?: string;
  sortByBarcode?: string;
  sortByProductId?: string;
  sortByProductName?: string;
  sortByUnit?: string;
  sortByQty?: string;
  sortByTags?: string;
  sortByNonTags?: string;
}

export const getStockUpdate = async (params: Params) => {
  try {
    const response = await axiosUrl.get("/v1/StockUpdate", {
      params: {
        page: params.page || "", // สามารถเปลี่ยนค่าเริ่มต้นหรือใช้ค่าอื่น ๆ ตามต้องการ
        perPage: params.perPage || "",
        categoryId: params.categoryId || "",
        typeId: params.typeId || "",
        subTypeId: params.subTypeId || "",
        barcode: params.barcode || "",
        productId: params.productId || "",
        productName: params.productName || "",
        unitId: params.unitId || "",
        zoneId: params.zoneId || "",
        areaId: params.areaId || "",
        subAreaId: params.subAreaId || "",
        searchByCategory: params.searchByCategory || "",
        searchByType: params.searchByType || "",
        searchBySubType: params.searchBySubType || "",
        searchByBarcode: params.searchByBarcode || "",
        searchByProductId: params.searchByProductId || "",
        searchByProductName: params.searchByProductName || "",
        searchByUnit: params.searchByUnit || "",
        sortByCategory: params.sortByCategory || "",
        sortByType: params.sortByType || "",
        sortBySubType: params.sortBySubType || "",
        sortByBarcode: params.sortByBarcode || "",
        sortByProductId: params.sortByProductId || "",
        sortByProductName: params.sortByProductName || "",
        sortByUnit: params.sortByUnit || "",
        sortByQty: params.sortByQty || "",
        sortByTags: params.sortByTags || "",
        sortByNonTags: params.sortByNonTags || "",
      },
    });
    console.log(response.data);
    // return response; // ส่งข้อมูลกลับไปยังที่เรียกใช้
  } catch (error) {
    console.error("Error fetching stock update:", error);
    // throw new Error('Failed to load stock update.');
  }
};

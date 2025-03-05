import axios from 'axios';
import axiosUrl from '../lib/axios'

// ฟังก์ชันที่ใช้ดึงข้อมูล Location จาก API
export const getLocations = async () => {
  try {
    const response = await axiosUrl.get('/Auth/GetLocation');
    // console.log(response.data);
    return response; // ส่งข้อมูลกลับไปยังที่เรียกใช้
  } catch (error) {
    console.error('Error fetching locations:', error);
    // throw new Error('Failed to load locations.');
  }
};


const departments = [
  { id: "it", name: "Information Technology" },
  { id: "finance", name: "Finance" },
  { id: "hr", name: "Human Resources" },
  { id: "operations", name: "Operations" },
  { id: "logistics", name: "Logistics" },
];
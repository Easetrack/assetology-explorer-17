// src/hooks/useLocation.ts
import { useState, useEffect } from 'react';
import { Product }  from '../assetRegister/useStockUpdate'; // นำเข้า Location interface
import { getStockUpdate } from '../assetRegister/useStockUpdate'
import axios from 'axios';

const useLocation = () => {
  const [products, setProducts] = useState<Product[]>([]);  // ใช้ Location[] แทน any[]
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getStockUpdate();
        // setLocations(response.data);  // เมื่อดึงข้อมูลสำเร็จ จะเก็บข้อมูลลงใน locations
        console.log('Location by hook', response)
      } catch (error) {
        setError(error.message || 'An error occurred while fetching locations');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return { products, loading, error };
};

export default useLocation;
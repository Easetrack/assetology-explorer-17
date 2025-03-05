// src/hooks/useLocation.ts
import { useState, useEffect } from 'react';
import { Location } from '../types/Location'; // นำเข้า Location interface
import {getLocations} from '../services/api'
import axios from 'axios';

const useLocation = () => {
  const [locations, setLocations] = useState<Location[]>([]);  // ใช้ Location[] แทน any[]
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getLocations();
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

  return { locations, loading, error };
};

export default useLocation;


import React from "react";
import{ useEffect, useState } from "react";
import axios from "axios";
import AdminUseAuthStore from "../store/adminStore/adminAuthStore";

export default function UseFetchUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token =AdminUseAuthStore((state)=>state.token)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("https://e-commece-vitrine-api.vercel.app/api/Users", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setUsers(res.data.ALL_Users || []);
      } catch (err) {
        setError(err.response?.data?.message || "حدث خطأ أثناء جلب المستخدمين");
      } finally {
        setLoading(false);
      }
    }

 fetchUsers();
  }, [token]);

  return { users,setUsers, loading, error,token};
}

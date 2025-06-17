import React, { useEffect } from "react";
import axios from "axios";
import { products } from "./data/products";

export default function SendProduct() {
  useEffect(() => {
    const sendProducts = async () => {
      for (const product of products) {
        try {
          const response = await axios.post("http://localhost:5000/api/products", product);
          console.log("✔️ Sent:", response.data);
        } catch (error) {
          console.error("❌ Error sending product:", error);
        }
      }
    };

    sendProducts();
  }, []);

  return null; 
}
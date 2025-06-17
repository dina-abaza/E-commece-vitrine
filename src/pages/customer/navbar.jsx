import React from "react";
import HeadNav from "../../components/customer/headNav";
import SearchNav from "../../components/customer/searchNav";
import CategoryNav from "../../components/customer/categoryNav";
import ServiceIntoNav from "../../components/customer/serviceIntoNav";

export default function NavBar(){
    return(
       <div className=" w-full flex flex-col z-50">
      <HeadNav />
      <SearchNav />
      <CategoryNav/>
      <ServiceIntoNav/>
    </div>
    )
}
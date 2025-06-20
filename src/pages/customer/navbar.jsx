import React from "react";
import HeadNav from "../../components/customer/headNav";
import SearchNav from "../../components/customer/searchNav";
import ServiceIntoNav from "../../components/customer/serviceIntoNav";

export default function NavBar(){
    return(
       <div className=" w-full flex flex-col z-50">
      <HeadNav />
      <SearchNav />
      <ServiceIntoNav/>
    </div>
    )
}
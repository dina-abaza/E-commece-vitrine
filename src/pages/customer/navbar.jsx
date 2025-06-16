import React from "react";
import HeadNav from "../../components/headNav";
import SearchNav from "../../components/searchNav";
import CategoryNav from "../../components/categoryNav";
import ServiceIntoNav from "../../components/serviceIntoNav";

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
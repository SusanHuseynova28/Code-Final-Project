"use client"
import BagCategories from "../_components/BagCategories"
import Header from "../_featured/header"
import Footer from "../_featured/footer"
import FilterComponent from "../_components/FilterComponent"
export default function DrowerFilter(){
    return(
        <div>
        <Header/> 
        <BagCategories/>
        <FilterComponent/>
        <Footer/>
        </div>
    )
}
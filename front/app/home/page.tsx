"use client"
import Footer from "../_featured/footer"
import Header from "../_featured/header"
import Swipper from "../components/SwipperCollection"
import ProductCategories from "../components/ProductCategories"
import BagCollection from "../components/BagCollection"
export default function Home() {
    return(
        <>
        <Header/>
        <Swipper/>
        <ProductCategories/>
        <BagCollection/>
        <Footer/>
        </>
    )
}
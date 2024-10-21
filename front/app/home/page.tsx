"use client"
import Footer from "../_featured/footer"
import Header from "../_featured/header"
import Swipper from "../components/SwipperCollection"
import ProductCategories from "../components/ProductCategories"
import BagCollection from "../components/BagCollection"
import ReviewSlider from "../components/ReviewSlider"
import ProductList from "../components/ProductList"

export default function Home() {
    return(
        <>
        <Header/>
      
        <Swipper/>
        <ProductCategories/>
        <ProductList/>
        <BagCollection/>
        <ReviewSlider/>
        <Footer/>
        </>
    )
}
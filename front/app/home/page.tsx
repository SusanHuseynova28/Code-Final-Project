"use client"
import Footer from "../_featured/footer"
import Header from "../_featured/header"
import Swipper from "../components/SwipperCollection"
import ProductCategories from "../components/ProductCategories"
import BagCollection from "../components/BagCollection"
import ReviewSlider from "../components/ReviewSlider"
export default function Home() {
    return(
        <>
        <Header/>
        <Swipper/>
        <ProductCategories/>
        <BagCollection/>
        <ReviewSlider/>
        <Footer/>
        </>
    )
}
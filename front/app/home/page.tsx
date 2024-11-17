"use client"
import Footer from "../_featured/footer"
import Header from "../_featured/header"
import Swipper from "../_components/SwipperCollection"
import ProductCategories from "../_components/ProductCategories"
import BagCollection from "../_components/BagCollection"
import ReviewSlider from "../_components/ReviewSlider"
import ProductList from "../_components/ProductList"
import NewArrivals from "../_components/NewArrivals"
import LatestNews from "../_components/LatestNews"
import Modal from "../_components/Modal"


export default function Home() {
    return(
        <>
        <Header/>
        <Modal/>
        <Swipper/>
        <ProductCategories/>
        <ProductList/>
        <BagCollection/>
        <NewArrivals/>
        <ReviewSlider/>
        <LatestNews/>
        <Footer/>
        </>
    )
}
"use client"
import React from "react"
import BlogList from "../_components/BlogList"
import Header from "../_featured/header"
import Footer from "../_featured/footer"
export default function BlogListPage(){
    return(
        <div>
        <Header/>
        <BlogList/>
        <Footer/>
        </div>
    )
}
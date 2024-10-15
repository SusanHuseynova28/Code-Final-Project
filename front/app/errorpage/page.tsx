"use client"
import Link from 'next/link';
import Layout from '../_featured/layout/layout';

export default function ErrorPage() {
    return (
        <Layout>
           <div className="flex flex-col items-center justify-center mt-24 bg-white">
      <h1 className="text-9xl font-bold text-orange-400">404</h1>
      <h2 className="mt-4 text-4xl font-semibold text-gray-800">OOPS! NOTHING WAS FOUND</h2>
      <p className=" text-xl text-gray-500 text-center max-w-md mt-4">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. 
        <Link href="/" className="text-orange-400 hover:underline ml-1">Return to homepage</Link>
      </p>
      
      
    </div>
        </Layout>
    );
}
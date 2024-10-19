"use client"
export default function ProductCategories() {
    return (
      <div className="flex  justify-center flex-row gap-8 p-16 mt-10 ">
        {/* Handbags Section */}
        <div className="relative group w-full md:w-1/2 overflow-hidden">
          <img
            src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/banner1.jpg?v=1652511176"
            alt="Handbags"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0  flex flex-col items-center justify-center">
            <h2 className="text-white text-5xl font-semibold  mb-14">HANDBAGS</h2>
            <button className="px-6 py-3 bg-white text-black  hover:bg-black hover:text-white">
              SHOP NOW
            </button>
          </div>
        </div>
  
        {/* Travel Section */}
        <div className="relative group w-full md:w-1/2 overflow-hidden">
          <img
            src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/banner2.jpg?v=1652511339"
            alt="Travel"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0  flex flex-col items-center justify-center">
            <h2 className="text-white text-5xl font-bold mt-4">TRAVEL</h2>
            <button className="px-6 py-3 bg-white text-black  hover:bg-black hover:text-white mt-14">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    );
  }
  
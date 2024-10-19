"use client";
export default function BagCollection() {
  return (
    <div className="flex h-screen max-w-[1400px] items-center justify-between mx-auto">
      {/* Left side: Image */}
      <div className="w-1/2 h-full">
        <img
          src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/banner3.jpg?v=1652513266"
          alt="Bag Collection"
          className="h-[780px] w-full object-cover"
        />
      </div>

      {/* Right side: Content */}
      <div className="w-1/2 h-[780px] p-16 flex flex-col justify-center bg-[#fdf3e6] mt-12">
        <p className="text-xs tracking-widest text-center text-customBackground uppercase ">
          New Arrival
        </p>
        <h1 className="text-5xl font-semibold text-center  leading-tight mt-4">
          New bag collection
        </h1>
        <p className="text-sm text-[#6d7178] mt-4 text-center font-bold">
          We have a collection of the most luxurious 
        </p>
        <p className="text-center text-sm text-[#6d7178] font-bold mt-2">leather bag models to suit
        everyone.</p>
        <button className="mt-8 px-6 py-4 w-[130px] font-semibold text-xs mx-auto bg-black text-white uppercase  hover:bg-gray-800 transition-all">
          Shop Now
        </button>
      </div>
    </div>
  );
}

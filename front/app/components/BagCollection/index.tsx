"use client";
export default function BagCollection() {
  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen max-w-[1400px] items-center justify-between mx-auto">
      {/* Şəkil Bölməsi */}
      <div className="w-full md:w-1/2 h-64 md:h-screen">
        <img
          src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/banner3.jpg?v=1652513266"
          alt="Bag Collection"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Məzmun Bölməsi */}
      <div className="w-full md:w-1/2 h-64 md:h-screen bg-[#fdf3e6] p-8 md:p-16 flex flex-col justify-center mt-6 md:mt-0">
        <p className="text-xs tracking-widest text-center text-customBackground uppercase">
          New Arrival
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold text-center leading-tight mt-4">
          New bag collection
        </h1>
        <p className="text-sm text-[#6d7178] mt-4 text-center font-bold">
          We have a collection of the most luxurious
        </p>
        <p className="text-sm text-[#6d7178] font-bold mt-2 text-center">
          leather bag models to suit everyone.
        </p>
        <button className="mt-6 md:mt-8 px-4 py-4 w-[150px] mx-auto bg-black text-white uppercase text-xs font-semibold hover:bg-gray-800 transition-all">
          Shop Now
        </button>
      </div>
    </div>
  );
}

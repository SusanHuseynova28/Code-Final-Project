import React from "react";
import { CgChevronDown } from "react-icons/cg";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import Footer from "@/app/_featured/footer";

interface ProductCards {
  id: number;
  title: string;
  description: string;
  price: string;
  oldPrice?: string;
  image: string;
}

const productCards: ProductCards[] = [
  {
    id: 1,
    title: "Widewell Multi Osscure",
    description:
      "Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec vehicula, eros quam gravida nis. Being able to read a novel in another language and understand it is a huge achievement. You’ll feel accomplished the moment you read that final page, close the book, and reflect on the experience. You might find yourself at the last page faster than you thought—once you...",
    price: "$79.00",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/1_f025fcc5-2044-4c07-b5d5-79a0d1bdad5b.jpg?v=1652239109",
  },
  {
    id: 2,
    title: "Wicendadia Beige foncé",
    description:
      "Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec vehicula, eros quam gravida nis. Being able to read a novel in another language and understand it is a huge achievement. You’ll feel accomplished the moment you read that final page, close the book, and reflect on the experience. You might find yourself at the last page faster than you thought—once you...",
    price: "$149.00",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/1_d9e2f50d-a69a-4084-96a5-03ac9bf525f6.jpg?v=1652240628",
  },
  {
    id: 3,
    title: "Wawiellx Osseuse Femme",
    oldPrice: "$350.00",
    price: "$299.00",
    description:
      "Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec vehicula, eros quam gravida nis. Being able to read a novel in another language and understand it is a huge achievement. You’ll feel accomplished the moment you read that final page, close the book, and reflect on the experience. You might find yourself at the last page faster than you thought—once you...",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/1_ec9081ff-be9d-44be-b8df-297f1541ba17.jpg?v=1652239382",
  },
  {
    id: 4,
    title: "Sac Fourre-Tout Pinkax",
    description:
      "Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec vehicula, eros quam gravida nis. Being able to read a novel in another language and understand it is a huge achievement. You’ll feel accomplished the moment you read that final page, close the book, and reflect on the experience. You might find yourself at the last page faster than you thought—once you...",
    price: "$59.00",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/1.jpg?v=1652237121",
  },
  {
    id: 5,
    title: "Sac Fourre-Tout Perimma",
    oldPrice: "$150.00",
    price: "$120.00",
    description:
      "Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec vehicula, eros quam gravida nis. Being able to read a novel in another language and understand it is a huge achievement. You’ll feel accomplished the moment you read that final page, close the book, and reflect on the experience. You might find yourself at the last page faster than you thought—once you...",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/1_a10bb414-3375-4fb7-849e-c3de2600ad73.jpg?v=1652237638",
  },
  {
    id: 6,
    title: "Sac fourre-tout Legoirii",
    description:
      "Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec vehicula, eros quam gravida nis. Being able to read a novel in another language and understand it is a huge achievement. You’ll feel accomplished the moment you read that final page, close the book, and reflect on the experience. You might find yourself at the last page faster than you thought—once you...",
    price: "$100.00",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/1_a7c80a60-b9a7-4738-af1b-5631a0543d74.jpg?v=1652237192",
  },
  {
    id: 7,
    title: "Retro Pink Backpack",
    description:
      "Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec vehicula, eros quam gravida nis. Being able to read a novel in another language and understand it is a huge achievement. You’ll feel accomplished the moment you read that final page, close the book, and reflect on the experience. You might find yourself at the last page faster than you thought—once you...",
    price: "$129.00",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/1_125859c0-52a3-488c-8fad-2733af987424.jpg?v=1652239067",
  },
  {
    id: 8,
    title: "Puff Sleeve Sweater",
    description:
      "Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec vehicula, eros quam gravida nis. Being able to read a novel in another language and understand it is a huge achievement. You’ll feel accomplished the moment you read that final page, close the book, and reflect on the experience. You might find yourself at the last page faster than you thought—once you...",
    price: "$150.00",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/1_489e6c45-7622-43c5-bd50-20c70a3be0a1.jpg?v=1652237713",
  },
  {
    id: 9,
    title: "Perimma Rose Clair",
    oldPrice: "$220.00",
    price: "$189.00",
    description:
      "Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec vehicula, eros quam gravida nis. Being able to read a novel in another language and understand it is a huge achievement. You’ll feel accomplished the moment you read that final page, close the book, and reflect on the experience. You might find yourself at the last page faster than you thought—once you...",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/1_1dd2b034-0fd7-4594-a9db-c5dd4fcc27de.jpg?v=1652239033",
  },
  {
    id: 10,
    title: "Perimma Noir Femme",
    description:
      "Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec vehicula, eros quam gravida nis. Being able to read a novel in another language and understand it is a huge achievement. You’ll feel accomplished the moment you read that final page, close the book, and reflect on the experience. You might find yourself at the last page faster than you thought—once you...",
    oldPrice: "$159.00",
    price: "$119.00",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/1_d37027ea-27f4-42e5-86c1-db222de63b78.jpg?v=1652239165",
  },
  {
    id: 11,
    title: "Legoirii Noir Synthetic",
    description:
      "Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec vehicula, eros quam gravida nis. Being able to read a novel in another language and understand it is a huge achievement. You’ll feel accomplished the moment you read that final page, close the book, and reflect on the experience. You might find yourself at the last page faster than you thought—once you...",
    price: "$159.00",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/1_7e02a35c-2ff0-4697-acdd-7906a0b471b2.jpg?v=1652239269",
  },
  {
    id: 12,
    title: "Karitas Autre beige",
    description:
      "Nullam sagittis. Vivamus laoreet. Vestibulum rutrum, mi nec vehicula, eros quam gravida nis. Being able to read a novel in another language and understand it is a huge achievement. You’ll feel accomplished the moment you read that final page, close the book, and reflect on the experience. You might find yourself at the last page faster than you thought—once you...",
    price: "$199.00",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/products/1_c2996215-b635-4ae4-9b18-f2b411d28c2e.jpg?v=1652238948",
  },
];

export default function ProductCardsList() {
  const CustomBagIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 297.78668 398.66666"
      className={`w-6 h-6 ${className}`}
      fill="currentColor"
    >
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,398.66667)">
        <g transform="scale(0.1)">
          <path d="M 2233.36,2432.71 H 0 V 0 h 2233.36 v 2432.71 z m -220,-220 V 220 H 220.004 V 2212.71 H 2021.36" />
          <path d="m 1116.68,2990 v 0 C 755.461,2990 462.637,2697.18 462.637,2335.96 V 2216.92 H 1770.71 v 119.04 c 0,361.22 -292.82,654.04 -654.03,654.04 z" />
          <path d="M 1554.82,1888.17 H 678.543 v 169.54 h 876.277 v -169.54" />
        </g>
      </g>
    </svg>
  );
  return (
    <>
      <div className="p-8 w-full mx-6 mt-6">
        <div className="flex justify-between items-center mb-8">
          <button className="flex items-center px-6 py-2 hover:text-white hover:border-customBackground hover:bg-customBackground gap-2  border-black border-2 text-gray-600  transition">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-4 0 393 393.99003"
                width="393pt"
                className="w-[20px] hover:text-white"
              >
                <path d="m368.3125 0h-351.261719c-6.195312-.0117188-11.875 3.449219-14.707031 8.960938-2.871094 5.585937-2.3671875 12.3125 1.300781 17.414062l128.6875 181.28125c.042969.0625.089844.121094.132813.183594 4.675781 6.3125 7.203125 13.957031 7.21875 21.816406v147.796875c-.027344 4.378906 1.691406 8.582031 4.777344 11.6875 3.085937 3.105469 7.28125 4.847656 11.65625 4.847656 2.226562 0 4.425781-.445312 6.480468-1.296875l72.3125-27.574218c6.480469-1.976563 10.78125-8.089844 10.78125-15.453126v-120.007812c.011719-7.855469 2.542969-15.503906 7.214844-21.816406.042969-.0625.089844-.121094.132812-.183594l128.683594-181.289062c3.667969-5.097657 4.171875-11.820313 1.300782-17.40625-2.832032-5.511719-8.511719-8.9726568-14.710938-8.960938zm-131.53125 195.992188c-7.1875 9.753906-11.074219 21.546874-11.097656 33.664062v117.578125l-66 25.164063v-142.742188c-.023438-12.117188-3.910156-23.910156-11.101563-33.664062l-124.933593-175.992188h338.070312zm0 0"></path>
              </svg>
            </div>
            <span>Filter</span>
          </button>
          <div className="flex items-center pr-[23rem]">
            <div className="flex">
              <div className="text-hovercolor3 underline">Default sorting</div>
              <p className="mt-1">
                <CgChevronDown />
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-10 w-full pr-24 mt-14">
          {productCards.map((card) => (
            <div
              key={card.id}
              className="flex items-start space-x-6 border-b pb-10"
            >
              <div className="relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-[450px] h-[450px] object-cover"
                />
                {card.oldPrice && (
                  <div className="absolute top-3 right-0 bg-custombutton text-white px-3 py-1 text-xs font-bold trapezoid">
                    SALE
                  </div>
                )}
              </div>

              <div className="flex-1 pl-10">
                <h3 className="text-2xl font-[25px] text-gray-800 hover:text-customBackground">
                  {card.title}
                </h3>
                <div className="mt-4 flex items-center space-x-3">
                  {card.oldPrice && (
                    <span className="text-gray-500 line-through">
                      {card.oldPrice}
                    </span>
                  )}
                  <span className="text-xl text-hovercolor3">{card.price}</span>
                </div>
                <p className="text-black mt-3 text-sm">{card.description}</p>

                <div className="mt-6 flex space-x-4">
                  <button className="w-10 text-2xl sm:w-12 h-10 sm:h-12 bg-white hover:bg-customBackground flex items-center justify-center shadow-md">
                    <AiOutlineHeart className="text-black hover:text-white transition-colors duration-300" />
                  </button>

                  <button className="w-10 sm:w-12 h-10 sm:h-12 bg-white hover:bg-customBackground flex items-center justify-center shadow-md">
                    <CustomBagIcon className="w-5 sm:w-6 h-5 sm:h-6 text-black hover:text-white transition-colors duration-300" />
                  </button>

                  <button className="w-10 sm:w-12 h-10 sm:h-12 bg-white hover:bg-customBackground flex items-center justify-center shadow-md">
                    <IoSearchOutline className="w-5 sm:w-6 h-5 sm:h-6 text-black hover:text-white transition-colors duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-20 space-x-2">
          <button className="w-10 h-10 border bg-customBackground text-white">
            1
          </button>
          <button className="w-10 h-10 border bg-white hover:bg-customBackground hover:text-white text-gray-800">
            2
          </button>
          <button className="w-10 h-10 border bg-white hover:bg-customBackground hover:text-white text-gray-800">
            &gt;
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

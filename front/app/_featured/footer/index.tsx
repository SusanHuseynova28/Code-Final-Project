import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-12 border-t">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-lg p-6 md:p-16">
        <div className="col-span-1">
          <img
            src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/logo_black_fe0a005c-0be5-4fa7-92a6-da3bf8b55186.png?v=1652231536"
            alt="Company Logo"
            className="w-[150px] mx-auto md:mx-0"
          />
          <p className="text-sm text-[#6d7178] mt-8 text-center md:text-left">
            121 King Street, Collins Melbourne
          </p>
          <p className="text-sm text-[#6d7178] text-center md:text-left">
            West Victoria 8007, Australia
          </p>

          <div className="mt-8 flex flex-col md:flex-row text-sm text-[#6d7178] items-center md:items-start">
            <p>Phone:</p>
            <Link
              href="tel:+0123456789"
              className="ml-1 text-black hover:text-[#cea384]"
            >
              (+01) 234-567-89
            </Link>
          </div>

          <div className="text-[#6d7178] flex flex-col md:flex-row text-sm mt-2 items-center md:items-start">
            <p>Email:</p>
            <Link
              href="mailto:support@mycompany.com"
              className="ml-1 text-black hover:text-[#cea384]"
            >
              support@mycompany.com
            </Link>
          </div>
        </div>

        <div className="col-span-1 pl-0 md:pl-14 text-center md:text-left">
          <h3 className="font-semibold mb-4 text-lg">Custom Service</h3>
          <ul className="flex flex-col gap-3 mt-6">
            <li className="text-sm text-[#6d7178] hover:text-[#cea384]">
              <Link href="#">Shipping info</Link>
            </li>
            <li className="text-sm text-[#6d7178] hover:text-[#cea384]">
              <Link href="#">Refunds & returns</Link>
            </li>
            <li className="text-sm text-[#6d7178] hover:text-[#cea384]">
              <Link href="#">Terms & conditions</Link>
            </li>
            <li className="text-sm text-[#6d7178] hover:text-[#cea384]">
              <Link href="#">My account</Link>
            </li>
          </ul>
        </div>

        <div className="col-span-1 pl-0 md:pl-10 text-center md:text-left">
          <h3 className="font-bold mb-4 text-lg">Information</h3>
          <ul className="flex flex-col gap-3 mt-6">
            <li className="text-sm text-[#6d7178] hover:text-[#cea384]">
              <Link href="#">Our blog</Link>
            </li>
            <li className="text-sm text-[#6d7178] hover:text-[#cea384]">
              <Link href="#">About Us</Link>
            </li>
            <li className="text-sm text-[#6d7178] hover:text-[#cea384]">
              <Link href="#">Contact Us</Link>
            </li>
            <li className="text-sm text-[#6d7178] hover:text-[#cea384]">
              <Link href="#">FAQs</Link>
            </li>
          </ul>
        </div>

        <div className="col-span-1 text-center md:text-left">
          <h3 className="font-bold mb-4 text-lg">About Us</h3>
          <ul className="flex flex-col gap-3 mt-6">
            <li className="text-sm text-[#6d7178] hover:text-[#cea384]">
              <Link href="#">Who We Are?</Link>
            </li>
            <li className="text-sm text-[#6d7178] hover:text-[#cea384]">
              <Link href="#">Corporate Responsibility</Link>
            </li>
            <li className="text-sm text-[#6d7178] hover:text-[#cea384]">
              <Link href="#">California Laws</Link>
            </li>
            <li className="text-sm text-[#6d7178] hover:text-[#cea384]">
              <Link href="#">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto text-center border-t flex flex-col md:flex-row justify-between px-6 md:px-14 py-4 mt-6">
        <p className="text-gray-500">
          &copy; Copyright 2022 | Mikadu By ShopiLaunch. Powered by Shopify.
        </p>
        <div className="flex justify-center mt-4 md:mt-0">
          <img
            src="https://mikadu-store-demo.myshopify.com/cdn/shop/files/payment.png?v=1652319594"
            alt="Payment Methods"
            className="w-[150px] md:w-auto"
          />
        </div>
      </div>
    </footer>
  );
}

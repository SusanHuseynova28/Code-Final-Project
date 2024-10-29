"use client";

import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How long does it take for home delivery?",
    answer:
      "We use Royal mail and DHL to send most of our UK orders. Euro Car Parts reserves the right to use discretion in any circumstance where it makes more sense to use an alternative delivery method.",
  },
  {
    question: "What courier do you use for deliveries?",
    answer: "We use multiple courier services including DHL and UPS.",
  },
  {
    question:
      "Why am I being charged for delivery on my order when it states standard delivery is free?",
    answer:
      "All our delivery charges are pre-set by our courier company. We sell some oversized items which require a specialist courier company to fulfil the delivery, there is an additional charge for these. Also, our courier company consider some surcharge postcodes ‘Out of area’. There is an additional charge for these also. You can find a list of all [oversized items here] You can find a list of all",
  },
  {
    question: "I haven’t received a dispatch email/email confirmation?",
    answer:
      "Please be aware an automated email is sent to you to the given email address when your order is dispatched. Please check all folders including you junk as it will come from a noreply email address. To ensure emails reach you, add the domain eurocarparts.com to your safe senders list.",
  },
  {
    question:
      "Why does it not tell us on the website that the parts will be delivered by the branch?",
    answer:
      "Due to the delicacy of some parts we take extra care in the delivery of the item. These could include body panels and large bulky items. These are either available for collection from our branches or will be delivered to you through our branch network vehicles.",
  },
  {
    question: "Can I collect from a local store?",
    answer:
      "We offer a reserve and collect service. This is available on the checkout page. Please be aware, if the product is not available in a local store, you are unable to reserve it.",
  },
  {
    question: "Do you deliver on Weekend?",
    answer:
      "No, our courier company do not offer the service to deliver on weekends currently.",
  },
  {
    question: "Can you confirm you have received my return?",
    answer:
      "We aim to process returns within 5-7 working days of receiving them. You will be notified by email once the return is complete.We suggest you make a note of the shipping reference given when you sent the item back. This will allow you to track your parcel at every stage of delivery, including when we receive it.Should you have any queries about your return, please feel free to contact our Customer Service team via email",
  },
  {
    question: "How long will it be before I get a refund?",
    answer:
      "Once we receive your item(s) back, our returns department will inspect and restock the goods. Once our returns department have done this, an automated refund is generated on our system. Your outstanding refund is then processed by our accounts department back to your original payment method. This process typically takes 5-7 working days. When returning your products please remember to include your original invoice, without this it may delay your refund.",
  },
  {
    question: "Who pays for return postage?",
    answer:
      "If you are returning an unsuitable item for a refund we will refund the cost of the item only and not the original delivery cost.Should you be returning a faulty item for a refund we will refund both the original shipping costs and the return delivery costs.",
  },
  {
    question: "Why have you not refunded the original delivery charge?",
    answer:
      "If you are returning an unsuitable item for a refund we will refund the cost of the item only and not the original delivery cost. Should you be returning a faulty item for a refund we will refund both the original shipping costs and the return delivery costs.",
  },
  {
    question: "Do you offer a VAT discount to non-EU customers?",
    answer:
      "Customer’s ordering from outside the European Union can contact us via telephone, live chat, or e-mail and quote the order reference number. Our customer services team will go through the process to remove the VAT off of their order.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div
        className="text-center bg-cover bg-center h-[420px]"
        style={{
          backgroundImage:
            "url(https://mikadu-store-demo.myshopify.com/cdn/shop/files/bn2.4.png?v=1653469323)",
        }}
      >
        <div className="py-10">
          <h2 className="text-[45px] font-[40px] text-white mt-24">FAQ</h2>
          <div className="bread-crumb text-white text-lg mt-2 flex items-center gap-1 justify-center">
            <Link href="/" passHref legacyBehavior>
              <a className="hover:text-customBackground text-md">Home</a>
            </Link>
            <IoChevronForward className="text-white text-md" />
            <p>FAQ</p>
          </div>
        </div>
      </div>

      <div className="max-w-10xl  p-16">
        <h1 className="text-4xl font-[40px] text-gray-800 mb-4">
          #Frequently Asked Questions
        </h1>
        <p className="max-w-8xl mt-3">
          I am text block. Click edit button to change this text. Lorem ipsum
          dolor sit amet,consectetur adipiscing elit. Ut elit tellus, luctus nec
          ullamcorper mattis, pulvinar dapibus leo.
        </p>
        <div className="border-t border-gray-300 mt-10">
          {faqs.map((faq, index) => (
            <div key={index} className="">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center space-x-4 py-4 focus:outline-none"
              >
                <span className="text-xl text-black">
                  {openIndex === index ? "−" : "+"}
                </span>
                <span className="text-lg font-medium text-black flex-grow text-left">
                  {faq.question}
                </span>
              </button>
              {openIndex === index && (
                <div className=" pb-4 text-black animate-slide-down max-w-[1600px]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="border w-full"></div>

      <h2 className="text-2xl md:text-3xl font-[40px] mt-24 max-w-[800px]  mx-auto">
        Never miss our updates about new arrivals and special
      </h2>
      <p className="text-center text-3xl font-[40px]">offers</p>
      <p className="text-gray-600 mt-4 text-center">
        Get the latest news & updates
      </p>
      <form className="w-full max-w-3xl mt-16 mx-auto">
        <input
          id="email"
          type="email"
          placeholder="EMAIL ADRESS"
          required
          className="w-full px-3 py-2  text-black text-xs border-b-2 border-gray-300 focus:outline-none focus:border-gray-500 mb-6"
        />
        <button
          type="submit"
          className="w-full bg-[#cea384] hover:bg-black  text-white font-semibold py-4 px-4  transition"
        >
          SUBSCRIBE NOW
        </button>
      </form>
    </>
  );
}

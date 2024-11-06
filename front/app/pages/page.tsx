import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
     <h1 className="font-bold text-4xl">Stripe Payment</h1>
     
     <a href="https://buy.stripe.com/test_cN26ow2U31pP44EeUU"
     className="bg-customBackground  text-white font-bold py-4 px-8 rounded">Buy Now</a>
    </main>
  );
}
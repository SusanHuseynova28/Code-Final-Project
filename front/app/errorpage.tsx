import Link from 'next/link';
import Layout from './_featured/layout/layout';

export default function ErrorPage() {
    return (
        <Layout>
            <div className="w-full h-[4rem] bg-custombgclr mt-[4.7rem] md:mt-[7.5rem] text-customText py-3 px-14 flex items-center justify-start">
                <p className="text-sm md:text-base font-medium space-x-4">
                    <span className="font-serif italic hover:text-customHover transition duration-300 cursor-pointer">
                        Free shipping for orders over €75,-
                    </span>
                    <span className="font-serif italic hover:text-customHover transition duration-300 cursor-pointer">
                        30 days PLNTs health guarantee
                    </span>
                    <span className="font-serif italic hover:text-customHover transition duration-300 cursor-pointer">
                        4.5/5 out of 20,800+ reviews
                    </span>
                </p>
            </div>
            <div className="min-h-[130vh] flex flex-col md:flex-row">
                <div className="w-full md:w-11/20 bg-[#134A21] flex flex-col items-start justify-center text-white p-8 md:pl-20 h-full">
                    <h1 className="text-[45px] leading-[45px] md:text-[75px] md:leading-[75px] xl:text-[116px] xl:leading-[112px] text-primary-foreground font-victor-serif relative z-20 w-full lg:mb-10 lg:pt-40">
                        Oops! Nothing growing here...
                    </h1>
                    <p className="text-2xl text-primary-foreground font-victor-serif md:text-5xl">Page not found</p>
                    <p className="mt-4 md:text-base max-w-[22rem] leading-relaxed">
                        Unfortunately the page you are looking for could not be found. It may be temporarily unavailable, moved or no longer exist.
                    </p>
                    <Link href="/" className="mt-6 mb-36 px-6 py-3 border border-white text-white bg-[#134A21] hover:bg-[#DEBE48] transition rounded-3xl">
                        Go to the homepage
                    </Link>
                </div>

                <div className="w-full md:w-9/20 flex items-center">
                    <img
                        src="https://plnts.com/_next/image?url=%2F404.jpg&w=750&q=75"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </Layout>
    );
}
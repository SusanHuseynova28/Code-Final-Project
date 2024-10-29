import React from "react";

export default function ScrollAnimatedSection() {
  return (
    <div
      className="bg-cover bg-center w-full h-[500px] flex items-center"
      style={{
        backgroundImage:
          "url(//mikadu-store-demo.myshopify.com/cdn/shop/files/about3.jpg?v=1652762316)",
      }}
    >
      <div className="container mx-auto grid md:grid-cols-3 gap-10">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <span className="w-20 h-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 431.184 431.184"
                fill="white"
              >
                <path d="M383.592,0c-17.648,0-32,14.352-32,32c-17.648,0-32,14.352-32,32c-17.648,0-32,14.352-32,32c-17.648,0-32,14.352-32,32 c0,5.92,1.72,11.392,4.536,16.152l-10.712,10.712c-7.08-11.28-19.544-18.864-33.824-18.864c-14.28,0-26.744,7.584-33.824,18.872 l-10.712-10.712c2.816-4.768,4.536-10.24,4.536-16.16c0-17.648-14.352-32-32-32c0-17.648-14.352-32-32-32 c0-17.648-14.352-32-32-32c0-17.648-14.352-32-32-32s-32,14.352-32,32s14.352,32,32,32c0,17.648,14.352,32,32,32 c0,17.648,14.352,32,32,32c0,17.648,14.352,32,32,32c5.92,0,11.392-1.72,16.152-4.536l16.28,16.28 c-0.152,1.416-0.432,2.8-0.432,4.256c0,19.312,13.768,35.472,32,39.192v19.28v8.8l-73.856,40.624 c-1.608,0.888-2.84,2.224-3.664,3.784c-1.576,1.68-2.48,3.896-2.48,6.272v84.12c0,2.376,0.904,4.592,2.48,6.272 c0.824,1.56,2.056,2.896,3.664,3.784l76.256,41.944c1.368,0.744,2.88,1.112,4.4,1.112c0.408,0,0.808-0.104,1.216-0.16 c0.392,0.048,0.784,0.16,1.184,0.16c1.52,0,3.056-0.368,4.44-1.128l76.224-41.92c1.608-0.888,2.84-2.224,3.664-3.784 c1.576-1.68,2.48-3.896,2.48-6.272v-84.136c0-2.376-0.904-4.592-2.48-6.272c-0.824-1.56-2.056-2.896-3.672-3.784l-73.856-40.616 v-8.8v-19.28c18.232-3.72,32-19.872,32-39.192c0-1.456-0.28-2.84-0.432-4.256l16.28-16.28c4.76,2.816,10.232,4.536,16.152,4.536 c17.648,0,32-14.352,32-32c17.648,0,32-14.352,32-32c17.648,0,32-14.352,32-32c17.648,0,32-14.352,32-32S401.24,0,383.592,0z" />
              </svg>
            </span>
          </div>
          <h4 className="text-xl font-semibold mb-2 text-white">Design</h4>
          <p className="text-gray-300">
            Praesent metus tellus, elementum eu, semper Vestibulum volutpat
            pretium libero
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <span className="w-20 h-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0z" />
              </svg>
            </span>
          </div>
          <h4 className="text-xl font-semibold mb-2 text-white">Innovation</h4>
          <p className="text-gray-300">
            Praesent metus tellus, elementum eu, semper Vestibulum volutpat
            pretium libero
          </p>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <span className="w-20 h-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="white"
              >
                <path d="M256 0C114.616 0 0 114.616 0 256s114.616 256 256 256 256-114.616 256-256S397.384 0 256 0zm0 482C132.288 482 30 379.712 30 256S132.288 30 256 30s226 102.288 226 226-102.288 226-226 226z" />
              </svg>
            </span>
          </div>
          <h4 className="text-xl font-semibold mb-2 text-white">Journey</h4>
          <p className="text-gray-300">
            Praesent metus tellus, elementum eu, semper Vestibulum volutpat
            pretium libero
          </p>
        </div>
      </div>
    </div>
  );
}

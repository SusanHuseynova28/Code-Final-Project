// components/ReviewSlider/index.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const reviews = [
  {
    name: 'Jonh Mery',
    text: [
      '"Wonderful communication and your company even sent a generous',
      'amount of samples to me, making my decision to spend...',
    ],
    title: 'Amazing Piece Of History',
    image: 'https://mikadu-store-demo.myshopify.com/cdn/shop/files/avata1.jpg?v=1652514315',
  },
  {
    name: 'Annette Black',
    text: [
      '"Wonderful communication and your company even sent a generous',
      'amount of samples to me, making my decision to spend...',
    ],
    title: 'Amazing Piece Of History',
    image: 'https://mikadu-store-demo.myshopify.com/cdn/shop/files/avata2.jpg?v=1652514330',
  },
  {
    name: 'Alice Johnson',
    text: [
      '"Wonderful communication and your company even sent a generous',
      'amount of samples to me, making my decision to spend...',
    ],
    title: 'Top-notch Service',
    image: 'https://mikadu-store-demo.myshopify.com/cdn/shop/files/avata3.jpg?v=1652514347',
  },
];

export default function ReviewSlider() {
  return (
    <div className="w-full max-w-8xl mx-auto px-6 py-16">
      <div className="flex flex-col">
        <h2 className="text-center text-4xl font-bold mt-14">Customer Reviews</h2>
        <p className="text-center text-texthovercolor mt-4 text-sm">
          Apparently we had reached a great height in the atmosphere, for the sky was a dead black and there a stars.
        </p>
      </div>
      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        modules={[Pagination]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
        pagination={{ clickable: true }}
        grabCursor={true}
        loop={true}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col justify-between p-16 border bg-white mt-14 h-full min-h-[380px] w-full">
              <div>
                <div className="flex justify-center">
                  <span className="text-yellow-500 text-2xl">★★★★★</span>
                </div>
                <h3 className="text-lg font-semibold text-center mt-4">
                  "{review.title}"
                </h3>
                <div className="text-center mt-4 space-y-2 text-hovercolor3">
                  {review.text.map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center flex-col mt-6">
                <div className="w-20 h-20 rounded-full border-2 border-customBackground flex items-center justify-center">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <span className="text-lg font-medium mt-4">{review.name}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

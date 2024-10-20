// components/ReviewSlider.js
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCore, { Pagination, Autoplay } from 'swiper';

// Swiper modullarını aktivləşdiririk
SwiperCore.use([Pagination, Autoplay]);

const reviews = [
  {
    name: 'Jonh Mery',
    text: 'Wonderful communication and your company even sent a generous amount of samples to me, making my decision to spend...',
    title: 'Amazing Piece Of History',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Annette Black',
    text: 'Wonderful communication and your company even sent a generous amount of samples to me, making my decision to spend...',
    title: 'Amazing Piece Of History',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Alice Johnson',
    text: 'Exceptional quality and outstanding support. Definitely recommend!',
    title: 'Top-notch Service',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

export default function ReviewSlider() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-center text-4xl font-bold mb-12">Customer Reviews</h2>

      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 1 }, // Mobil ekranlar üçün 1 kart
          768: { slidesPerView: 2 }, // Tablet və yuxarı ekranlar üçün 2 kart
        }}
        pagination={{ clickable: true }}
        grabCursor={true} // Kursor tutma effektini aktivləşdiririk
        loop={true} // Sonsuz dövr üçün loop aktiv
        autoplay={{ delay: 5000, disableOnInteraction: false }} // Avtomatik keçid
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="p-8 border rounded-lg shadow-md bg-white">
              <div className="flex justify-center mb-4">
                <span className="text-yellow-400 text-2xl">★★★★★</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">
                "{review.title}"
              </h3>
              <p className="text-gray-600 text-center mb-6">{review.text}</p>
              <div className="flex items-center justify-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full border-2 border-gray-300 mr-4"
                />
                <span className="text-lg font-medium">{review.name}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

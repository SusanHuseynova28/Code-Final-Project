import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Karen Ryan",
    role: "Developer",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/files/ourteam-3-6.jpg?v=1652762896",
  },
  {
    name: "Adriana Stone",
    role: "Ceo",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/files/ourteam-1-1.jpg?v=1652762896",
  },
  {
    name: "Ferguson",
    role: "Designer",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/files/ourteam-2-1.jpg?v=1652762896",
  },
  {
    name: "Saga Noren",
    role: "Developer",
    image:
      "https://mikadu-store-demo.myshopify.com/cdn/shop/files/ourteam-3-1.jpg?v=1652762896",
  },
];

export default function TeamSectionPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12">
      <h2 className="text-5xl mt-10 font-[70px]">Behind The Brands</h2>
      <p className="text-[16px] text-center max-w-[1180px] mt-6">
        We are a female-founded, 100% woman-led team of collaborative dreamers
        who value innovation, curiosity and free-thinking fearlessness in
        everything that we do. We take immeasurable pride in our work,
        intentionally stitching love into the very fiber and fabric of our
        designs. We are small, but we are a mighty group of talented individuals
        dedicated to bringing you otherworldly designs with imagery to match.
      </p>

      <div className="border border-customBackground w-[60px] mx-auto mt-6"></div>

      <div className="w-full mt-8">
        <Swiper
          className="custom-swiper"
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={5} // Aradakı məsafəni azaldır
          slidesPerView={3}
          slidesPerGroup={1}
          centeredSlides={true}
          loop={true}
          initialSlide={2}
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <ProfileCard member={member} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function ProfileCard({ member }: { member: TeamMember }) {
  return (
    <div className="w-[350px] h-[470px] flex flex-col items-center"> 
      <div className="relative w-full h-[400px] overflow-hidden group bg-gray-200">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
          <div className="flex gap-4">
            <IconWrapper>
              <FaFacebookF />
            </IconWrapper>
            <IconWrapper>
              <FaTwitter />
            </IconWrapper>
            <IconWrapper>
              <FaInstagram />
            </IconWrapper>
            <IconWrapper>
              <FaPinterestP />
            </IconWrapper>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <h3 className="text-xl font-[40px]">{member.name}</h3>
        <p className="text-gray-500 mt-2">{member.role}</p>
      </div>
    </div>
  );
}

function IconWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white p-3 hover:bg-customBackground transition-all duration-300">
      <div className="hover:text-white text-gray-400">{children}</div>
    </div>
  );
}

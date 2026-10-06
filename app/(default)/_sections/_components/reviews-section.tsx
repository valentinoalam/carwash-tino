"use client"

import Image from "next/image"
import { Star, ThumbsUp } from "lucide-react"
const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const starColor = i < rating ? 'text-[#309be8]' : 'text-[#aec5d5]';
    const starWeight = i < rating ? 'fill' : 'regular';
    
    // Using a simple SVG for the star icon. You can also use a library like react-icons.
    stars.push(
      <div key={i} className={starColor} data-icon="Star" data-size="20px" data-weight={starWeight}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
          <path
            d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"
          ></path>
        </svg>
      </div>
    );
  }
  return <div className="flex gap-0.5">{stars}</div>;
};

interface Review {
  id: string
  name: string
  rating: number
  date: string
  service: string
  comment: string
  avatar?: string
  helpful: number
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    rating: 5,
    date: "2 weeks ago",
    service: "Premium Wash & Wax",
    comment:
      "Absolutely fantastic service! My car looks brand new. The staff was professional and the attention to detail was incredible. Will definitely be coming back!",
    avatar: "/diverse-woman-avatar.png",
    helpful: 12,
  },
  {
    id: "2",
    name: "Mike Chen",
    rating: 5,
    date: "1 month ago",
    service: "Ceramic Coating",
    comment:
      "Best investment I've made for my car. The ceramic coating has been amazing - water just beads right off. Professional work and great customer service.",
    avatar: "/man-avatar.png",
    helpful: 8,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    rating: 5,
    date: "3 weeks ago",
    service: "Interior Detailing",
    comment:
      "They transformed my car's interior completely! Had coffee stains and pet hair everywhere, now it looks and smells like new. Highly recommend!",
    avatar: "/woman-avatar-2.png",
    helpful: 15,
  },
  {
    id: "4",
    name: "David Thompson",
    rating: 4,
    date: "1 week ago",
    service: "Express Wash",
    comment:
      "Quick and efficient service. Perfect for when you're in a hurry. Good value for money and friendly staff.",
    avatar: "/man-avatar-2.png",
    helpful: 6,
  },
  {
    id: "5",
    name: "Lisa Davis",
    rating: 5,
    date: "2 months ago",
    service: "Complete Detail Package",
    comment:
      "Outstanding experience! My car looks and feels like brand new. The staff was attentive and the prices were very reasonable. Will definitely be coming back!",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBB3juT2SFufvUP45p1y8maz-0fRUAQRq2C_xHrHLb2MHXfz8dEQBH__u8133SdMAnt1Z_bdJ2Z4xkDWjv6pqEX_E5TxJyrMr6xfjqS957e5ajZ1ar3yquOFA6vVOEyecZiKck89T10kkpu92U8AzCJy0NQWNFPN2TXmW-1q5YVA4gC83cIOpU-yV8os5GG3T8g_HutlODI6u0wlvOkq4bJbEtCT9kwKxuyNcUErWnh5JK1BiW74xTXGnia-QrjG2HhhxAl84akRyIj",
    helpful: 20,
  },
  {
    id: "6",
    name: "Alex Johnson",
    rating: 4,
    date: "1 month ago",
    service: "Paint Correction",
    comment:
      "Great service! The paint job was perfect. The staff was friendly and the prices were reasonable. Highly recommend!",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPU5awtp_01wXYBzwHzRAiiocnNFk-2BumhPuSO7NP4rYlRoK0dNDYe-ZrHW5LGk_twt5MFxZXKPDjNO31KP-WFXgr4RilaWNeDnrXZgoNV2kYFzq7bz0KfGfpNZRjXAMixjsVhbh5YfazW4CV-RjKpPyAI4f7orkoSsyrkSZl697IhCyBOSoYbciPiyD4yoZJy01utNv5MfIPgF_ykEiZkwJiLBTADMm4V2ayFsKUTuxawCKOFTt7v0ibnOQYgcoKt7BAzY8bk9u2",
    helpful: 10,
  },
  // {
  //   id: "7",
  //   name: 'Budi S.',
  //   date: '2023-08-15',
  //   service: "Paint Correction",
  //   avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPU5awtp_01wXYBzwHzRAiiocnNFk-2BumhPuSO7NP4rYlRoK0dNDYe-ZrHW5LGk_twt5MFxZXKPDjNO31KP-WFXgr4RilaWNeDnrXZgoNV2kYFzq7bz0KfGfpNZRjXAMixjsVhbh5YfazW4CV-RjKpPyAI4f7orkoSsyrkSZl697IhCyBOSoYbciPiyD4yoZJy01utNv5MfIPgF_ykEiZkwJiLBTADMm4V2ayFsKUTuxawCKOFTt7v0ibnOQYgcoKt7BAzY8bk9u2',
  //   rating: 5,
  //   helpful: 20,
  //   comment: 'Pelayanan sangat baik dan cepat. Mobil saya jadi kinclong!',
  // },
  // {
  //   id: "8",
  //   name: 'Siti R.',
  //   date: '2023-07-20',
  //   service: "Paint Correction",
  //   avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB3juT2SFufvUP45p1y8maz-0fRUAQRq2C_xHrHLb2MHXfz8dEQBH__u8133SdMAnt1Z_bdJ2Z4xkDWjv6pqEX_E5TxJyrMr6xfjqS957e5ajZ1ar3yquOFA6vVOEyecZiKck89T10kkpu92U8AzCJy0NQWNFPN2TXmW-1q5YVA4gC83cIOpU-yV8os5GG3T8g_HutlODI6u0wlvOkq4bJbEtCT9kwKxuyNcUErWnh5JK1BiW74xTXGnia-QrjG2HhhxAl84akRyIj',
  //   rating: 4,
  //   helpful: 20,
  //   comment: 'Hasil cuci cukup memuaskan, tapi mungkin bisa lebih detail lagi.',
  // },
  {
    id: "9",
    name: 'Ahmad P.',
    date: '2023-06-10',
    service: "Complete Detail Package",
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR6vC6_OYr2iyrcZ_ibD3wupGVQZogOjSUYo2yXffMESx3MU7wVQ01lcFQB8ZwRucXf9LyyFz2U0FR3ty5il_ABTXHhOUK2RNI8huFzfm7bBcuUPk6zmETjo9e2UPTgDtm6gKVdB_R4B1ub4hKw85Gg9qN4EW2bl98uPVhJkiYDny4bA29MCnVMkgj7LuPV5FDhP1hhyh22W7l9UCh7QLzwAxTYf4roxaU5rwaFSdpE-X0OWDCJavRLCM-zn5x88ZCdjjZE6nhdOoA',
    rating: 5,
    helpful: 20,
    comment: 'Sangat puas dengan hasil detailing lengkap. Mobil seperti baru lagi!',
  },
]

export default function ReviewsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <div className="flex items-center mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-lg font-semibold">5.0</span>
            <span className="ml-2 text-gray-600">({reviews.length} reviews)</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <Image
                src={review.avatar || "/placeholder.svg"}
                alt={review.name}
                width={40}
                height={40}
                className="rounded-full w-auto h-auto aspect-square"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-gray-600">
                      {review.service} • {review.date}
                    </p>
                  </div>
                  <div className="flex">
                    <StarRating rating={review.rating} />
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{review.comment}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  <span>Helpful ({review.helpful})</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

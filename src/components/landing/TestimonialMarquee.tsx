"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    quote: "AssessAI cut our time-to-hire from 6 weeks to 2 weeks. The AI questions are spot-on.",
    name: "Sarah Chen",
    role: "VP Engineering",
    company: "TechCorp",
    rating: 5.0,
    avatar: "SC",
  },
  {
    quote: "96% detection rate caught 3 cheating attempts we would've missed. Game changer.",
    name: "Mike Johnson",
    role: "CTO",
    company: "StartupXYZ",
    rating: 5.0,
    avatar: "MJ",
  },
  {
    quote: "Cloud labs let candidates prove AWS skills, not just talk about them. Love it.",
    name: "John Doe",
    role: "Dir. Engineering",
    company: "CloudCo",
    rating: 5.0,
    avatar: "JD",
  },
  {
    quote: "Best ROI we've seen. Paid for itself in 2 months.",
    name: "Jane Smith",
    role: "Head of Talent",
    company: "ScaleUp",
    rating: 5.0,
    avatar: "JS",
  },
  {
    quote: "The DSA tests are as good as LeetCode but with built-in proctoring.",
    name: "Alex Kim",
    role: "Engineering Manager",
    company: "DevShop",
    rating: 5.0,
    avatar: "AK",
  },
  {
    quote: "AI evaluation is shockingly accurate. Better than human reviewers.",
    name: "Emma Wilson",
    role: "Tech Lead",
    company: "AIStartup",
    rating: 5.0,
    avatar: "EW",
  },
  {
    quote: "We hired 5 devs last month. All exceeded expectations. AssessAI works.",
    name: "Chris Lee",
    role: "Founder",
    company: "GrowthCo",
    rating: 5.0,
    avatar: "CL",
  },
  {
    quote: "Finally, a platform that tests real skills, not trivia.",
    name: "Lisa Brown",
    role: "Recruiter",
    company: "TalentHub",
    rating: 5.0,
    avatar: "LB",
  },
  {
    quote: "The proctoring is thorough but not creepy. Candidates appreciate it.",
    name: "David Park",
    role: "HR Director",
    company: "EnterpriseCorp",
    rating: 5.0,
    avatar: "DP",
  },
  {
    quote: "Setup took 10 minutes. First hire in 2 weeks. Incredible.",
    name: "Maya Patel",
    role: "CEO",
    company: "FastHire",
    rating: 5.0,
    avatar: "MP",
  },
]

export function TestimonialMarquee() {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section className="py-32 bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Loved by 500+ Engineering Teams
            </span>
          </h2>
        </div>

        {/* Top Row - Scrolls Left */}
        <div className="relative mb-6 overflow-hidden">
          <div className="flex animate-marquee-left">
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`top-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Bottom Row - Scrolls Right */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee-right">
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`bottom-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="flex-shrink-0 w-[400px] mx-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 hover:border-white/20 transition-all group">
      <div className="space-y-4">
        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm font-semibold text-white">{testimonial.rating}</span>
        </div>

        {/* Quote */}
        <p className="text-gray-300 italic leading-relaxed line-clamp-3">
          "{testimonial.quote}"
        </p>

        {/* Author */}
        <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center border-2 border-white/20">
            <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">{testimonial.name}</p>
            <p className="text-gray-400 text-xs">{testimonial.role}</p>
            <p className="text-gray-500 text-xs">{testimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


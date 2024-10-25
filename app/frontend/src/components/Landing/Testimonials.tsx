import React, { useEffect, useRef, useState } from 'react';
import { User, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      text: "The practice questions are really well-explained and the study materials break down complex concepts in a way that's easy to understand. The interface is clean and helps me stay focused.",
      author: "Alex C.",
      role: "High School Junior"
    },
    {
      text: "As a parent, I appreciate how organized the platform is. The progress tracking helps me understand how my daughter is doing, and the study plans are clearly structured.",
      author: "Sarah T.",
      role: "Parent"
    },
    {
      text: "What I love most is how the platform adapts to my needs. The practice sessions helped me identify areas where I needed more work, and the explanations are always thorough.",
      author: "Maya P.",
      role: "High School Senior"
    }
  ];

  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]); // Allow null values

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = testimonialRefs.current.indexOf(entry.target as HTMLDivElement);
            setVisibleCards((prev) => [...prev, index]);
            observer.unobserve(entry.target); // Unobserve once it's visible
          }
        });
      },
      { threshold: 0.2 } // Trigger animation when 20% of the card is visible
    );

    testimonialRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      testimonialRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div id="testimonials" className="bg-gradient-to-b from-slate-50 to-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join our community of dedicated students preparing for success
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => (testimonialRefs.current[index] = el)} // Allow ref to be null
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-700 
                ${visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
            >
              <div className="absolute top-4 right-4 text-indigo-500">
                <Quote size={24} />
              </div>

              <div className="p-8">
                <div className="h-40">
                  <p className="text-slate-700 text-lg leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>

                <div className="mt-8 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-slate-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

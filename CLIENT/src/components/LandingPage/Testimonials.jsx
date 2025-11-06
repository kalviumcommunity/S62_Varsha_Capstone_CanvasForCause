import React from 'react';

const TestimonialCard = ({ content, name, title, initials }) => {
  return (
    <div className="flex-1 bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgba(106,90,205,0.12)] relative overflow-hidden">
      <div className="text-charcoal mb-5 relative">
        <span className="absolute -top-6 -left-3 text-6xl font-serif text-lavender z-0">"</span>
        <p className="relative z-10">{content}</p>
      </div>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple to-teal flex items-center justify-center text-white font-bold mr-4">
          {initials}
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-charcoal/70">{title}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      content: "CanvasForCause helped me express feelings I couldn't put into words. Creating art and sharing my story has been incredibly therapeutic during a difficult time in my life.",
      name: "Jamie Dixon",
      title: "Digital Artist",
      initials: "JD"
    },
    {
      content: "Finding others who create art for similar reasons made me feel less alone. The supportive comments and meaningful connections I've made here have changed my perspective.",
      name: "Sam Reynolds",
      title: "Watercolor Enthusiast",
      initials: "SR"
    },
    {
      content: "I never considered myself an artist until joining this platform. The tools are intuitive, and the community is so encouraging. It's become my daily creative outlet.",
      name: "Lee Park",
      title: "Beginner Artist",
      initials: "LP"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto max-w-6xl px-5">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold mb-4">Community Voices</h2>
          <p className="text-lg max-w-2xl mx-auto text-charcoal/70">
            Hear from our growing community of artists and storytellers
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={`${testimonial.name}-${testimonial.initials}`} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
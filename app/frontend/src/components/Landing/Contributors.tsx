import React from 'react';
import AlijonImg from '../assets/alijon-photo.jpg';
import AzimkhonImg from '../assets/azimkhon-photo.jpg';
interface Contributor {
  name: string;
  role: string;
  bio: string;
  quote: string;
  image: string; 
}

const contributors: Contributor[] = [
  {
    name: 'Alijon Karimberdiev',
    role: 'Co-Founder',
    bio: 'Alijon is the visionary behind the strategic and creative direction of SimplePrep.',
    quote: 'We are on a mission to transform SAT Prep. ',
    image: AlijonImg,
  },
  {
    name: 'Azimkhon Akobirov',
    role: 'Co-Founder',
    bio: 'I am Azimkhon Akobirov, inspired tech-enthusiast, and I aim to make education more accessible. Simple-prep is just my first step towards my vision.',
    quote: 'Whatever happens, happens for greater good',
    image: AzimkhonImg,
  },
];

const Contributors: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
            Meet the Founders
          </h2>
          <p className="text-xl text-gray-600">
            The visionaries shaping the future of SimplePrep
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {contributors.map((contributor, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex flex-col lg:flex-row relative">
                <div className="relative w-full lg:w-full h-72 lg:h-auto overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent z-10" />
                  <img
                    src={contributor.image}
                    alt={`${contributor.name} portrait`}
                    className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-8 lg:p-10 flex flex-col flex-grow relative">
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
                      {contributor.role}
                    </p>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {contributor.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed mb-8 flex-grow">
                    {contributor.bio}
                  </p>

                  <div className="relative">
                    <div className="absolute -left-3 top-0 text-5xl text-blue-500/10 font-serif">"</div>
                    <p className="text-gray-800 text-lg italic pl-6 relative">
                      {contributor.quote}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Bottom accent line */}
              <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contributors;
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 font-mono">Operational</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal text-gray-900 leading-tight mb-8">
            Design That Moves.<br />
            Ideas That Convert.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-12">
            We build scalable, user-first digital products and design systems
            for teams that think ahead.
          </p>

          {/* CTA Button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-all duration-200"
          >
            Get in touch
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Stats - minimalist style */}
        <div className="mt-32 pt-12 border-t border-gray-200 diagonal-stripes">
          <div className="grid grid-cols-3 gap-8 max-w-3xl">
            <div>
              <div className="text-2xl font-mono text-gray-900 mb-1">50+</div>
              <div className="text-sm text-gray-600">Projects Delivered</div>
            </div>
            <div>
              <div className="text-2xl font-mono text-gray-900 mb-1">98%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-2xl font-mono text-gray-900 mb-1">3x</div>
              <div className="text-sm text-gray-600">Conversion Increase</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
import React from 'react';
import { Star } from 'lucide-react';
import EditableText from '@/components/atoms/EditableText';

interface TestimonialCardProps {
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar: string;
    rating: number;
  };
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  return (
    <div className="bg-bg-primary p-8 border-t border-border-primary">
      {/* Rating stars */}
      <div className="flex items-center mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>

      {/* Quote */}
      <EditableText
        elementId={`testimonial-quote-${index}`}
        onUpdate={(value) => console.log('Update quote:', value)}
        className="text-text-secondary text-sm mb-6 leading-relaxed"
        as="blockquote"
        multiline
      >
        "{testimonial.quote}"
      </EditableText>

      {/* Author info */}
      <div className="pt-4 border-t border-border-primary">
        <EditableText
          elementId={`testimonial-author-${index}`}
          onUpdate={(value) => console.log('Update author:', value)}
          className="font-bold text-text-primary mb-1"
          as="div"
        >
          {testimonial.author}
        </EditableText>
        <div className="text-text-tertiary text-xs">
          <EditableText
            elementId={`testimonial-role-${index}`}
            onUpdate={(value) => console.log('Update role:', value)}
            as="span"
          >
            {testimonial.role}
          </EditableText>
          ,{' '}
          <EditableText
            elementId={`testimonial-company-${index}`}
            onUpdate={(value) => console.log('Update company:', value)}
            as="span"
          >
            {testimonial.company}
          </EditableText>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

/**
 * @fileoverview Avatar component for user profile images
 * @module design-system/components/primitives/Avatar
 * 
 * An avatar component for displaying user profile images or initials.
 * 
 * @example
 * ```tsx
 * import { Avatar } from '@/design-system/components/primitives/Avatar';
 * 
 * <Avatar src="/user.jpg" alt="John Doe" />
 * <Avatar fallback="JD" />
 * ```
 */

import { forwardRef, type ImgHTMLAttributes, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/design-system/utils/cn';

/**
 * Avatar variant styles using CVA
 */
const avatarVariants = cva(
  // Base styles - brutalist design
  'inline-flex items-center justify-center overflow-hidden bg-zinc-100 text-zinc-900 font-bold border-2 border-zinc-900',
  {
    variants: {
      size: {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
        xl: 'w-16 h-16 text-lg',
        '2xl': 'w-20 h-20 text-xl',
      },
      shape: {
        circle: 'rounded-brutalist',
        square: 'rounded-brutalist',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  }
);

export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'>,
    VariantProps<typeof avatarVariants> {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback text (usually initials) */
  fallback?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Avatar component for user profile images
 * 
 * @param src - Image source URL
 * @param alt - Alt text for image
 * @param fallback - Fallback text (initials)
 * @param size - Avatar size
 * @param shape - Avatar shape (circle or square)
 * @param className - Additional CSS classes
 * 
 * @example
 * ```tsx
 * <Avatar
 *   src="/avatar.jpg"
 *   alt="John Doe"
 *   fallback="JD"
 *   size="lg"
 * />
 * ```
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      fallback,
      size,
      shape,
      className,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const showFallback = !src || imageError || !imageLoaded;

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, shape }), className)}
      >
        {src && !imageError && (
          <img
            src={src}
            alt={alt}
            className={cn(
              'w-full h-full object-cover',
              !imageLoaded && 'hidden'
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            {...props}
          />
        )}
        
        {showFallback && (
          <span className="select-none">
            {fallback || alt.charAt(0).toUpperCase() || '?'}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

/**
 * Avatar Group component for displaying multiple avatars
 */
export interface AvatarGroupProps {
  /** Array of avatar props */
  avatars: AvatarProps[];
  /** Maximum number of avatars to show */
  max?: number;
  /** Size for all avatars */
  size?: AvatarProps['size'];
  /** Additional CSS classes */
  className?: string;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ avatars, max = 3, size = 'md', className }, ref) => {
    const displayAvatars = avatars.slice(0, max);
    const remaining = avatars.length - max;

    return (
      <div ref={ref} className={cn('flex -space-x-2', className)}>
        {displayAvatars.map((avatar, index) => (
          <Avatar
            key={index}
            {...avatar}
            size={size}
            className={cn(
              'ring-2 ring-dark-bg',
              avatar.className
            )}
          />
        ))}
        
        {remaining > 0 && (
          <div
            className={cn(
              avatarVariants({ size, shape: 'circle' }),
              'ring-2 ring-dark-bg bg-gray-600'
            )}
          >
            <span className="text-xs">+{remaining}</span>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

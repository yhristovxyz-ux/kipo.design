/**
 * @fileoverview Design system primitive components
 * @module design-system/components/primitives
 * 
 * Base UI components following Momentic.ai design system.
 * All components are built with TypeScript, CVA variants, and dark theme.
 */

// Button
export { Button } from './Button';
export type { ButtonProps } from './Button';

// Input
export { Input } from './Input';
export type { InputProps } from './Input';

// Card
export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from './Card';
export type { CardProps } from './Card';

// Badge
export { Badge } from './Badge';
export type { BadgeProps } from './Badge';

// Avatar
export { Avatar, AvatarGroup } from './Avatar';
export type { AvatarProps, AvatarGroupProps } from './Avatar';

// Typography
export { Heading, Text } from './Typography';
export type { HeadingProps, TextProps } from './Typography';

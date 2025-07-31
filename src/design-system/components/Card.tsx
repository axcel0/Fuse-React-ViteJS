import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { cardClasses } from '../utils';

// ===== CARD VARIANTS =====
const cardVariants = cva(cardClasses.base, {
	variants: {
		variant: {
			elevated: cardClasses.variants.elevated,
			outlined: cardClasses.variants.outlined,
			filled: cardClasses.variants.filled,
		},
		padding: {
			none: 'p-0',
			sm: cardClasses.padding.sm,
			md: cardClasses.padding.md,
			lg: cardClasses.padding.lg,
		},
	},
	defaultVariants: {
		variant: 'elevated',
		padding: 'md',
	},
});

// ===== CARD INTERFACES =====
export interface CardProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
		VariantProps<typeof cardVariants> {
	/**
	 * Whether the card is interactive (clickable)
	 */
	interactive?: boolean;
	/**
	 * Card title - appears in header
	 */
	title?: React.ReactNode;
	/**
	 * Card subtitle - appears below title
	 */
	subtitle?: React.ReactNode;
	/**
	 * Card header content - overrides title/subtitle
	 */
	header?: React.ReactNode;
	/**
	 * Card footer content
	 */
	footer?: React.ReactNode;
	/**
	 * Card actions (buttons, etc.)
	 */
	actions?: React.ReactNode;
	/**
	 * Media content (image, video, etc.)
	 */
	media?: React.ReactNode;
}

// ===== CARD COMPONENT =====
const Card = forwardRef<HTMLDivElement, CardProps>(
	(
		{
			className,
			variant,
			padding,
			interactive = false,
			title,
			subtitle,
			header,
			footer,
			actions,
			media,
			children,
			onClick,
			...props
		},
		ref,
	) => {
		const cardClasses = cn(
			cardVariants({ variant, padding }),
			interactive && 'cursor-pointer hover:shadow-md transition-shadow',
			className,
		);

		return (
			<div
				ref={ref}
				className={cardClasses}
				onClick={onClick}
				role={interactive ? 'button' : undefined}
				tabIndex={interactive ? 0 : undefined}
				onKeyDown={
					interactive
						? (e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									onClick?.(e as any);
								}
							}
						: undefined
				}
				{...props}
			>
				{/* Media Section */}
				{media && <div className="card-media overflow-hidden -mt-4 -mx-4 mb-4 first:mt-0">{media}</div>}

				{/* Header Section */}
				{(header || title || subtitle) && (
					<div className="card-header mb-4 last:mb-0">
						{header || (
							<div>
								{title && <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>}
								{subtitle && <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
							</div>
						)}
					</div>
				)}

				{/* Content Section */}
				{children && <div className="card-content">{children}</div>}

				{/* Actions Section */}
				{actions && <div className="card-actions mt-4 first:mt-0 flex gap-2 justify-end">{actions}</div>}

				{/* Footer Section */}
				{footer && (
					<div className="card-footer mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 first:mt-0 first:pt-0 first:border-t-0">
						{footer}
					</div>
				)}
			</div>
		);
	},
);

Card.displayName = 'Card';

// ===== CARD HEADER COMPONENT =====
export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn('card-header space-y-1.5', className)} {...props} />,
);
CardHeader.displayName = 'CardHeader';

// ===== CARD TITLE COMPONENT =====
export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => (
		<h3 ref={ref} className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
	),
);
CardTitle.displayName = 'CardTitle';

// ===== CARD DESCRIPTION COMPONENT =====
export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => (
		<p ref={ref} className={cn('text-sm text-gray-600 dark:text-gray-400', className)} {...props} />
	),
);
CardDescription.displayName = 'CardDescription';

// ===== CARD CONTENT COMPONENT =====
export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => <div ref={ref} className={cn('card-content', className)} {...props} />,
);
CardContent.displayName = 'CardContent';

// ===== CARD FOOTER COMPONENT =====
export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn('card-footer flex items-center', className)} {...props} />
	),
);
CardFooter.displayName = 'CardFooter';

export default Card;

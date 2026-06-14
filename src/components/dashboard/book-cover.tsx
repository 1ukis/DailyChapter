import {
  getBookIconPath,
  parseGradientColors,
} from "@/lib/utils/book-icons";
import type { Book } from "@/types/database";

export function BookCover({ book }: { book: Book }) {
  const [color1, color2] = parseGradientColors(book.gradient);
  const gradientId = `grad-${book.id}`;

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-2xl">
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#${gradientId})`} />
        <path
          d="M0,10 L100,10 M0,20 L100,20 M0,30 L100,30 M0,40 L100,40 M0,50 L100,50 M0,60 L100,60 M0,70 L100,70 M0,80 L100,80 M0,90 L100,90"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="0.5"
        />
        <path
          d="M10,0 L10,100 M20,0 L20,100 M30,0 M30,100 M40,0 L40,100 M50,0 L50,100 M60,0 L60,100 M70,0 L70,100 M80,0 L80,100 M90,0 L90,100"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="0.5"
        />
        <g transform="translate(38, 38)">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <g
              dangerouslySetInnerHTML={{
                __html: getBookIconPath(book.icon),
              }}
            />
          </svg>
        </g>
        <line
          x1="5"
          y1="0"
          x2="5"
          y2="100"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}

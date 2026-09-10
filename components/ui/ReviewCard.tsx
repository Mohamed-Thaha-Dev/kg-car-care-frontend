import { reviews } from "@/lib/data/Reviews";
import { Star } from "lucide-react";

export type Review = (typeof reviews)[number];

export default function  ReviewCard({ review }: { review: Review }) {
  const initial = review.name.trim().charAt(0).toUpperCase();

  return (
    <article
      className="
        group
        relative
        flex
        lg:w-[330px]
        w-[300px]
        shrink-0
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-background
        p-5
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-white/20
        
      "
    >
      {/* Customer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">

          {/* Initial Avatar */}
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white/[0.08]
              text-sm
              font-semibold
              text-white
              ring-1
              ring-foreground/20
            "
          >
            {initial}
          </div>

          {/* Name */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {review.name}
            </h3>

            <p className="mt-0.5 text-xs text-foreground/40">
              {review.username}
            </p>
          </div>
        </div>

        {/* Google */}
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06]">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    className="h-5 w-5"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />

    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />

    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />

    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.002,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
</div>
      </div>

      {/* Rating */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: review.rating }).map((_, index) => (
            <Star
              key={index}
              className="
                h-3.5
                w-3.5
                fill-current
                text-yellow-400
              "
            />
          ))}
        </div>

        <span className="text-[11px] text-white/30">
          {review.date}
        </span>
      </div>

      {/* Review */}
      <p
        className="
          mt-4
          line-clamp-4
          text-sm
          leading-6
          text-white/65
        "
      >
        “{review.body}”
      </p>
    </article>
  );
}
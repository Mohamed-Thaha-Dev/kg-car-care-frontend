type CardProps = {
  title: string;
  number: string;
  value: string;
  description: string;
  cardClassName: string;
  numberClassName?: string;
  valueClassName?: string;
};

export default function Cards({
  title,
  number,
  value,
  description,
  cardClassName,
  numberClassName = "",
  valueClassName = "",
}: CardProps) {
  return (
    <div
      className={`about-card rounded-[1.75rem]  p-7 sm:p-9  md:min-h-[260px] ${cardClassName}`}
    >
      <div className="flex h-full flex-col justify-between">

        {/* Top */}
        <div className="flex items-center justify-between">

          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 ">
            {title}
          </span>

          <span className={numberClassName}>
            {number}
          </span>

        </div>

        {/* Bottom */}
        <div className="mt-16">

          <div
            className={`text-[clamp(3rem,5vw,5.5rem)]  leading-none  font-heading ${valueClassName}`}
          >
            {value}
          </div>

          <p className="mt-3 text-sm text-neutral-500">
            {description}
          </p>

        </div>

      </div>
    </div>
  );
}
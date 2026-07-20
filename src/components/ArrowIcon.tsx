type ArrowIconProps = {
  direction?: "right" | "down";
};

export function ArrowIcon({ direction = "right" }: ArrowIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`arrow-icon arrow-icon--${direction}`}
      viewBox="0 0 16 16"
    >
      <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" />
    </svg>
  );
}


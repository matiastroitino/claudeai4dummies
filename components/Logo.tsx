export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="48" fill="#000000"/>
      <path d="M50 16 L66 50 L50 84 L34 50 Z" fill="#ff6b35" transform="rotate(45 50 50)"/>
      <circle cx="50" cy="50" r="7" fill="#000000"/>
    </svg>
  );
}

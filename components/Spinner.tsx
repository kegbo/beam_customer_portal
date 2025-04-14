export default function Spinner({ size = 50 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#FBC02D" // Lighter shade to match your button
        strokeWidth="4"
        strokeDasharray="125"
        strokeDashoffset="0"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
          keyTimes="0; 1"
          calcMode="linear"
        />
        <animate
          attributeName="stroke-dasharray"
          values="1,150; 90,150; 1,150"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-40;-120"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          values="#FBC02D;#FFD54F;#FFF176;#FBC02D"
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

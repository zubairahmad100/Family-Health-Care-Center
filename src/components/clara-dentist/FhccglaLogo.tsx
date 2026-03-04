export default function FhccglaLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 100"
      className={className}
      preserveAspectRatio="xMinYMid meet"
    >
      <defs>
        <path
          id="tooth-path"
          d="M20,10 C35,10 45,25 45,40 C45,55 35,65 35,80 C35,85 30,90 25,90 C20,90 15,80 15,65 C15,60 10,60 10,65 C10,80 5,90 0,90 C-5,90 -10,85 -10,80 C-10,65 -20,55 -20,40 C-20,25 -10,10 5,10 C10,10 15,10 20,10 Z"
        />
      </defs>

      {/* Stylized Tooth Icon */}
      <g transform="translate(40, 50) scale(0.6)">
        <use href="#tooth-path" fill="#1B8A6B" /> {/* Teal-Green */}
        <use
          href="#tooth-path"
          fill="none"
          stroke="#4BBFA0"
          strokeWidth="4"
          opacity="0.5"
        />
        {/* Cross inside the tooth */}
        <path
          d="M8,30 h8 v8 h8 v8 h-8 v8 h-8 v-8 h-8 v-8 h8 Z"
          fill="#FFFFFF"
        />
      </g>

      {/* Wordmark */}
      <text
        x="95"
        y="50"
        fontFamily="sans-serif"
        fontWeight="800"
        fontSize="34"
        fill="#1B8A6B"
        letterSpacing="2"
      >
        FHCCGLA
      </text>
      
      {/* Sub-caption */}
      <text
        x="95"
        y="75"
        fontFamily="sans-serif"
        fontWeight="500"
        fontSize="14"
        fill="#4BBFA0"
      >
        Family Health Care Centers
      </text>
    </svg>
  );
}

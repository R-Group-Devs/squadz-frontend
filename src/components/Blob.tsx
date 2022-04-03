export default ({ size }: { size: number }) => {
  return (
    <svg className="blob-svg" width={size + 20} height={size} viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" filter="url(#blob-filter)">
      <defs>
        <filter id="blob-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
        <mask id="blob-mask">
          <ellipse className="ellipse1"></ellipse>
          <ellipse className="ellipse2"></ellipse>
          <circle className="circle1"></circle>
          <circle className="circle2"></circle>
          <circle className="circle3"></circle>
          <circle className="circle4"></circle>
        </mask>
        <linearGradient id="gradient" x1="0" y1="1" x2="1" y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(-440 440 -440 -440 760 250)">
          <stop offset="0.25" stop-color="#2FBF71" />
          <stop offset="0.5" stop-color="#E086D3" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="600" height="600" mask="url(#blob-mask)" fill="url(#gradient)" />
    </svg>
  )
}
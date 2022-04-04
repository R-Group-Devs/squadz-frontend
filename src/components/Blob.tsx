export default ({ size }: { size: number }) => {
  return (
    <svg className="blob" width={size} height={size} viewBox="15 15 170 170" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" style={{ stopColor: "#E086D3", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#2FBF71", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path d="M53.2,-68.9C68.8,-61.9,81.2,-46.2,84.2,-29.2C87.3,-12.1,81.1,6.1,72.2,20.4C63.3,34.6,51.7,44.9,39.2,55.7C26.7,66.5,13.4,77.9,-3.1,82.1C-19.6,86.4,-39.1,83.6,-53.7,73.4C-68.3,63.3,-78,45.9,-84,27.3C-90.1,8.7,-92.5,-11.1,-86.9,-28.1C-81.2,-45.2,-67.5,-59.6,-51.6,-66.4C-35.8,-73.3,-17.9,-72.6,0.5,-73.3C18.8,-73.9,37.6,-75.8,53.2,-68.9Z" transform="translate(100 100)" fill="url(#gradient)" />
    </svg>
  )
}
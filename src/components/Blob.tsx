export default ({ size }: { size: number }) => {
  return (
    <svg className="blob" width={size} height={size} viewBox="15 15 170 170" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gradient" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" style={{ stopColor: "#E086D3", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#2FBF71", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path d="M53.2,-68.9C68.8,-61.9,81.2,-46.2,84.2,-29.2C87.3,-12.1,81.1,6.1,72.2,20.4C63.3,34.6,51.7,44.9,39.2,55.7C26.7,66.5,13.4,77.9,-3.1,82.1C-19.6,86.4,-39.1,83.6,-53.7,73.4C-68.3,63.3,-78,45.9,-84,27.3C-90.1,8.7,-92.5,-11.1,-86.9,-28.1C-81.2,-45.2,-67.5,-59.6,-51.6,-66.4C-35.8,-73.3,-17.9,-72.6,0.5,-73.3C18.8,-73.9,37.6,-75.8,53.2,-68.9Z" transform="translate(100 100)" fill="url(#gradient)">
        <animate attributeName="d" dur="20s" keyTimes="0; 0.2; 0.5; 0.8; 1" repeatCount="indefinite" values="
          M66.8,-23.1C73.8,-0.1,58,28.9,36.3,43C14.6,57.1,-12.8,56.2,-34.9,41.7C-57.1,27.1,-73.9,-1.2,-67.2,-23.8C-60.5,-46.4,-30.2,-63.2,-0.2,-63.2C29.9,-63.1,59.8,-46.1,66.8,-23.1Z;
          M43.6,-9.9C52.9,14.5,54.4,45.7,36.2,61.7C18,77.8,-19.9,78.7,-42.4,61.6C-64.8,44.5,-71.9,9.4,-62.2,-15.4C-52.6,-40.3,-26.3,-54.9,-4.6,-53.4C17.2,-51.9,34.3,-34.3,43.6,-9.9Z;
          M47.4,-19.4C52.3,-0.2,41,20.2,21,36.5C1.1,52.7,-27.3,64.7,-42.6,54.6C-57.9,44.4,-60.1,12.1,-50.8,-13.1C-41.5,-38.3,-20.8,-56.3,0.2,-56.4C21.2,-56.5,42.5,-38.6,47.4,-19.4Z;
          M60.5,-25.8C66.4,-1.4,51,23.8,32.3,35.2C13.6,46.5,-8.3,44.1,-28.1,31.4C-47.8,18.8,-65.4,-4.1,-60.3,-27.2C-55.3,-50.3,-27.6,-73.7,-0.2,-73.7C27.3,-73.6,54.6,-50.1,60.5,-25.8Z;
          M66.8,-23.1C73.8,-0.1,58,28.9,36.3,43C14.6,57.1,-12.8,56.2,-34.9,41.7C-57.1,27.1,-73.9,-1.2,-67.2,-23.8C-60.5,-46.4,-30.2,-63.2,-0.2,-63.2C29.9,-63.1,59.8,-46.1,66.8,-23.1Z
        " />
      </path>
    </svg>
  )
}
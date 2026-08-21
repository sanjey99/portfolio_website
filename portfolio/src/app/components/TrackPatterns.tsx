const candlesticks = `url("data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="176" height="112" viewBox="0 0 176 112">
    <g stroke="#9a7a3a" stroke-width="1" opacity="0.2">
      <path d="M22 20v54M66 34v56M110 14v52M154 44v50" />
    </g>
    <g fill="#9a7a3a" opacity="0.13">
      <rect x="17" y="34" width="10" height="24" />
      <rect x="61" y="46" width="10" height="24" />
      <rect x="105" y="25" width="10" height="23" />
      <rect x="149" y="57" width="10" height="21" />
    </g>
  </svg>
`) }")`;

export function PatternLayer() {
  return <div className="pattern-layer" style={{ backgroundImage: candlesticks }} />;
}

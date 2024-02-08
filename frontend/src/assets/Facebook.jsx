import * as React from "react";
const SVGComponent = (props) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <path
        d="M41.25 22.5C41.25 12.15 32.85 3.75 22.5 3.75C12.15 3.75 3.75 12.15 3.75 22.5C3.75 31.575 10.2 39.1312 18.75 40.875V28.125H15V22.5H18.75V17.8125C18.75 14.1937 21.6938 11.25 25.3125 11.25H30V16.875H26.25C25.2187 16.875 24.375 17.7187 24.375 18.75V22.5H30V28.125H24.375V41.1562C33.8438 40.2187 41.25 32.2312 41.25 22.5Z"
        fill={isHovered ? "#fff" : "#A1A1A1"}
      />
    </svg>
  );
};
export default SVGComponent;

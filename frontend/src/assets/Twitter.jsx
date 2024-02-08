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
        d="M9.10714 3.75C6.15234 3.75 3.75 6.15234 3.75 9.10714V35.8929C3.75 38.8477 6.15234 41.25 9.10714 41.25H35.8929C38.8477 41.25 41.25 38.8477 41.25 35.8929V9.10714C41.25 6.15234 38.8477 3.75 35.8929 3.75H9.10714ZM33.976 10.7813L25.2874 20.7087L35.5078 34.2188H27.5056L21.2444 26.024L14.0709 34.2188H10.0949L19.3862 23.5965L9.58426 10.7813H17.7874L23.4542 18.2729L30 10.7813H33.976ZM30.8119 31.8415L16.5904 13.0329H14.2215L28.6021 31.8415H30.8036H30.8119Z"
        fill={isHovered ? "#fff" : "#A1A1A1"}
      />
    </svg>
  );
};
export default SVGComponent;

function Loading() {
  return (
    <div className="bg-indigo-500 rounded-md flex justify-center text-white w-36 h-10 items-center mx-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="mx-2 animate-spin"
      >
        <path
          d="M15 7.99999C15 9.54609 14.4881 11.0487 13.5443 12.2733C12.6004 13.4978 11.2777 14.3755 9.78261 14.7692C8.28749 15.1629 6.70407 15.0506 5.27952 14.4497C3.85496 13.8488 2.66941 12.7932 1.90791 11.4477C1.14642 10.1021 0.851826 8.5423 1.07011 7.01169C1.2884 5.48108 2.00729 4.0658 3.11457 2.98675C4.22185 1.9077 5.65522 1.2256 7.19095 1.04691"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
      Loading...
    </div>
  );
}

export default Loading;

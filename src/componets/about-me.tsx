// about-me.tsx

const SKILL_CATEGORIES = ["Languages", "Frameworks", "AI_Assisted", "Tools"];

const TECH_STACK = {
  Languages: [
    { name: "JavaScript", color: "#F7DF1E" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "HTML5 & CSS3", color: "#E34F26" },
    { name: "C#", color: "#178600" },
    { name: "SQL", color: "#00758F" }
  ],
  Frameworks: [
    { name: "Next.js", color: "#FFFFFF" },
    { name: "React.js", color: "#61DAFB" },
    { name: "Node.js", color: "#339933" },
    { name: "Redux Toolkit", color: "#764ABC" },
    { name: "Tailwind CSS", color: "#38BDF8" }
  ],
  AI_Assisted: [
    { name: "GitHub Copilot", color: "#FFFFFF" },
    { name: "Cursor AI", color: "#38BDF8" },
    { name: "Claude AI", color: "#D97706" },
    { name: "ChatGPT", color: "#10B981" }
  ],
  Tools: [
    { name: "Git & GitHub", color: "#F05032" },
    { name: "VS Code", color: "#007ACC" },
    { name: "Visual Studio", color: "#5C2D91" },
    { name: "Postman", color: "#FF6C37" },
    { name: "Jira", color: "#0052CC" },
    { name: "Antigravity", color: "#10B981" }
  ]
};

const CATEGORY_DESCRIPTIONS = {
  Languages: "Core development scripting languages, styling specifications, object-oriented backends, and relational database query syntaxes.",
  Frameworks: "Modern frontend frameworks, component-driven client-side libraries, Javascript runtimes, global state managers, and utility styling sheets.",
  AI_Assisted: "Paired coding models, interactive terminal assistants, logic design checkers, and code-indexing developer environments.",
  Tools: "Version control systems, compiler environments, API sandbox utilities, project tracking portals, and AI agent platforms."
};

// Dossier facts configured directly below

function getTechLogo(name: string, color: string) {
  const svgProps = {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    className: "shrink-0 transition-colors duration-300",
    style: { color }
  };

  switch (name) {
    case "React.js":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
        </svg>
      );
    case "Next.js":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62 l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z" />
        </svg>
      );
    case "TypeScript":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
        </svg>
      );
    case "JavaScript":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
        </svg>
      );
    case "HTML5 & CSS3":
      return (
        <div className="flex gap-1 shrink-0 items-center justify-center">
          <svg {...svgProps} width="11" height="11" fill="currentColor">
            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
          </svg>
          <svg {...svgProps} width="11" height="11" fill="currentColor" style={{ color: "#38BDF8" }}>
            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
          </svg>
        </div>
      );
    case "Sass / SCSS":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zM9.615 15.998c.175.645.156 1.248-.024 1.792l-.065.18c-.024.061-.052.12-.078.176-.14.29-.326.56-.555.81-.698.759-1.672 1.047-2.09.805-.45-.262-.226-1.335.584-2.19.871-.918 2.12-1.509 2.12-1.509v-.003l.108-.061zm9.911-10.861c-.542-2.133-4.077-2.834-7.422-1.645-1.989.707-4.144 1.818-5.693 3.267C4.568 8.48 4.275 9.98 4.396 10.607c.427 2.211 3.457 3.657 4.703 4.73v.006c-.367.18-3.056 1.529-3.686 2.925-.675 1.47.105 2.521.615 2.655 1.575.436 3.195-.36 4.065-1.649.84-1.261.766-2.881.404-3.676.496-.135 1.08-.195 1.83-.104 2.101.24 2.521 1.56 2.43 2.1-.09.539-.523.854-.674.944-.15.091-.195.12-.181.181.015.09.091.09.21.075.165-.03 1.096-.45 1.141-1.471.045-1.29-1.186-2.729-3.375-2.7-.9.016-1.471.091-1.875.256-.03-.045-.061-.075-.105-.105-1.35-1.455-3.855-2.475-3.75-4.41.03-.705.285-2.564 4.8-4.814 3.705-1.846 6.661-1.335 7.171-.21.733 1.604-1.576 4.59-5.431 5.024-1.47.165-2.235-.404-2.431-.615-.209-.225-.239-.24-.314-.194-.12.06-.045.255 0 .375.12.3.585.825 1.396 1.095.704.225 2.43.359 4.5-.45 2.324-.899 4.139-3.405 3.614-5.505l.073.067z" />
        </svg>
      );
    case "Redux Toolkit":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zm0 4.8c-2.316 0-3.6 1.08-3.857 3.24 1.157-1.62 2.571-2.16 4.243-1.62.955.309 1.638.995 2.393 1.761C16.035 9.49 17.65 11.2 21.6 11.2c2.316 0 3.6-1.08 3.857-3.24-1.157 1.62-2.571 2.16-4.243 1.62-.955-.309-1.638-.995-2.393-1.761C17.565 6.51 15.95 4.8 12 4.8zm-6 7.2c-2.316 0-3.6 1.08-3.857 3.24 1.157-1.62 2.571-2.16 4.243-1.62.955.309 1.638.995 2.393 1.761C10.035 16.69 11.65 18.4 15.6 18.4c2.316 0 3.6-1.08 3.857-3.24-1.157 1.62-2.571 2.16-4.243 1.62-.955-.309-1.638-.995-2.393-1.761C11.565 13.71 9.95 12 6 12z" />
        </svg>
      );
    case "Node.js":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
        </svg>
      );
    case "Express.js":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78c-.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" />
        </svg>
      );
    case "REST APIs":
      return (
        <svg {...svgProps} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <line x1="6" y1="6" x2="6" y2="6.01" />
          <line x1="6" y1="18" x2="6" y2="18.01" />
        </svg>
      );
    case "Docker":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
        </svg>
      );
    case "Git & GitHub":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
    case "Vercel Hosting":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M12 2L24 22H0L12 2Z" />
        </svg>
      );
    case "Firebase":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M4.667 17.848l3.69-7.755L5.438 4.398c-.147-.282-.572-.258-.683.04L1.24 14.86c-.092.257-.015.545.187.728l3.24 2.26zm6.304-.132l4.896-9.176-4.896-10.02c-.156-.32-.615-.316-.763.008l-2.617 5.023 3.38 4.167zm7.766 1.564c.265-.125.43-.387.43-.68V7.938c0-.43-.518-.65-.815-.34L12 14.12l5.12 5.16.617-.164z" />
        </svg>
      );
    case "MongoDB":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M12 2c-3.15 4.38-4 8.25-4 10.75 0 2.21 1.79 4 4 4s4-1.79 4-4c0-2.5-.85-6.37-4-10.75zm1.5 12.2c-.44.25-1 .3-1.5.3s-1.06-.05-1.5-.3v-1.95c.44.25 1 .3 1.5.3s1.06-.05 1.5-.3v1.95zM12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0z" />
        </svg>
      );
    case "PostgreSQL":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm1.2 5.6h-2.4c-.44 0-.8.36-.8.8v7.2c0 .44.36.8.8.8h2.4c.44 0 .8-.36.8-.8V8.4c0-.44-.36-.8-.8-.8z" />
        </svg>
      );
    case "MySQL":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.5 12.5h-5v-1h5v1zm0-2.5h-5v-1h5v1zm0-2.5h-5v-1h5v1z" />
        </svg>
      );
    case "Prisma ORM":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M21.8068 18.2848L13.5528.7565c-.207-.4382-.639-.7273-1.1286-.7541-.5023-.0293-.9523.213-1.2062.6253L2.266 15.1271c-.2773.4518-.2718 1.0091.0158 1.4555l4.3759 6.7786c.2608.4046.7127.6388 1.1823.6388.1332 0 .267-.0188.3987-.0577l12.7019-3.7568c.3891-.1151.7072-.3904.8737-.7553s.1633-.7828-.0075-1.1454zm-1.8481.7519L9.1814 22.2242c-.3292.0975-.6448-.1873-.5756-.5194l3.8501-18.4386c.072-.3448.5486-.3996.699-.0803l7.1288 15.138c.1344.2856-.019.6224-.325.7128z" />
        </svg>
      );
    case "SharePoint":
      return (
        <svg {...svgProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      );
    case "SPFx Development":
      return (
        <svg {...svgProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="12" y1="2" x2="12" y2="22" />
        </svg>
      );
    case "Figma UI/UX":
      return (
        <svg {...svgProps} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
          <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
          <path d="M7 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
          <path d="M17 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
        </svg>
      );
    case "Cursor AI":
      return (
        <svg {...svgProps} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        </svg>
      );
    case "ESLint Linting":
      return (
        <svg {...svgProps} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    default:
      return (
        <span
          className="h-1.5 w-1.5 rounded-full shrink-0"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 10px 2px ${color}`,
          }}
        />
      );
  }
}


export default function AboutSection() {
  return (
    <div className="bg-neutral-950 text-zinc-300 relative overflow-hidden py-12 sm:py-16">
      {/* Background glow blobs */}
      <div className="absolute top-[35%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-brand-accent-light/8 to-brand-accent-dark/4 blur-[85px] rounded-full pointer-events-none z-0" />

      {/* Biography Section */}
      <section id="about" className="mx-auto max-w-5xl px-6 lg:px-0 relative z-10">
        <div 
          className="rounded-xl border border-zinc-800/80 magical-card-texture p-8 md:p-10 shadow-xl"
        >
          {/* Dossier Header */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-8 gap-4">
            <div className="flex items-center gap-3">
              {/* AI Assistant / Developer Icon */}
              <svg
                width="24"
                height="28"
                viewBox="0 0 52 61"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-brand-accent-light"
              >
                <path
                  d="M26 10C26 21 21 26 10 26C21 26 26 31 26 42C26 31 31 26 42 26C31 26 26 21 26 10Z"
                  fill="currentColor"
                  fillOpacity="0.1"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <circle cx="26" cy="26" r="4.5" fill="currentColor" />
              </svg>
              <h3 className="font-syne text-3xl font-extrabold uppercase leading-none tracking-tight md:text-4xl">
                <span className="block text-white">About</span>
                <span className="block text-outline-orange mt-1">Me</span>
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr]">
            {/* Left Column: Profile Avatar & Quick Metrics */}
            <div className="flex flex-col gap-6 items-center md:items-stretch">
              {/* Hologram Avatar slot */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                {/* Rotating outer ring */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full text-brand-accent-light animate-[spin_12s_linear_infinite] opacity-60"
                >
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
                </svg>
                {/* Rotating inner ring (opposite direction) */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full text-brand-accent-dark animate-[spin_8s_linear_infinite_reverse] opacity-40"
                >
                  <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  <path d="M 50 12 A 38 38 0 0 1 88 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  <path d="M 50 88 A 38 38 0 0 1 12 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
                {/* Steady core ring with initials */}
                <div className="relative w-24 h-24 rounded-full border border-white/10 bg-zinc-950/80 flex items-center justify-center shadow-inner shadow-brand-accent-light/10">
                  <span className="font-serif text-3xl italic font-bold text-white tracking-wide">SM</span>
                </div>
                {/* Neon glow effect behind avatar */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-brand-accent-light/5 to-brand-accent-dark/5 blur-[25px] pointer-events-none -z-10" />
              </div>

              {/* Quick Metrics grid */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {/* Location Card */}
                <div className="rounded-xl border border-zinc-800/80 bg-badge-bg p-3 flex items-center gap-3">
                  <svg className="w-5 h-5 text-brand-accent-light shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <circle cx="12" cy="11" r="3" />
                  </svg>
                  <div>
                    <div className="font-sans text-xs sm:text-[12px] font-bold text-white">Bhubaneswar, IN</div>
                    <div className="text-[9px] uppercase tracking-wider text-zinc-400 mt-0.5">Location</div>
                  </div>
                </div>

                {/* Experience Card */}
                <div className="rounded-xl border border-zinc-800/80 bg-badge-bg p-3 flex items-center gap-3">
                  <svg className="w-5 h-5 text-brand-accent-light shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00-2 2z" />
                  </svg>
                  <div>
                    <div className="font-sans text-xs sm:text-[12px] font-bold text-white">2.6+ Years Exp.</div>
                    <div className="text-[9px] uppercase tracking-wider text-zinc-400 mt-0.5">Experience</div>
                  </div>
                </div>

                {/* Education Card */}
                <div className="rounded-xl border border-zinc-800/80 bg-badge-bg p-3 flex items-center gap-3">
                  <svg className="w-5 h-5 text-brand-accent-light shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a2 2 0 01-2 2h-3" />
                  </svg>
                  <div>
                    <div className="font-sans text-xs sm:text-[12px] font-bold text-white">MCA (BPUT)</div>
                    <div className="text-[9px] uppercase tracking-wider text-zinc-400 mt-0.5">Education</div>
                  </div>
                </div>

                {/* Availability Card */}
                <div className="rounded-xl border border-zinc-800/80 bg-badge-bg p-3 flex items-center gap-3">
                  <svg className="w-5 h-5 text-brand-accent-light shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12h19.5M12 2.25a15.3 15.3 0 014 9.75 15.3 15.3 0 01-4 9.75 15.3 15.3 0 01-4-9.75 15.3 15.3 0 014-9.75z" />
                  </svg>
                  <div>
                    <div className="font-sans text-xs sm:text-[12px] font-bold text-white">Full-Time / Remote</div>
                    <div className="text-[9px] uppercase tracking-wider text-zinc-400 mt-0.5">Availability</div>
                  </div>
                </div>

                {/* Relocation Card */}
                <div className="rounded-xl border border-zinc-800/80 bg-badge-bg p-3 flex items-center gap-3 col-span-2">
                  <svg className="w-5 h-5 text-brand-accent-light shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <div>
                    <div className="font-sans text-xs sm:text-[12px] font-bold text-white">Ready to Relocate / Flexible</div>
                    <div className="text-[9px] uppercase tracking-wider text-zinc-400 mt-0.5">Relocation</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Biography Copy & Standardized Social Action Badges */}
            <div className="flex flex-col gap-6 justify-center">
              <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3.5 border border-white/10 bg-zinc-950/50 backdrop-blur-md px-6 py-3 rounded-2xl sm:rounded-full w-fit">
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-950 font-bold bg-emerald-400 px-3 py-1 rounded-full shrink-0 w-fit">
                  Philosophy
                </span>
                <div className="text-sm sm:text-base text-zinc-100 leading-normal">
                  My approach to the work is <span className="font-serif italic text-emerald-300 font-medium">logic, consistency, and rationality</span>
                </div>
              </div>

              <p className="text-zinc-100 text-[13px] sm:text-sm leading-relaxed">
                I'm <strong className="text-white font-semibold">Satabdi Mohanty</strong>, a <strong className="text-white font-semibold">Frontend Developer</strong> with over <strong className="text-emerald-200 font-semibold">2.6 years of experience</strong> in web application development. I'm passionate about building clean, performant, and responsive interfaces with strict attention to pixel-perfection. Currently, I am a Software Associate at <strong className="text-white font-semibold">Softree Technology</strong>, focusing on modern web development stacks like <strong className="text-white font-semibold">React, Next.js, and TypeScript</strong>. Writing clean, maintainable logic and optimized user-centric flows are at the core of my development philosophy.
              </p>
              
              {/* Social Links Row */}
              <div className="flex gap-4">
                {[
                  { 
                    title: "GitHub", 
                    href: "https://github.com/satabdimohanty", 
                    icon: (
                      <svg className="w-3.5 h-3.5 text-brand-accent-light group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    ) 
                  },
                  { 
                    title: "LinkedIn", 
                    href: "https://www.linkedin.com/in/satabdi-mohanty-561649218/", 
                    icon: (
                      <svg className="w-3.5 h-3.5 text-brand-accent-light group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                      </svg>
                    ) 
                  }
                ].map((social) => (
                  <a
                    key={social.title}
                    title={social.title}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group cursor-pointer rounded-lg bg-gradient-to-r from-brand-accent-light to-brand-accent-dark p-0.5 hover:scale-[1.02] transition-transform"
                  >
                    <div className="flex items-center gap-2 rounded-md bg-badge-bg px-4 py-2 text-xs text-white group-hover:bg-gradient-to-r group-hover:from-brand-accent-light group-hover:to-brand-accent-dark transition-all font-sans font-semibold">
                      {social.icon}
                      <span className="font-sans font-semibold">{social.title}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Layout Section */}
      <section id="skills" className="mx-auto mt-12 max-w-5xl px-6 lg:px-0 relative z-10 md:mt-20">
        <div className="border-t border-white/5 pt-12">
          {/* Circles icon */}
          <svg
            width="75"
            height="50"
            viewBox="0 0 75 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-brand-accent-light"
          >
            <circle cx="25" cy="25" r="15" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="50" cy="25" r="15" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
          </svg>
          <h3 className="font-syne text-3xl font-extrabold uppercase leading-none tracking-tight md:text-4xl mt-4">
            <span className="block text-white">My</span>
            <span className="block text-outline-orange mt-1">Skills</span>
          </h3>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">
          <div className="text-xl text-white">
            <div className="font-sans font-semibold">I build things for the people</div>
            <div className="font-serif font-normal italic text-zinc-400 text-2xl mt-1.5">Develop, Optimize, Deploy</div>
          </div>
          <div className="text-zinc-400 text-sm md:text-base leading-relaxed">
            My primary stack is Next.js with React, TypeScript, and Tailwind CSS. I specialize in building highly responsive interfaces, optimizing rendering cycles, and translating designs into clean, modular codebases. I aim to build unique, performant web modules that guarantee complete user engagement.
          </div>
        </div>

        {/* Capabilities Grid (Non-Tabbed) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SKILL_CATEGORIES.map((category, idx) => {
            const techList = TECH_STACK[category as keyof typeof TECH_STACK];
            const description = CATEGORY_DESCRIPTIONS[category as keyof typeof CATEGORY_DESCRIPTIONS];

            return (
              <div
                key={category}
                className="flex flex-col justify-between rounded-xl border border-zinc-800/80 magical-card-texture p-6 hover:border-brand-accent-light/30 hover:shadow-lg hover:shadow-brand-accent-light/5 transition-all duration-300"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                    <span className="font-sans text-[9px] uppercase tracking-widest text-[#8e9bb4] font-semibold">
                      Category 0{idx + 1}
                    </span>
                    <span className="font-sans text-[10px] font-semibold text-brand-accent-light tracking-wider uppercase">
                      {category === "AI_Assisted" ? "AI Assisted" : category}
                    </span>
                  </div>

                  {/* Card Title & Description */}
                  <h4 className="text-white font-sans font-semibold text-base mb-2">
                    {category === "Languages" && "Programming Languages"}
                    {category === "Frameworks" && "Frameworks & Runtimes"}
                    {category === "AI_Assisted" && "AI-Assisted Development"}
                    {category === "Tools" && "Development & Project Tools"}
                  </h4>
                  <p className="text-zinc-100 text-xs sm:text-[13px] leading-relaxed mb-6">
                    {description}
                  </p>
                </div>

                {/* Tech Badges Grid */}
                <div className="flex flex-wrap gap-2">
                  {techList.map((tech) => (
                    <div
                      key={tech.name}
                      className="group flex items-center gap-2 rounded-lg border border-zinc-800/60 bg-badge-bg px-2.5 py-1.5 cursor-default"
                      style={{
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = tech.color + "50";
                        e.currentTarget.style.boxShadow = `0 2px 10px ${tech.color}10`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "";
                        e.currentTarget.style.boxShadow = "";
                      }}
                    >
                      {getTechLogo(tech.name, tech.color)}
                      <span className="font-mono text-[10px] sm:text-xs text-zinc-300 font-semibold group-hover:text-white transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

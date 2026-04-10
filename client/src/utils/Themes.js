const THEMES = {
  default: {
    container: "bg-white text-gray-900",
    header: "bg-white text-gray-800 border-b border-gray-200",
    grid: "bg-white border-gray-200",
    cell: "border border-gray-200",
    buttonPrimary:
      "bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow",
    buttonSecondary: "bg-green-600 hover:bg-green-700 text-white shadow-sm",
    birthdayTag: "bg-blue-500 text-white border border-blue-200",
    birthdayDot: "bg-blue-400",
    day: {
      default: "hover:bg-gray-100 hover:ring-3 hover:ring-gray-200 transition",
      outside: "text-gray-400 hover:bg-gray-50 hover:text-gray-500",
      selected: "bg-blue-300 ring-3 ring-blue-300 shadow-sm",
      today:
        "border border-green-400 bg-green-300 ring-3 ring-green-300 font-semibold shadow-sm",
    },
    select: "border border-gray-300 bg-white text-gray-800 focus:ring-blue-400",
    option: "bg-white text-gray-800",
    optionSelected: "bg-blue-100 text-gray-800 font-semibold",
    title: "text-gray-800",
  },

  orange: {
    container: "bg-gray-200 text-gray-900",
    header: "bg-orange-500 text-white border-orange-600",
    grid: "bg-orange-100 border-gray-300",
    cell: "border-gray-300",
    buttonPrimary:
      "bg-orange-500 hover:bg-orange-400 text-white shadow-sm hover:shadow-lg",
    buttonSecondary:
      "bg-orange-700 hover:bg-orange-600 text-white shadow-sm hover:shadow-lg",
    birthdayTag:
      "text-orange-950 bg-gradient-to-t from-orange-400 to-orange-200",
    birthdayDot: "bg-orange-400",
    day: {
      default: "hover:bg-orange-400 hover:ring-2 hover:ring-orange-400",
      outside:
        "text-gray-400 border-gray-100 hover:bg-orange-400 hover:text-white hover:ring-2 hover:ring-orange-400",
      selected:
        "bg-orange-500 text-white ring-3 ring-orange-500 ring-opacity-40 shadow-md",
      today:
        "bg-orange-700 text-white ring-3 ring-orange-700 ring-opacity-40 shadow-md",
    },
    select:
      "border-2 border-orange-700 bg-orange-800 text-white focus:ring-orange-500",
    option: "bg-orange-800 text-white",
    optionSelected: "bg-orange-600 text-white font-bold",
    title: "text-orange-800",
  },

  teal: {
    container: "bg-gray-200 text-gray-900",
    header: "bg-teal-500 text-white border-teal-600",
    grid: "bg-teal-100 border-teal-300",
    cell: "border-teal-300",
    buttonPrimary:
      "bg-teal-500 hover:bg-teal-400 text-white shadow-sm hover:shadow-lg",
    buttonSecondary:
      "bg-teal-700 hover:bg-teal-600 text-white shadow-sm hover:shadow-lg",
    birthdayTag: "text-teal-950 bg-gradient-to-t from-teal-400 to-teal-200",
    birthdayDot: "bg-teal-400",
    day: {
      default: "hover:bg-teal-400 hover:ring-3 hover:ring-teal-400",
      outside:
        "text-gray-400 border-teal-100 hover:bg-teal-500 hover:text-white",
      selected: "bg-teal-500 text-white ring-3 ring-teal-500 shadow-md",
      today: "bg-teal-700 text-white ring-3 ring-teal-700 shadow-md",
    },
    select:
      "border-2 border-teal-700 bg-teal-800 text-white focus:ring-teal-500",
    option: "bg-teal-800 text-white",
    optionSelected: "bg-teal-600 text-white font-bold",
    title: "text-teal-800",
  },

  dark: {
    container: "bg-gray-900 text-gray-100",
    header: "bg-gray-800 text-gray-200 border-gray-700",
    grid: "bg-gray-800 border-gray-700",
    cell: "border-gray-700",
    buttonPrimary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 shadow-sm hover:shadow-lg",
    buttonSecondary:
      "bg-gray-700 text-white hover:bg-gray-600 shadow-sm hover:shadow-lg",
    birthdayTag: "text-gray-900 bg-gradient-to-t from-gray-300 to-gray-100",
    birthdayDot: "bg-gray-400",
    day: {
      default: "hover:bg-gray-500 hover:ring-3 hover:ring-gray-500",
      outside:
        "text-gray-500 border-gray-700 hover:bg-gray-700 hover:text-white",
      selected: "bg-gray-200 text-gray-900 ring-3 ring-gray-200 shadow-md",
      today: "bg-gray-700 text-white ring-3 ring-gray-700 shadow-md",
    },
    select:
      "border-2 border-gray-700 bg-gray-800 text-white focus:ring-gray-500",
    option: "bg-gray-800 text-white",
    optionSelected: "bg-gray-600 text-white font-bold",
    title: "text-white",
  },

  midnightPurple: {
    container: "bg-[#3c1b5c] text-white",
    header: "bg-purple-900 text-white border-purple-600",
    grid: "bg-purple-900 border-purple-600",
    cell: "border-purple-600",
    buttonPrimary:
      "bg-orange-500 hover:bg-orange-400 text-white shadow-sm hover:shadow-lg",
    buttonSecondary:
      "bg-purple-600 hover:bg-purple-500 text-white shadow-sm hover:shadow-lg",
    birthdayTag:
      "text-orange-950 bg-gradient-to-t from-orange-400 to-orange-200",
    birthdayDot: "bg-orange-400",
    day: {
      default: "hover:bg-orange-500 hover:ring-2 hover:ring-orange-500",
      outside:
        "text-gray-400 border-gray-400 hover:bg-orange-500 hover:text-white hover:ring-2 hover:ring-orange-500",
      selected:
        "bg-orange-700 text-white ring-3 ring-orange-700 ring-opacity-40 shadow-md",
      today:
        "bg-purple-600 text-white ring-3 ring-purple-600 ring-opacity-40 shadow-md",
    },
    select:
      "border-2 border-purple-700 bg-[#4b2270] text-white focus:ring-purple-500",
    option: "bg-[#4b2270] text-white",
    optionSelected: "bg-purple-600 text-white font-bold",
    title:
      "bg-gradient-to-t from-purple-600 via-pink-400 to-orange-600 bg-clip-text text-transparent",
  },
};

export default THEMES;

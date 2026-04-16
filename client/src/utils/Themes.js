const THEMES = {
  default: {
    container: "bg-gray-100 text-gray-900",
    header: "bg-gray-200 text-gray-800 border-gray-200",
    grid: "bg-gray-100 border-gray-200",
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
    upcoming: "bg-blue-500 text-white border border-blue-200 capitalize",
    allBirthdays: "bg-green-500 text-white border border-green-200 capitalize",
    action:
      "bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow",
    noNote: "text-gray-300",
    eye: "text-gray-800",
    footnote: "text-gray-700",
  },

  orange: {
    container: "bg-gray-100 text-gray-900",
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
    upcoming:
      "text-orange-950 bg-gradient-to-tl from-orange-400 to-orange-200 capitalize",
    allBirthdays:
      "text-orange-950 bg-gradient-to-t from-orange-600 to-orange-300 capitalize",
    action:
      "bg-amber-500 hover:bg-amber-400 text-white shadow-sm hover:shadow-lg",
    noNote: "text-gray-800",
    eye: "text-gray-800",
    footnote: "text-gray-700",
  },

  teal: {
    container: "bg-gray-100 text-gray-900",
    header: "bg-teal-500 text-white border-teal-600",
    grid: "bg-teal-100 border-gray-300",
    cell: "border-gray-300",
    buttonPrimary:
      "bg-teal-500 hover:bg-teal-400 text-white shadow-sm hover:shadow-lg",
    buttonSecondary:
      "bg-teal-700 hover:bg-teal-600 text-white shadow-sm hover:shadow-lg",
    birthdayTag: "text-teal-950 bg-gradient-to-t from-teal-400 to-teal-200",
    birthdayDot: "bg-teal-400",
    day: {
      default: "hover:bg-teal-400 hover:ring-3 hover:ring-teal-400",
      outside:
        "text-gray-400 border-gray-100 hover:bg-teal-500 hover:text-white",
      selected: "bg-teal-500 text-white ring-3 ring-teal-500 shadow-md",
      today: "bg-teal-700 text-white ring-3 ring-teal-700 shadow-md",
    },
    select:
      "border-2 border-teal-700 bg-teal-800 text-white focus:ring-teal-500",
    option: "bg-teal-800 text-white",
    optionSelected: "bg-teal-600 text-white font-bold",
    title: "text-teal-800",
    upcoming:
      "text-teal-950 bg-gradient-to-tl from-teal-400 to-teal-200 capitalize",
    allBirthdays:
      "text-teal-950 bg-gradient-to-t from-teal-600 to-teal-300 capitalize",
    action:
      "bg-teal-900 hover:bg-teal-700 text-white shadow-sm hover:shadow-lg",
    noNote: "text-gray-800",
    eye: "text-gray-800",
    footnote: "text-gray-700",
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
    upcoming:
      "text-gray-900 bg-gradient-to-tl from-gray-300 to-gray-50 capitalize",
    allBirthdays:
      "text-white bg-gradient-to-bl from-gray-500 via-gray-600 to-gray-800 capitalize",
    action:
      "bg-gray-200 hover:bg-gray-300 text-gray-900 shadow-sm hover:shadow-lg",
    noNote: "text-gray-300",
    eye: "text-gray-400",
    footnote: "text-gray-300",
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
    upcoming:
      "text-gray-100 bg-gradient-to-tl from-purple-700 to-pink-400 capitalize",
    allBirthdays:
      "text-white bg-gradient-to-tr from-purple-700 to-pink-500 capitalize",
    action:
      "bg-pink-500 hover:bg-pink-400 text-white shadow-sm hover:shadow-lg",
    noNote: "text-gray-300",
    eye: "text-gray-500",
    footnote: "text-gray-300",
  },

  dusk: {
    container: "bg-gradient-to-b from-[#2C3E50] to-[#1F2A36] text-white",
    header: "bg-[#3A5166] text-white border-[#3A5166]",
    grid: "bg-[#34495E] border-[#415b75]",
    cell: "border-[#415b75]",
    buttonPrimary:
      "bg-[#ff7a73] hover:bg-[#e7655d] text-white shadow-sm hover:shadow-lg",
    buttonSecondary:
      "bg-[#8F5992] hover:bg-[#7e4e81] text-white shadow-sm hover:shadow-lg",
    birthdayTag: "text-[#2C3E50] bg-gradient-to-t from-[#FD746C] to-[#FFB199]",
    birthdayDot: "bg-[#FD746C]",
    day: {
      default:
        "hover:bg-[#b973bd] hover:ring-2 hover:ring-[#b973bd] hover:text-white",
      outside:
        "text-gray-400 border-[#465c73] hover:bg-[#d283d6] hover:text-white hover:ring-2 hover:ring-[#d283d6]",
      selected: "bg-[#ff7a73] text-white ring-2 ring-[#ff7a73] shadow-md",
      today: "bg-[#8F5992] text-white ring-2 ring-[#8F5992] shadow-md",
    },
    select:
      "border border-[#415b75] bg-[#34495E] text-white focus:ring-[#8F5992]",
    option: "bg-[#34495E] text-white",
    optionSelected: "bg-[#8F5992] text-white font-semibold",
    title: "text-gray-200",
    upcoming:
      "text-gray-950 bg-gradient-to-t from-[#FD746C] to-[#FFB199] capitalize",
    allBirthdays:
      "text-white bg-gradient-to-tr from-[#8F5992] to-[#d283d6] capitalize",
    action:
      "bg-[#ff7a73] hover:bg-[#e7655d] text-white shadow-sm hover:shadow-lg",
    noNote: "text-gray-300",
    eye: "text-gray-400",
    footnote: "text-gray-300",
  },

  blueSky: {
    container: "bg-[#0960ba] text-white",
    header: "bg-[#187fed] text-white border-[#187fed]",
    grid: "bg-[#3a8fe8] border-[#5aa9f2]",
    cell: "border-[#5aa9f2]",
    buttonPrimary:
      "bg-[#f7cb14] hover:bg-[#edc002] text-gray-800 shadow-sm hover:shadow-lg",
    buttonSecondary:
      "bg-[#56ccf2] hover:bg-[#3fbbe6] text-[#1f2a36] shadow-sm hover:shadow-lg",
    birthdayTag: "text-[#1f2a36] bg-gradient-to-br from-[#FFDE42] to-[#c49f02]",
    birthdayDot: "bg-[#ffdb33]",
    day: {
      default:
        "hover:bg-[#5aa9f2] hover:ring-2 hover:ring-[#5aa9f2] hover:text-white",
      outside:
        "text-blue-200 border-[#5aa9f2] hover:bg-[#79bbf7] hover:text-white hover:ring-2 hover:ring-[#79bbf7]",
      selected: "bg-[#f7cb14] text-gray-800 ring-2 ring-[#f7cb14] shadow-md",
      today: "bg-[#56ccf2] text-gray-800 ring-2 ring-[#56ccf2] shadow-md",
    },
    select:
      "border border-[#5aa9f2] bg-[#3a8fe8] text-white focus:ring-[#49a5f0]",
    option: "bg-[#3a8fe8] text-white",
    optionSelected: "bg-[#49a5f0] text-white font-semibold",
    title: "text-[#ffefff]",
    upcoming:
      "text-[#1f2a36] bg-gradient-to-br from-[#FFDE42] to-[#c49f02] capitalize",
    allBirthdays:
      "text-[#1f2a36] bg-gradient-to-br from-[#cfefff] to-[#56ccf2] capitalize shadow-md",
    action:
      "bg-[#f7cb14] hover:bg-[#edc002] text-[#1f2a36] shadow-sm hover:shadow-lg",
    noNote: "text-gray-700",
    eye: "text-gray-700",
    footnote: "text-gray-300",
  },
};

export default THEMES;

const DateFormatter = (previousDate, options = {}) => {
  if (!previousDate) return "";

  const date = new Date(previousDate);

  return date.toLocaleDateString(options.langage || "fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: options.timeZone || "Europe/Paris",
  });
};

export default DateFormatter;

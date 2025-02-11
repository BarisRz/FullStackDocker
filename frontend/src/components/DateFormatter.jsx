import { useMemo } from "react";

const DateFormatter = (isoDate, options = {}) => {
  return useMemo(() => {
    if (!isoDate) return "";

    const date = new Date(isoDate);

    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: options.timeZone || "Europe/Paris",
    });
  }, [isoDate, options]);
};

export default DateFormatter;

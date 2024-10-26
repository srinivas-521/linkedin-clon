import { parseISO, format } from 'date-fns';

export function formatDate(dateString) {
  if (!dateString) return "";
  const trimmedDate = dateString.trim(); // Trim whitespace
  try {
    return format(parseISO(trimmedDate), "MM-dd-yyyy");
  } catch (error) {
    console.error("Invalid date:", trimmedDate);
    return "";
  }
}

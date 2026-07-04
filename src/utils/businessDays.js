/**
 * businessDays.js — Business-day scheduling helpers (excludes weekends).
 */

export const addBusinessDays = (startDate, days) => {
  const result = new Date(startDate);
  let added = 0;

  while (added < days) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) {
      added += 1;
    }
  }

  return result;
};

export const getMinimumCompletionDate = (fromDate = new Date(), leadDays = 5) => {
  const normalized = new Date(fromDate);
  normalized.setHours(0, 0, 0, 0);
  return addBusinessDays(normalized, leadDays);
};

export const isValidCompletionDate = (dateString, fromDate = new Date(), leadDays = 5) => {
  if (!dateString) {
    return false;
  }

  const selected = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(selected.getTime())) {
    return false;
  }

  const minimum = getMinimumCompletionDate(fromDate, leadDays);
  return selected >= minimum;
};

export const formatDateLabel = (dateString) => {
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
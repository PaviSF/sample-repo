export const convertUTCToIST = (utcTimestamp: number): string => {
  const date = new Date(utcTimestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

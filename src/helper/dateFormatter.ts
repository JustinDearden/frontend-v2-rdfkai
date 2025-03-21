export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Converts a date string into a human-readable, localized date-time format.
 *
 * This function takes a date string as input, creates a Date object, and then formats it using
 * the `toLocaleString` method with specific options. Here’s what happens step-by-step:
 *
 * 1. **Input Conversion:**
 *    - The function accepts a `dateString` that is expected to be in a format that JavaScript’s Date constructor can parse.
 *    - It creates a Date object from the string using `new Date(dateString)`.
 *
 * 2. **Formatting the Date:**
 *    - It calls the `toLocaleString` method on the Date object.
 *    - The first parameter is set to `undefined`, so it defaults to the host environment’s locale,
 *      making the function automatically adjust to different international settings.
 *    - The options object passed to `toLocaleString` includes:
 *        - `year: 'numeric'`: displays the full year (e.g., 2025)
 *        - `month: 'short'`: displays the abbreviated month name (e.g., Jan, Feb)
 *        - `day: 'numeric'`: displays the day of the month
 *        - `hour: '2-digit'` and `minute: '2-digit'`: display time with two-digit hours and minutes.
 *
 * 3. **Return Value:**
 *    - It returns a formatted string that includes the date and time.
 *
 * **Potential Interview Follow-Up Questions:**
 * - *Error Handling:*
 *   What happens if `dateString` is invalid?
 *   (The current implementation does not handle invalid date strings, which would result in an "Invalid Date" object.)
 *
 * - *Locale Considerations:*
 *   Why use `undefined` for the locale?
 *   (This allows the function to default to the user’s current locale, enhancing internationalization.)
 *
 * - *Customization:*
 *   How could you modify the function to include seconds or switch to a 24-hour format?
 *   (You can add additional options to the `toLocaleString` method.)
 *
 * - *Time Zones:*
 *   Does this function handle time zones correctly?
 *   (It relies on the system’s time zone; for more control, you might consider using libraries like date-fns or moment.js.)
 */

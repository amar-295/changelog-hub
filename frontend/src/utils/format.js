/**
 * Shared formatting utilities used across release components.
 */

/**
 * Strips HTML tags and returns plain text content.
 * @param {string} html - HTML string to strip.
 * @returns {string} Plain text content.
 */
export function stripHtml(html) {
  if (!html) return '';
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

/**
 * Extracts initials from a name string (up to 2 characters).
 * @param {string} name - Full name.
 * @returns {string} Uppercase initials.
 */
export function getInitials(name = '') {
  return (
    name
      .split(' ')
      .map((w) => w[0] ?? '')
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'U'
  );
}

/**
 * Generates a deterministic hue value (0-360) from a name string.
 * Used for generating consistent avatar background colors.
 * @param {string} name - Name to hash.
 * @returns {number} Hue value between 0 and 360.
 */
export function getHue(name = '') {
  const a = name.charCodeAt(0) ?? 65;
  const b = name.charCodeAt(name.length - 1) ?? 65;
  return (a * 37 + b * 13) % 360;
}

/**
 * Formats a date string into a human-readable label.
 * @param {string|Date} date - Date to format.
 * @param {Intl.DateTimeFormatOptions} [options] - Optional format options.
 * @returns {string} Formatted date string like "Mar 05, 2026".
 */
export function formatDate(date, options) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString(
    'en-US',
    options || { month: 'short', day: '2-digit', year: 'numeric' }
  );
}

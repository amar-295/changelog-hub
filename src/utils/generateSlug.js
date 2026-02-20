export default function generateSlug(title) {
    return title
        .toLowerCase()                          // "v2.1.0 — dark mode 🌙 released!"
        .trim()                                 // remove leading/trailing spaces
        .replace(/[^\w\s-]/g, "")            // remove special chars (emojis, —, dots)
        .replace(/\s+/g, "-")                 // replace spaces with hyphens
        .replace(/-+/g, "-")                   // replace multiple hyphens with a single hyphen
        .replace(/^-|-$/g, "")                // remove leading/trailing hyphens
}
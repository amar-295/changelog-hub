import slugify from "slugify";

export default function generateSlug(title) {
    return slugify(title, {
        lower: true,      // convert to lower case
        strict: true,     // strip special characters except replacement
        trim: true,       // trim leading and trailing replacement chars
    });
}
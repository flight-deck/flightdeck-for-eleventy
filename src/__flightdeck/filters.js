const { DateTime } = require("luxon"); //bundled with 11ty
const site = require("../_data/site");

module.exports = (config) => {
  /**
   * Human readable dates
   * @example {{ page.date | postDate }}
   */
  config.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
  config.addFilter("postDateTime", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATETIME_MED);
  });

  /**
   * Prefixes the given URL with the site's base URL.
   * @example {{ page.url | domain }}
   */
  config.addFilter("domain", (url) => {
    return new URL(url, site.baseUrl).href;
  });

  /**
   * Return a subset of array items limited to the passed number
   * @example {{ for item in collections.all | limit(3) }}
   */
  config.addFilter("limit", (arr, limit) => {
    return arr.slice(0, limit);
  });

  /**
   * Returns the first 200 characters as the excerpt
   * @example {{ post.templateContent | excerpt }}
   */
  config.addFilter("excerpt", (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, "");
    return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
  });

  /**
   * Useful if using a value such as layout - which returns the full filename
   * @example <body class="layout--{{ layout | stripFilename }}">
   */
  config.addFilter("stripFilename", (file) => {
    return file.replace(/\.[^/.]+$/, "");
  });
};

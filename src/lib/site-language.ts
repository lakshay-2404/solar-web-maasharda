export type SiteLanguage = "hi" | "en";

export const DEFAULT_SITE_LANGUAGE: SiteLanguage = "hi";

const ENGLISH_PREFIX = "/en";

function splitSuffix(path: string) {
  const queryIndex = path.indexOf("?");
  const hashIndex = path.indexOf("#");
  const cutIndex =
    queryIndex === -1
      ? hashIndex
      : hashIndex === -1
        ? queryIndex
        : Math.min(queryIndex, hashIndex);

  return cutIndex === -1
    ? { pathname: path, suffix: "" }
    : {
        pathname: path.slice(0, cutIndex),
        suffix: path.slice(cutIndex),
      };
}

export function isEnglishPath(pathname: string) {
  return pathname === ENGLISH_PREFIX || pathname.startsWith(`${ENGLISH_PREFIX}/`);
}

export function getLanguageFromPathname(pathname: string): SiteLanguage {
  return isEnglishPath(pathname) ? "en" : DEFAULT_SITE_LANGUAGE;
}

export function stripLanguagePrefix(pathname: string) {
  if (!isEnglishPath(pathname)) {
    return pathname || "/";
  }

  const trimmedPath = pathname.slice(ENGLISH_PREFIX.length);
  return trimmedPath || "/";
}

export function withLanguagePath(path: string, language: SiteLanguage) {
  if (
    !path ||
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:")
  ) {
    return path;
  }

  if (path.startsWith("#")) {
    return `${language === "en" ? ENGLISH_PREFIX : ""}/${path}`.replace("/#", "#");
  }

  const { pathname, suffix } = splitSuffix(path);
  const basePath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const plainPath = stripLanguagePrefix(basePath);

  if (language === "en") {
    return `${plainPath === "/" ? ENGLISH_PREFIX : `${ENGLISH_PREFIX}${plainPath}`}${suffix}`;
  }

  return `${plainPath}${suffix}`;
}

export function toggleLanguagePath(pathname: string) {
  const currentLanguage = getLanguageFromPathname(pathname);
  return withLanguagePath(
    stripLanguagePrefix(pathname),
    currentLanguage === "en" ? "hi" : "en"
  );
}

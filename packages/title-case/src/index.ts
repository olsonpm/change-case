const TOKENS = /\S+|./g;
const IS_MANUAL_CASE = /\p{Ll}(?=[\p{Lu}])|\.\p{L}/u; // iPhone, example.com, U.N., etc.
const ALPHANUMERIC_PATTERN = /[\p{L}\d]+/gu;

const WORD_SEPARATORS = new Set(["—", "–", "-", "―", "/"]);

const SMALL_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "because",
  "but",
  "by",
  "en",
  "for",
  "if",
  "in",
  "neither",
  "nor",
  "of",
  "on",
  "only",
  "or",
  "over",
  "per",
  "so",
  "some",
  "than",
  "that",
  "the",
  "to",
  "up",
  "upon",
  "v",
  "versus",
  "via",
  "vs",
  "when",
  "with",
  "without",
  "yet",
]);

export interface Options {
  smallWords?: Set<string>;
  locale?: string | string[];
}

export function titleCase(
  input: string,
  options: Options | string[] | string = {},
) {
  let result = "";
  let m: RegExpExecArray | null;

  const { smallWords = SMALL_WORDS, locale } =
    typeof options === "string" || Array.isArray(options)
      ? { locale: options }
      : options;

  // tslint:disable-next-line
  while ((m = TOKENS.exec(input)) !== null) {
    const { 0: token, index } = m;

    // Ignore already capitalized words.
    if (IS_MANUAL_CASE.test(token)) {
      result += token;
    } else {
      result += token.replace(ALPHANUMERIC_PATTERN, (m, i) => {
        // Ignore small words except at beginning or end.
        if (
          index > 0 &&
          index + token.length < input.length &&
          smallWords.has(m)
        ) {
          return m;
        }

        // Only capitalize words after a valid word separator.
        if (i > 1 && !WORD_SEPARATORS.has(input.charAt(index + i - 1))) {
          return m;
        }

        return m.charAt(0).toLocaleUpperCase(locale) + m.slice(1);
      });
    }
  }

  return result;
}

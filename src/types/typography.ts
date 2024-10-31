type variation = {
  fontWeight: number;
  fontSize: string;
}

export interface Typography {
  fontFamily: string;
  lineHeight?: string;
  letterSpacing?: string;
  h1: variation;
  h2: variation;
  h3: variation;
  h4: variation;
  h5: variation;
  title: variation;
  caption: variation;
  subtitle1: variation;
  subtitle2: variation;
  body1: variation;
  body2: variation;
  button: variation;
  overline: variation;
}

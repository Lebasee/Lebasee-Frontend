export type FontWeight = "normal" | "bold";

export interface Typography {
  fontFamily: string;
  lineHeight?: string;
  letterSpacing?: string;
  body: {
    fontWeight: FontWeight;
    fontSize: string;
  };
  bodyBold: {
    fontWeight: FontWeight;
    fontSize: string;
  };
  h1: {
    fontWeight: FontWeight;
    fontSize: string;
  };
  h1Bold: {
    fontWeight: FontWeight;
    fontSize: string;
  };
  h2: {
    fontWeight: FontWeight;
    fontSize: string;
  };
  h2Bold: {
    fontWeight: FontWeight;
    fontSize: string;
  }
  h3: {
    fontWeight: FontWeight;
    fontSize: string;
  };
  h3Bold: {
    fontWeight: FontWeight;
    fontSize: string;
  };
  h4: {
    fontWeight: FontWeight;
    fontSize: string;
  };
  h4Bold: {
    fontWeight: FontWeight;
    fontSize: string;
  };
  h5: {
    fontWeight: FontWeight;
    fontSize: string;
  };
  h5Bold: {
    fontWeight: FontWeight;
    fontSize: string;
  };
  title: {
    fontWeight: FontWeight;
    fontSize: string;
  };
  titleBold: {
    fontWeight: FontWeight;
    fontSize: string;
  };
  caption: {
    fontWeight: FontWeight;
    fontSize: string;
  };
  captionBold: {
    fontWeight: FontWeight;
    fontSize: string;
  };

}

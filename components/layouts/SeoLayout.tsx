﻿import { ReactElement } from "react";
import { DefaultSeo } from "next-seo";

export type SeoLayoutProps = {
  children: ReactElement | string;
};

const SeoLayout = ({ children }: SeoLayoutProps) => {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "ru_ru",
          url: "https://pastemd.gbms.site",
          site_name: "Paste.md",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      {children}
    </>
  );
};

export default SeoLayout;

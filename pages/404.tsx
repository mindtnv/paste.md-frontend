import NotFound from "../components/NotFound";
import { NextSeo } from "next-seo";

const NotFoundPage = () => {
  return (
    <>
      <NextSeo title="Paste.md | 404" description="Not Found" />
      <NotFound text="Page not found 👽" />;
    </>
  );
};

export default NotFoundPage;

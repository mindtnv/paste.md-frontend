const Fonts = () => {
  return (
    <style jsx global>{`
      @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap");

      @font-face {
        font-family: "Iosevka";
        font-display: swap;
        font-weight: 400;
        font-stretch: normal;
        font-style: normal;
        src: url("/iosevka-regular.ttf") format("truetype"),
          url("/iosevka-regular.woff2") format("woff2");
      }

      @font-face {
        font-family: "Iosevka";
        font-display: swap;
        font-weight: 700;
        font-stretch: normal;
        font-style: normal;
        src: url("/iosevka-bold.ttf") format("truetype"),
          url("/iosevka-bold.woff2") format("woff2");
      }

      @font-face {
        font-family: "Iosevka";
        font-display: swap;
        font-weight: 600;
        font-stretch: normal;
        font-style: italic;
        src: url("/iosevka-bolditalic.ttf") format("truetype"),
          url("/iosevka-bolditalic.woff2") format("woff2");
      }
    `}</style>
  );
};

export default Fonts;

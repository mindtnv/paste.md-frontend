import {EditorView, Extension} from "@uiw/react-codemirror";
import {tags} from "@lezer/highlight";
import {HighlightStyle, syntaxHighlighting} from "@codemirror/language";

//https://material-theme.com/docs/reference/color-palette/
export const materialOceanTheme = EditorView.baseTheme({
  "&": {
    backgroundColor: "#0F111A",
    color: "#8F93A2",
  },
  ".cm-scroller": {
    fontFamily: "inherit",
    scrollbarGutter: "stable",
    scrollbarWidth: "thin",
  },
  ".cm-scroller::-webkit-scrollbar-corner": {
    display: "none",
  },
  ".cm-scroller::-webkit-scrollbar": {
    width: ".6rem",
    height: ".6rem",
  },
  ".cm-scroller::-webkit-scrollbar-track": {
    backgroundColor: "#FFFFFF15",
    borderRadius: "5px",
  },
  ".cm-scroller::-webkit-scrollbar-thumb": {
    backgroundColor: "#FFFFFF30",
    outlineRight: "1px solid #FFFFFF30",
    borderRadius: "5px",
  },
  ".cm-gutters": {
    borderTopLeftRadius: "6px",
    borderBottomLeftRadius: "6px",
    background: "#0F111A",
    color: "#464B5D",
    border: "none",
  },
  ".cm-cursor": {
    borderLeft: "1px solid #FFCC00",
  },
  ".cm-fat-cursor": {
    background: "#FFCC00 !important",
    outline: "solid 1px #FFCC00 !important",
  },
  "&.cm-focused .cm-selectionBackground, ::selection, .cm-selectionMatch": {
    backgroundColor: "rgba(113, 124, 180, 0.2) !important",
  },
  ".cm-activeLine": {
    background: "rgba(0, 0, 0, 0.5)",
  },
  ".cm-foldPlaceholder": {
    backgroundColor: "#0F111A !important",
    color: "#8F93A2 !important",
    borderColor: "#8F93A2 !important",
  },
});

export const materialOceanHighlight = HighlightStyle.define([
  {tag: tags.keyword, color: "#C792EA"},
  {tag: tags.operator, color: "#89DDFF"},
  {tag: tags.typeName, color: "#f07178"},
  {tag: tags.atom, color: "#F78C6C"},
  {tag: tags.number, color: "#FF5370"},
  {tag: tags.definitionKeyword, color: "#82AAFF"},
  {tag: tags.definitionOperator, color: "#82AAFF"},
  {tag: tags.string, color: "#C3E88D"},
  {tag: tags.variableName, color: "#f07178"},
  {tag: tags.tagName, color: "#FF5370"},
  {tag: tags.meta, color: "#FFCB6B"},
  {tag: tags.attributeName, color: "#C792EA"},
  {tag: tags.propertyName, color: "#C792EA"},
  {tag: tags.quote, color: "#DECB6B"},
  {tag: tags.bracket, color: "#82AAFF"},
  {tag: tags.link, color: "#80cbc4"},
  {tag: tags.comment, color: "#464B5D", fontStyle: "italic"},
]);

export const materialOcean: Extension = [
  materialOceanTheme,
  syntaxHighlighting(materialOceanHighlight),
];

import { EditorView, Extension } from "@uiw/react-codemirror";
import { tags } from "@lezer/highlight";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";

//https://material-theme.com/docs/reference/color-palette/
export const materialLighterTheme = EditorView.baseTheme({
  "&": {
    backgroundColor: "#FAFAFA",
    color: "#546E7A",
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
    // borderTopLeftRadius: "6px",
    // borderBottomLeftRadius: "6px",
    background: "#FAFAFA",
    color: "#546E7A",
    border: "none",
  },
  ".cm-cursor": {
    borderLeft: "1px solid #f6a434",
  },
  ".cm-fat-cursor": {
    background: "#f6a434 !important",
    outline: "solid 1px #f6a434 !important",
  },
  "&.cm-focused .cm-selectionBackground, ::selection, .cm-selectionMatch": {
    backgroundColor: "#80CBC440 !important",
    color: "#546e7a !important",
  },
  ".cm-activeLine": {
    background: "#E7E7E8",
  },
  ".cm-foldPlaceholder": {
    backgroundColor: "#0F111A !important",
    color: "#8F93A2 !important",
    borderColor: "#8F93A2 !important",
  },
  ".cm-vim-panel": {
    backgroundColor: "transparent",
    color: "#8F93A2",
  },
  ".cm-panels": {
    backgroundColor: "transparent",
  },
});

export const materialOceanHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: "#7c4dff" },
  { tag: tags.operator, color: "#89DDFF" },
  { tag: tags.typeName, color: "#f07178" },
  { tag: tags.atom, color: "#F78C6C" },
  { tag: tags.number, color: "#F76D47" },
  { tag: tags.definitionKeyword, color: "#6182b8" },
  { tag: tags.definitionOperator, color: "#6182b8" },
  { tag: tags.string, color: "#91b859" },
  { tag: tags.variableName, color: "#f07178" },
  { tag: tags.tagName, color: "#E53935" },
  { tag: tags.meta, color: "#f6a434" },
  { tag: tags.attributeName, color: "#7c4dff" },
  { tag: tags.propertyName, color: "#7c4dff" },
  { tag: tags.quote, color: "#f76d47" },
  { tag: tags.bracket, color: "#6182b8" },
  { tag: tags.link, color: "#80cbc4" },
  { tag: tags.comment, color: "#AABFC9", fontStyle: "italic" },
]);

export const materialLighter: Extension = [
  materialLighterTheme,
  syntaxHighlighting(materialOceanHighlight),
];

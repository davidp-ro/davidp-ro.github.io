// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "img.svelte-1px73g6{height:256px !important;width:256px !important;box-shadow:0px 0px 20px 18px #aaa;transition:transform .3s}img.svelte-1px73g6:hover{box-shadow:0px 0px 20px 18px var(--imageShadowColor);transform:scale(1.2)}@media only screen and (max-width: 769px){img.svelte-1px73g6{height:156px !important;width:156px !important}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
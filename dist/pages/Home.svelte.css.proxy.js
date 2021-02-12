// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "section.svelte-7henp0{display:block;background:#eee;height:100%;width:100%;padding:4rem;box-sizing:border-box}@media only screen and (max-width: 769px){section.svelte-7henp0{padding:1rem}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
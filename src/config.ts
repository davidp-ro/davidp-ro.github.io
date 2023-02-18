import type { SocialObjects } from "./types";

export const SITE = {
  website: "https://astro-paper.pages.dev/",
  author: "Sat Naing",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "David Pescariu",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/davidp-ro",
    linkTitle: `My Github - @davidp-ro`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/davidpescariu/",
    linkTitle: `My LinkedIn - @davidpescariu`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/david.pescariu/",
    linkTitle: `My Instagram - @david.pescariu`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/pescariu.david",
    linkTitle: `My Facebook - @pescariu.david`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:yourmail@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
  {
    name: "Twitter",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  {
    name: "CodePen",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on CodePen`,
    active: false,
  },
  {
    name: "GitLab",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on GitLab`,
    active: false,
  },
  {
    name: "Reddit",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Reddit`,
    active: false,
  },
];

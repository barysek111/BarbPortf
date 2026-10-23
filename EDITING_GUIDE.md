# How to edit the website text

All of the words on the public site live in one folder:

`src/copy-database/`

Edit those files, then commit and push. Cloudflare publishes the site from GitHub. You do not need to change components, layout, or settings.

## Which file is which page

| File | What it changes |
|---|---|
| `global.ts` | Your name, the browser title, the short site description, email, clock label, resume and LinkedIn links, menu labels, footer, and small labels that repeat on every page |
| `home.ts` | The top of the home page, the services list, and the "what I do" paragraph. Services and "what I do" also show on the About page. |
| `works.ts` | The works heading, the grid/list labels, and every project card (title, short description, client, services, year, place, pictures) |
| `about.ts` | The About page, including jobs and education |
| `playground.ts` | The Playground headline and the experiment pictures |
| `archive.ts` | The internal archive page only. It is not on the public site. |
| `project-library-drift.ts` | The Library Drift project page |
| `project-plinto.ts` | The Plinto project page |
| `project-powermatch.ts` | The Powermatch project page |
| `project-ageras.ts` | The Ageras project page |
| `project-cococare.ts` | The Coco Care project page. It also keeps one old chapter that is hidden from that page. |
| `project-rokokobrand.ts` | The Rokoko brand project page |
| `project-rokokoweb.ts` | The Rokoko website project page |
| `project-weld.ts` | The Weld project page |
| `project-eatgrim.ts` | The Eat Grim project page |

The web address of a project is the `slug` line, for example `plinto` means the page is `/plinto`. Do not change a slug.

## How to change a sentence

1. Open the file for that page.
2. Find the sentence inside quotes.
3. Change the words. Leave the quote marks where they are.
4. An apostrophe inside a sentence is fine: `I'm` and `don't`.
5. Some years use a curly apostrophe, like `(’26–present)`. If you retype that mark as a straight `'`, the year will look slightly different. That is the only reason to be careful with it.
6. Do not delete commas, brackets `[ ]`, or braces `{ }`.

## How to add or remove a list item

Services, jobs, schools, project cards, and chapters are lists. Each item is one block wrapped in `{ }`, with commas between blocks.

- To add one, copy a whole block, paste it next to the others, and change the words.
- To remove one, delete that whole block, including its comma.
- Keep the last block's comma style the same as the others. If every block ends with a comma, leave those commas.

A project card in `works.ts` and the matching `project-....ts` file are a pair. The card is the short text on the home page. The project file is the long page. Editing one does not edit the other.

## How to replace a picture

Picture paths look like `/images/works/ageras/ageras-hero.png`.

1. Put the new image file in the same folder under `public` (the path above is `public/images/works/ageras/ageras-hero.png`).
2. In the copy file, replace the path in `src`, or the card path in `image`.
3. On a project card, also update `imageWidth` and `imageHeight` to the new picture's real pixel size. If you skip that, the card shape will be wrong.

`alt` is the description a screen reader reads. Leave it as `""` when the picture is only decorative. If the picture explains something, write a short description inside the quotes.

## What usually breaks the build

- A missing comma between two blocks
- A deleted quote
- A deleted `{` or `}`
- Changing a label on the left, such as `title:` or `slug:`
- A slug in `works.ts` that does not have the same slug in a `project-` file, or the other way around

If the build fails, the error usually names the file and the line. Undo your last edit and try a smaller change.

## Adding a brand new project

That needs more than a new text file. The new project has to be registered so the site knows its address. Use a developer, or ask an AI assistant, for a new project. Editing the words of a project that already exists is safe to do yourself.

## How to publish

1. In GitKraken, review the changes.
2. Commit them on your current branch.
3. Push to GitHub.

Cloudflare rebuilds the live site from that push. You do not need to change Cloudflare settings when you only change text.

## Files you should not edit for wording

These are not the text of the site:

- `src/content/case-studies/generated/` — old notes. The site does not read them. Editing them changes nothing on the website.
- `src/content/projects.ts` and `src/content/case-studies/index.ts` — they connect the pages. They are not where you write sentences.
- `src/app/design-system/page.tsx` — an internal catalogue, not a public page.

# Studio

Studio is a [Tailwind Plus](https://tailwindcss.com/plus) site template built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Getting started

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Customizing

You can start editing this template by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

## License

This site template is a commercial product and is licensed under the [Tailwind Plus license](https://tailwindcss.com/plus/license).

## Admin panel

The admin panel at `/admin` allows editing site content (community section, events, writings) and publishing changes directly to the repo via the GitHub API.

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_GITHUB_PAT` | Yes | Fine-Grained PAT with read/write Contents scope for `Lastofthefirst/winnipeg` |

Set in Cloudflare Pages dashboard for production, or in `.env.local` for local dev. The `NEXT_PUBLIC_` prefix is required — Next.js only exposes vars with that prefix to client-side code.

### Admin password

| Variable | Required | Description |
|---|---|---|
| `CMS_PASSWORD` | Yes | Shared password for the login screen |

Set in Cloudflare Pages dashboard. Default in `.env.local` is `w1nn3p3g-c0mmun1ty-2026`.

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Framer Motion](https://www.framer.com/docs/) - the official Framer Motion documentation
- [MDX](https://mdxjs.com/) - the official MDX documentation

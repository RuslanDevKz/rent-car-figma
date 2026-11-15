# Rentcars

Responsive React, TypeScript and Tailwind CSS implementation of the Rentcars landing page.

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
npm run build
```

[Source Figma frame](https://www.figma.com/design/BGjhYkmfreVOZFFtWfviGZ/Rent-Car---Landing-page--Community---Copy-?node-id=12-16330). Original image and vector assets are in `public/figma`. Poppins is served locally. The reference is 1440 × 4979; tablet and phone layouts reflow the same content because the source has no mobile frame.

The search form, mobile menu and vehicle detail dialogs work in the browser. Live availability, online booking and account services require a backend.

## Deployment

When ready, push the source and `package-lock.json` to a GitHub repository with `main` as its default branch. GitHub Actions checks the build on pushes to `main` and on pull requests.

Import that repository into Vercel from its project root. The checked-in `vercel.json` selects Vite, installs with `npm ci`, runs `npm run build`, and serves `dist`. No environment variables are required for the current frontend.

To serve the production build locally, run `npm run build` followed by `npm run preview`.

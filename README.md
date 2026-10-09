# Om Adem storefront prototype

The existing storefront layout and motion use Om Adem’s catalog from `../organized Products`. The source folder stays read-only. The client’s product photographs are copied into `assets/products/organized/`; reviews and conversation screenshots are not copied into the public build.

## Run locally

From this folder:

~~~powershell
npm run typecheck
npm run lint
npm test
npm run build
python -m http.server 4174 --directory dist
~~~

Open <http://127.0.0.1:4174/>. The build creates 22 direct-entry routes: home, eight collections, twelve products, and the checkout demonstration.

## Catalog and brand editing

- `src/catalog.js`: twelve product records, prices, options, copy, image paths, and eight collections.
- `src/site-config.js`: brand, currency, contact, delivery, and preview mode.
- `src/app.js`: reusable storefront and shopping interactions.
- `storefront.css`: existing visual design and animations.
- `scripts/import-organized-products.ps1`: repeatable read-only copy of the source product JPEGs. New source photos require updating this importer and the relevant `photoCount` or image mapping in `src/catalog.js`.
- `assets/brand-logo.svg`: place the approved final logo here and set `brand.logoReady` to `true` in `src/site-config.js`. The shared brand component is `brandMarkup()` in `src/app.js`.

The cart and favorites use browser local storage. Checkout and newsletter forms are non-submitting local demonstrations; there is no live order service, admin dashboard, payment provider, or database in this prototype. Confirm the owner’s product details and delivery terms before using it for orders.

See `CATALOG_IMPORT_REPORT.md` for import counts and missing information.

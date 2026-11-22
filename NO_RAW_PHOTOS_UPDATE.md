# No raw photos in the galleries — 21 November 2026 (evening)

The user's request: Rayda's own photos are material for the UGC pipeline and must not be shown as she sent them. This round replaces every one of them, on this morning's pieces and on the older ones.

## What changed

- **No gallery shows a photo as Rayda sent it.** 107 photos: 22 CreateUGC scenes and 85 ChatGPT photos made from her photos. Her photos stay in the folder as `<id>-<nn>.jpg`; nothing shows them.
- **Love bottle** (`bouteille-amour`): a CreateUGC scene (bottle of water on a dining table with roses) and two ChatGPT photos (bedside table, oak table).
  - The image tools drew the bottle plain. Her real print was then laid onto its two visible faces from her photos, so every verse is hers.
  - The face with the three verses and Ayat al-Kursi comes from her first photo. The other face comes from her first photo too, except its last block (Al-Falaq), which her bamboo leaf hides there and which comes from her third photo. That face is small and soft in all her photos, so it is soft here too.
- **Four energy keyrings**: each has a CreateUGC scene, then two ChatGPT photos (held by its ring, laid on linen).
  - Every photo's writing was compared with her photo stroke by stroke (her photo warped onto the new one). The four scenes and the Amour and Protection ChatGPT photos matched.
  - On the Chance and Voyage ChatGPT photos the verse under the gold leaf was wrong («فتحنا» and «فيها بسم الله مجراها» came out garbled). That band was replaced with the scene's, which matches hers. A stray red ring at the Protection keyring's chain hole was replaced the same way.
- **BaZi necklace**: the worn photo, then her three necklaces laid flat (ChatGPT, one per necklace). **BaZi bracelets**: her eight new bracelets as eight ChatGPT photos (`modele-a` … `modele-h`). **Learning necklaces**: two ChatGPT photos (cord, gold chain).
- **Key necklace**: the scene, then the large flowered key and the small clover key (ChatGPT).
- **Arbre de Vie keyring**: two ChatGPT photos (on linen, on a tote bag). No scene.
- **Feng Shui coins**: the scene, then two ChatGPT photos (on linen, on a console). ChatGPT redrew the characters, so her real coins were laid in from her photo, as on the scene. They are as soft as her photo.
- **Glass bottle** and **Fleur de Vie car pendant**: only their scene for now (one photo, so no arrows). The line under it reads "La photo est une mise en scène créée à partir des photos de Rayda." / "الصورة مشهد مُعَدّ انطلاقًا من صور رايدا."
- **Accompagnement page**: shows the new BaZi necklace worn (`collier-bazi-ai-porte.jpg`) instead of her photo of the earlier necklace.
- The line under every other gallery is back to "Les photos sont des mises en scène créées à partir des photos de Rayda." / "الصور مشاهد مُعَدّة انطلاقًا من صور رايدا."

## Not done

- **Glass bottle, more photos:** its print has coloured circles, crowns and two yellow labels besides the red verses. Two plain ChatGPT bottles are ready (`bouteille-verre-bureau-base.png`, `-cuisine-base.png`), but laying the whole print in is not done.
- **Fleur de Vie car pendant, more photos:** ChatGPT drew «خير» without the dot of its first letter («حير») three times, so its two photos are not used.
- **Love bottle:** close-up photos of each printed face from Rayda would make the second face sharp.

## How the photos were made

- CreateUGC: 5 scenes, Nano Banana Pro image to image, 2 credits each (10 credits; 24 left on the page after the first, so about 16 now).
- ChatGPT (the user's Plus): one chat per piece, from her photo of it.
- Downloads, each allowed by the user: `rayda-redo-1.zip`, `rayda-redo-2.zip`, `rayda-redo-3.zip` (33 ChatGPT PNGs) and `rayda-redo-scenes.zip` (5 scenes). They are in Downloads (some under a `.tmp` name) and can be deleted.
- Site copies: scenes 1200×1200, ChatGPT photos 1086×1448, JPEG q85, with `480/` copies at q80.

## Files

- `src/catalog.js`: the galleries (no `photoCount` or `ownPhotos` left in use).
- `src/shop-pages.mjs`, `src/shop-pages-ar.mjs`: the line under a single scene.
- `src/guidance-pages.mjs`, `src/guidance-pages-ar.mjs`: the Accompagnement photo.
- `assets/products/organized/`: 34 new photos (`*-ugc.jpg`, `*-ai-*.jpg`) with their `480/` copies.
- `test/catalog.test.mjs`: 107 photos, all `-ugc` or `-ai-`; no page says "ses propres photos"; the new galleries; the single-photo pieces; the Accompagnement photo.

Backups of the replaced files: `backups/before-ugc-redo-2026-11-21/`.

## Checks

- 35/35 tests. Lint: 24 products, 10 collections, 107 photos. Syntax check passes.
- No raw photo is referenced anywhere in the built site.
- No sideways scroll or clipped names on 23 FR/AR pages at 320, 360, 390, 768, 1180 and 1440 px.

## Undo

Copy the files in `backups/before-ugc-redo-2026-11-21/` back over `src/` and `test/`, then build. The new photos can stay in the folder.

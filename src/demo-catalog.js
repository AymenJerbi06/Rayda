(function () {
  "use strict";
  window.STORE_DEMO_CATALOG = {
    collections: [
      { slug: "all", name: "All Crystals", description: "Explore the visual collection preview.", productIds: ["sample-amethyst", "sample-tumbled-stones", "sample-bracelet", "sample-heart"] },
      { slug: "tumbled-stones", name: "Tumbled Stones", description: "A preview collection of polished stone forms.", productIds: ["sample-amethyst", "sample-tumbled-stones"] },
      { slug: "crystal-jewelry", name: "Crystal Jewelry", description: "A preview collection of handmade crystal jewelry.", productIds: ["sample-bracelet"] },
      { slug: "crystal-hearts", name: "Crystal Hearts", description: "A preview collection of carved crystal forms.", productIds: ["sample-heart"] },
      { slug: "crystal-points", name: "Crystal Points", description: "A preview collection of crystal points and specimens.", productIds: ["sample-amethyst", "sample-tumbled-stones"] }
    ],
    products: [
      {
        id: "sample-amethyst", slug: "sample-amethyst", name: "Amethyst Specimen · Preview", eyebrow: "Visual sample · not for sale", type: "stone",
        collections: ["tumbled-stones", "crystal-points"], price: null, availability: "quote", custom: false, featured: true,
        description: "A visual placeholder used to preview the storefront layout. Replace this sample with an approved product record before launch.",
        details: ["Sample image generated for the design preview", "Stone identity, origin, size, and price have not been verified"],
        options: {}, priceNote: "Preview item only. No product price has been supplied.",
        images: [{ src: "/assets/demo-stones.webp", alt: "Generated sample image of polished crystals on linen" }, { src: "/assets/demo-hero.webp", alt: "Generated sample image of a hand holding a violet crystal" }],
        missing: ["Product identity", "Materials and origin", "Dimensions", "Price", "Availability"]
      },
      {
        id: "sample-tumbled-stones", slug: "sample-tumbled-stones", name: "Polished Stones · Preview", eyebrow: "Visual sample · not for sale", type: "stone",
        collections: ["tumbled-stones", "crystal-points"], price: null, availability: "quote", custom: false, featured: true,
        description: "A visual placeholder used to preview a product card and detail page. It does not represent an available item.",
        details: ["Sample image generated for the design preview", "No material, origin, dimensions, or price claims are made"],
        options: {}, priceNote: "Preview item only. No product price has been supplied.",
        images: [{ src: "/assets/demo-stones.webp", alt: "Generated sample image of several polished stones" }],
        missing: ["Product identity", "Materials and origin", "Dimensions", "Price", "Availability"]
      },
      {
        id: "sample-bracelet", slug: "sample-crystal-bracelet", name: "Beaded Bracelet · Preview", eyebrow: "Visual sample · not for sale", type: "jewelry",
        collections: ["crystal-jewelry"], price: null, availability: "quote", custom: false, featured: true,
        description: "A generated jewelry image for previewing the collection and product-page layout. It is not a client product.",
        details: ["Sample image generated for the design preview", "Materials, sizing, origin, and price have not been verified"],
        options: { variant: ["Select a sample option", "Option A", "Option B"] }, priceNote: "Preview item only. No product price has been supplied.",
        images: [{ src: "/assets/demo-bracelet.webp", alt: "Generated sample image of a beaded bracelet" }],
        missing: ["Product identity", "Materials and sizing", "Price", "Availability"]
      },
      {
        id: "sample-heart", slug: "sample-crystal-heart", name: "Carved Heart · Preview", eyebrow: "Visual sample · not for sale", type: "stone",
        collections: ["crystal-hearts"], price: null, availability: "quote", custom: false, featured: true,
        description: "A generated image to preview product browsing. It is not a client product or a claim about crystal effects.",
        details: ["Sample image generated for the design preview", "Stone identity, origin, size, and price have not been verified"],
        options: {}, priceNote: "Preview item only. No product price has been supplied.",
        images: [{ src: "/assets/demo-heart.webp", alt: "Generated sample image of a carved red stone heart" }],
        missing: ["Product identity", "Materials and origin", "Dimensions", "Price", "Availability"]
      }
    ]
  };
}());

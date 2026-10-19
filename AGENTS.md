# Architecture rules

- Guest photography uses CDN asset pointers: original JPEGs for full-resolution gallery viewing and WebP versions for browsing, avoiding duplicated binaries in the repository.
- Guest editorial content is centralized in the image library, while gallery and purchasable menu entries remain Cloud-managed so existing publication controls and server-priced ordering still apply.
- Different purchasable serving options use distinct menu records, preserving real menu IDs and authoritative order prices without synthetic basket identifiers.
- Tasting eligibility is calculated by a shared pure function against the event-only estimate; structured booking selection and notes support admin review independently of human-readable summaries.
# Website Build Brief

> **How to use this template**
> Fill in every section below. Replace placeholder text in `[brackets]` with your answers.
> Delete sections that do not apply, or write `N/A`.
> The more specific you are, the better the result. Attach or link assets where noted.

---

## 1. Project Summary

| Field | Your answer |
|-------|-------------|
| **Project name** | `[Namerrs]` |
| **One-line description** | `[Graphics Design Company]` |
| **Primary goal** | `[Provides custom t-shirts, business cards, signs, banners,magnets, memorial, & hats]` |
| **Success looks like** | `[customers can buy products online, customize their order based on what type of order it is.]` |
| **Target launch date** | `[As soons as possible]` |
| **Budget / constraints** | `Must work online; hosted on Firebase at https://namerrs.web.app` |
| **Deployment** | `https://namerrs.web.app` (does **not** replace https://namerrs.com) |

### Background & context

`Website exists to provide customers with custom graphic design products and services. New app deploys to Firebase Hosting (namerrs.web.app). Original site (namerrs.com) remains live. Design references namerrs.web.app layout but uses the original black-and-white logo from namerrs.com — no sliding carousel, no multicolor logo variant.`

---

## 2. Audience & Use Cases

### Primary audience

- **Who:** `[Small business ]`
- **Technical level:** `[non-technical / mixed / developer]`
- **Devices:** `[Responsive Web design for mobile, tablets, and desktop]`
- **Browsers to support:** `Last 2 versions of Chrome, Firefox, Safari, Edge`

### Top user journeys (rank by priority)

1. `[Land on HomePage and users understand type of company, services provided, products provided]`
2. `[Browse featured products, services, and customize orders based on type of product provided]`
3. `[Provides add and remove to cart for products and services]`
4. `[Provides ease of use, accessibilty]`
5. `[Users submit reviews via modal on landing page; reviews displayed in landing page section — no separate /reviews route]`
6. `[Provides users the ability to schedule a date when order needs to be completed by | ability to revise scheduling 12 hours in advance | Provides ability to make changes 24 hours in advance of completion date and changes new completed by date after doing so]`
7. `Provides users options to receive an email or text for orders that have been completed, changed, and picked up. Tracking status of order.`
8. `[Faqs section, Provides tips and answers for basic design, products, and marketing]`
8. `[Footer, has links for site map, legal, products, about, reviews, copyright info, Powered by CloudDropdesigns]`

### User roles (if applicable)
N/A
---

## 3. Scope

### In scope (must ship)

- `[business cards | provides dynamic options for different types of paper, colors, information needed on cards | flippable to edit or design both sides of card ]` `[feature]`
- `[banners | provides dynamic options for sizes | options for vinyl or digital]` `[feature]`
- `[T-shirts | provides dynamic options for sizes | ability to provide custom desing or graphic for t-shirts | dynamic options for choosing male or female ]` `[feature]`
- `[Provide the ability to order hats, magnets, & memorial]``[feature]`
- `[HomePage — single landing page with expandable product sections, reviews, contact; no separate product routes]``[Page]`
- `[AboutPage]``[Page]`
- `[Privacy Policy]``[Page]`
- `[Terms & Conditions]``[Page]`

### Out of scope (explicitly not building)

- `Native mobile apps`
- `Multi-language support in v1`
- `Custom CMS for non-technical editors`
- `Separate product routes (/t-shirts, /banners, /products, etc.)`
- `Sliding image carousel on hero or product sections`
- `Multicolor logo variant (use original black-and-white logo only)`
- `Replacing or redirecting namerrs.com`

### MVP vs. later phases

| Phase | Includes |
|-------|----------|
| **MVP (v1)** | `Home (all product sections + reviews + contact), About, Privacy, Terms, all product designers via offcanvas, shared cart, checkout (Stripe), scheduling, notifications (Twilio), SEO files, Google Analytics` |
| **v2** | `User accounts, admin dashboard, newsletter, Signs, Stickers, Flyers` |

---

## 4. Site Structure & Pages

> **No separate product routes.** Products live as expandable sections on the landing page. Selecting a product opens its info/spec view; **Add** or **Edit** opens the offcanvas designer for that product.

### Global layout

- **Header:** Original black-and-white Namerrs logo (from namerrs.com), nav links (Home, About, Products anchor, FAQ, Contact), social icons (Instagram, Facebook, phone, X, YouTube, Yelp), search, cart icon
- **Navigation model:** Top nav on desktop; hamburger on mobile; social icons visible in header and repeated in contact section
- **Hero:** Static hero image (no sliding carousel), business name, slogan *"Quality Products. Best Prices Around. Done Fast."*
- **Products section:** Expandable/open sections per product — see Feature 15 below
- **Reviews section:** On landing page only; submit via modal
- **Contact section:** Single message input + send button; social icon links
- **Footer:** Sitemap links, legal, about, copyright, *Powered by CloudDropDesigns*

### Social & contact links (use in nav and contact section)

| Platform | URL / value |
|----------|-------------|
| Instagram | https://www.instagram.com/namerrs |
| Facebook | https://www.facebook.com/Namerrs |
| X (Twitter) | https://www.x.com/namerrs |
| YouTube | https://www.youtube.com/channel/UC0hn7EgFs-4ZZT_AIjeA7VQ |
| Yelp | https://www.yelp.com/biz/namerrs-signs-and-printing-san-jacinto-3 |
| Phone | (951) 350-0270 — `tel:9513500270` |
| Email | NameRRs@gmail.com |

### Pages

#### `/` — Home (landing page — primary experience)

- **Purpose:** `Marketing, product discovery, customization entry point, reviews, and contact`
- **Sections (in order):** `hero (static), features, products (expandable sections), about teaser, FAQ, reviews, contact, footer`
- **Primary CTA:** `Expand a product section → Add / Edit → offcanvas designer`
- **Product sections:** Business Cards, T-Shirts, Banners, Hats, Magnets, Memorial — each expands to show specs, description, and Add/Edit CTA
- **No carousel.** No multicolor logo.

#### `/about` — About

- **Purpose:** `Tell story about company, founder & family`
- **Sections:** `About hero, featured products summary, FAQ, contact, footer`
- **Content notes:** `Copy from https://namerrs.com/about-us`

#### Cart (offcanvas — not a standalone route)

- **Purpose:** `List cart items; access checkout`
- **Behavior:** Offcanvas slides from right on any page when cart icon clicked; same panel used for designer and cart (designer takes priority when editing)

#### `/privacy` — Privacy Policy

- **Purpose:** `Privacy policy for online services and products`
- **Sections:** `policy content, contact for privacy questions`
- **Content notes:** `Needs to be created`

#### `/terms` — Terms & Conditions

- **Purpose:** `Terms and conditions for online services and products offered`
- **Sections:** `terms content, contact for questions`
- **Content notes:** `Needs to be created`

### URL & routing rules

- `Provide industry standard best practices and security for routing`

---

## 5. Features & Functionality

Describe behavior in enough detail that someone could implement and test it.

### End-to-end user journey: Business Cards (P0)

`Home or Products → click Business Card CTA → offcanvas designer opens from right → design front → flip → design back (or copy front to back) → choose card type & quantity → choose completion date → review summary → add to cart → checkout → confirmation (email and/or text) → return to home`

> **Reference:** Current live site at [https://namerrs.com](https://namerrs.com) lists Business Cards with **500 minimum quantity**. Use that unless updated pricing/options are provided. Copy for About page should come from the original site.

---

### Feature 1: `Business Card designer` — P0

- **Description:** Interactive, clickable card canvas inside an offcanvas panel (slides in from the right). User can edit text, upload images, drag and drop images onto the card, crop images, pick background/text colors (hex, HSL, or RGBA), flip the card to design the back, and copy the front layout to the back. Friendly, low-friction UX with clear save/preview states.

- **User flow:**
  1. User clicks Business Card CTA on Home or Products page.
  2. Offcanvas panel opens from the right with card preview and editing tools.
  3. User adds/edits text fields and uploads or drags an image onto the card.
  4. User crops and positions the image on the card surface.
  5. User picks card background and text colors (hex, HSL, or RGBA).
  6. User selects card type/paper option (see options below).
  7. User clicks **Flip** to design the back of the card.
  8. User chooses **Copy front to back** (duplicate layout) or designs the back separately.
  9. User clicks **Save** — design is stored as a draft in cart session (and Firebase if logged in later).
  10. User proceeds to quantity step (Feature 2).

- **Card sizes & print specs** (industry standard — builder should use these defaults unless Namerrs provides updated print templates):

  | Option | Trim size | With bleed (0.125 in per side) | Preview pixels (300 DPI) | Notes |
  |--------|-----------|--------------------------------|--------------------------|-------|
  | **US Standard (default)** | 3.5 × 2 in (89 × 51 mm) | 3.75 × 2.25 in | 1050 × 600 px | Default for US print shops; matches Namerrs location (California) |
  | European / international | 85 × 55 mm | +3 mm bleed each side | ~1004 × 650 px | Optional v2 if international orders are needed |

  - **Safe area:** Keep all text and logos at least **0.125 in (3 mm)** inside trim edges so content is not cut off during printing.
  - **Double-sided:** Front and back are separate design surfaces with the same bleed/safe-area rules.
  - **Export for production:** Generate print-ready PDF or high-res PNG per side (builder documents format in README).

- **Editable fields** (default text slots — user can leave blank):

  | Field | Max length | Allowed characters |
  |-------|------------|-------------------|
  | Name / business name | 40 | Letters, numbers, spaces, `.`, `&`, `'`, `-` |
  | Title / tagline | 60 | Same as above |
  | Phone | 20 | Numbers, spaces, `(`, `)`, `-`, `+`, `.` |
  | Email | 80 | Standard email characters |
  | Website | 80 | Letters, numbers, `.`, `/`, `:`, `-` |
  | Address | 100 | Letters, numbers, spaces, `,`, `.`, `#`, `-` |
  | Free text box (optional) | 120 | Same as name field |

- **Card type / paper options** (match common print-on-demand defaults; confirm against [namerrs.com](https://namerrs.com) when more product copy is available):

  | Option | Description |
  |--------|-------------|
  | Standard matte | 14–16 pt cardstock, matte finish |
  | Glossy | Coated glossy finish |
  | Uncoated | Writable / natural paper feel |

  - **Corners:** Square (default) — rounded corners as v2 if needed.
  - **Sides:** Single-sided or double-sided (double-sided required for flip-and-design-back flow).

- **Image upload rules:**

  | Rule | Value |
  |------|-------|
  | Allowed formats | JPEG, PNG, WebP only |
  | Max file size | 10 MB |
  | Min recommended resolution | 300 DPI at placement size (warn if below 150 DPI) |
  | Crop | Locked to image placement aspect ratio; user can pan and zoom |
  | Max images per side | 3 |
  | Drag and drop | Supported on desktop; mobile uses upload + position controls |

- **Color picker rules:**

  - Accept valid **hex** (`#RGB` or `#RRGGBB`), **HSL**, and **RGBA** values.
  - Reject invalid values with inline error: *"Enter a valid color code."*
  - Provide preset swatches plus custom input.
  - Show contrast warning if text/background combination fails WCAG AA (4.5:1).

- **Inputs / validation:**

  | Error | User-facing message (Refactoring UI style: specific, calm, next to the field) |
  |-------|--------------------------------------------------------------------------------|
  | Text too long | *"Keep [field name] under [N] characters."* |
  | Invalid characters | *"This field allows letters, numbers, and basic punctuation only."* |
  | Save failed | *"We couldn't save your design. Try again."* + retry button |
  | Invalid color | *"Enter a valid hex, HSL, or RGBA color."* |
  | Upload failed | *"Upload failed. Check your connection and try again."* |
  | Wrong file type | *"Use a JPG, PNG, or WebP image."* |
  | File too large | *"Image must be under 10 MB."* |
  | Low resolution | *"This image may look blurry when printed."* (warning, not blocking) |

- **Security requirements** (OWASP-aligned — implement, do not just "test for best practices"):

  | Area | Requirement |
  |------|-------------|
  | **Input validation (OWASP A03)** | Server-side validation on all text fields; escape output when rendering user content; never trust client-only checks |
  | **File upload (OWASP File Upload Cheat Sheet)** | Allowlist extensions (`.jpg`, `.jpeg`, `.png`, `.webp`); validate MIME type **and** file signature (magic bytes); do not trust `Content-Type` header alone; rename files to server-generated IDs; max filename length 128 chars; store uploads in Firebase Storage outside public web root; serve via signed URLs or mapped IDs |
  | **Malicious files** | Re-encode uploaded images server-side (strip EXIF/metadata) before storage; reject polyglot/double-extension filenames (e.g. `file.jpg.php`) |
  | **Size limits (OWASP A05)** | Enforce 10 MB upload cap and per-session upload rate limit to prevent storage exhaustion |
  | **CSRF (OWASP)** | Protect cart/save/checkout form submissions with CSRF tokens or Firebase App Check |
  | **XSS (OWASP A03)** | Sanitize all user-supplied text before display; Content Security Policy headers on production |
  | **Access control (OWASP A01)** | Users may only read/edit their own cart designs and order assets |
  | **Rate limiting** | Throttle uploads and form submissions per IP/session |

- **Accessibility requirements** (WCAG 2.1 AA target — stated in user journeys):

  | Requirement | Implementation |
  |-------------|----------------|
  | Keyboard access | All designer controls (text, upload, color, flip, save, copy) operable without a mouse |
  | Drag-and-drop alternative | Arrow keys or numeric inputs to position images; "Reset position" button |
  | Focus management | When offcanvas opens, focus moves to panel; focus trap inside panel; return focus to CTA on close |
  | Labels | Every input has a visible `<label>` or `aria-label` |
  | Flip / save announcements | `aria-live="polite"` region announces "Showing back of card", "Design saved" |
  | Color contrast | Text on card background must meet 4.5:1; warn user if below threshold |
  | Error identification | Errors linked to fields via `aria-describedby`; do not rely on color alone |
  | Touch targets | Minimum 44 × 44 px for buttons on mobile |
  | Reduced motion | Respect `prefers-reduced-motion` — disable flip animation if set |
  | Screen reader preview | Card preview has descriptive `aria-label` summarizing current side and key text |

- **Outputs:**
  - Live preview of front and back of card (screen and print-safe view)
  - Saved design draft attached to cart session
  - Print-ready asset per side for production handoff (PDF or 300 DPI PNG)

- **Edge cases:**

  | Scenario | Behavior |
  |----------|----------|
  | User closes offcanvas mid-edit | Prompt: *"Save draft before closing?"* — Save / Discard / Cancel |
  | User flips without designing back | Allow blank back or copy-front prompt |
  | Upload interrupted | Show retry; do not corrupt partial state |
  | Very long word in text field | Soft-wrap in preview; validate max length on save |
  | Offline during save | Queue save when possible; show offline message |
  | User rotates mobile device | Preview reflows; editing tools remain usable |

- **Priority:** `P0`

---

### Feature 2: `Business Card options & quantity` — P0

- **Description:** After design is saved, user selects quantity and sees updated pricing.

- **User flow:** Designer save → quantity selector → price updates live → proceed to scheduling.

- **Options:**
  - **Minimum quantity:** 500 (per current [namerrs.com](https://namerrs.com) listing)
  - **Quantity presets:** 500, 1000, 2500, 5000, custom (increments of 100, min 500)
  - **Pricing:** Display `$0.00` — greyed out and non-interactive until real prices are configured in Firebase (see Pricing display rules)

- **Validation:** Quantity below 500 blocked with message: *"Minimum order is 500 cards."*

- **Outputs:** Line item with design thumbnail, card type, quantity, unit price, subtotal

- **Priority:** `P0`

---

### Feature 3: `Order scheduling` — P0

- **Description:** User picks when the order needs to be completed by, per site-wide scheduling rules.

- **User flow:** Quantity confirmed → date picker → review scheduling rules → proceed to cart review.

- **Scheduling rules** (from user journeys — apply site-wide):
  - User selects a **requested completion date**
  - User may **revise schedule up to 12 hours** before completion date
  - User may **request order changes up to 24 hours** before completion date; revised completion date shown after change

- **Validation:** Cannot select past dates; minimum **5 business days** lead time before requested completion date; show warning if date is too soon: *"Please allow at least 5 business days for production."*

- **Outputs:** Scheduled completion date stored on cart line item and order

- **Priority:** `P0`

---

### Feature 4: `Cart` — P0

- **Description:** Offcanvas or `/cart` view listing all items. Available from cart icon in header on every page.

- **User flow:** Review items → edit quantity or remove → optional "Continue shopping" → proceed to checkout.

- **Validation:** Cart cannot checkout empty; design assets must still exist in storage.

- **Outputs:** Updated cart state; persist in Firebase / session

- **Priority:** `P0`

---

### Feature 5: `Checkout & payment` — P0

- **Description:** Purchase screen with customer contact info, order summary, and payment.

- **User flow:** Cart → checkout form (name, email, phone, optional pickup/delivery notes) → payment → order created.

- **Inputs / validation:**
  - Email and phone required (phone needed for SMS notifications per user journeys)
  - Payment via **Stripe** — install `@stripe/stripe-js` and `@stripe/react-stripe-js`; use Stripe Elements / Payment Element
  - Follow **Stripe skills** installed in `.agents/skills/` (`stripe-best-practices`, `upgrade-stripe`) and [Stripe docs](https://docs.stripe.com) for integration patterns, webhooks, and error handling
  - PCI: never store raw card data on Namerrs servers; Stripe handles card data
  - Pricing shows `$0.00` greyed out in UI until configured; Stripe checkout still wired for $0 test mode or manual amount override when prices go live

- **Stripe error handling (user-facing):**
  - Map Stripe API/card errors to friendly messages (Refactoring UI style) — never expose raw Stripe error codes to users
  - `card_declined` → *"Your card was declined. Try a different card or contact your bank."*
  - `insufficient_funds` → *"Insufficient funds. Try a different payment method."*
  - `expired_card` → *"This card has expired."*
  - `processing_error` → *"Payment couldn't be processed. Please try again."*
  - Network/timeout calling Stripe → *"Payment service unavailable. Try again in a moment."* + retry button
  - Express returns appropriate HTTP status; React displays mapped message in checkout offcanvas

- **Security (OWASP):** HTTPS only; validate totals server-side; idempotent payment handling; protect against tampered cart prices

- **Outputs:** Paid order record in Firebase; payment receipt

- **Priority:** `P0`

---

### Feature 6: `Order confirmation & notifications` — P0

- **Description:** Post-purchase confirmation with email and/or SMS summary; redirect to home.

- **User flow:** Payment success → confirmation screen (order #, items, completion date, total) → user chooses email and/or text confirmation → redirect home.

- **Notifications** (site-wide, also in user journeys):
  - Order completed, changed, and picked up — email and/or text
  - Order status tracking visible to customer (TBD: tracking page vs. email links only)

- **Outputs:** Confirmation screen; transactional email; SMS via **Twilio** (account exists — credentials provided on backend at deploy time)

- **Priority:** `P0`

---

### Shared security, validation & accessibility (all product designers)

> Applies to Features 7–11 (T-shirts, Banners, Hats, Magnets, Memorial) in addition to Feature 1. Product-specific rules are listed per feature below.

**Security (OWASP-aligned):**

| Area | Requirement |
|------|-------------|
| **Input validation (A03)** | Server-side validation on all text; escape/sanitize on output; never trust client-only checks |
| **File upload** | Allowlist `.jpg`, `.jpeg`, `.png`, `.webp`; validate MIME type **and** magic bytes; server-generated filenames; max 10 MB; store in Firebase Storage; serve via signed URLs |
| **Malicious files** | Re-encode images server-side; strip EXIF/metadata; reject double extensions |
| **CSRF / App Check** | Protect save-to-cart and checkout actions |
| **XSS** | Sanitize user text before render; CSP headers in production |
| **Access control (A01)** | Users may only access their own cart designs and order assets |
| **Rate limiting** | Throttle uploads and form submissions per IP/session |

**Validation UX (Refactoring UI style):**

| Error | Message pattern |
|-------|-----------------|
| Text too long | *"Keep [field] under [N] characters."* |
| Invalid characters | *"This field allows letters, numbers, and basic punctuation only."* |
| Save failed | *"We couldn't save your design. Try again."* |
| Invalid color | *"Enter a valid hex, HSL, or RGBA color."* |
| Upload failed | *"Upload failed. Check your connection and try again."* |
| Wrong file type | *"Use a JPG, PNG, or WebP image."* |
| File too large | *"Image must be under 10 MB."* |
| Low resolution | *"This image may look blurry when printed."* (warning) |

**Accessibility (WCAG 2.1 AA):**

| Requirement | Implementation |
|-------------|----------------|
| Keyboard access | All designer controls operable without a mouse |
| Drag-and-drop alternative | Position controls via keyboard or numeric inputs; "Reset position" button |
| Focus management | Offcanvas: focus trap, move focus into panel on open, return on close |
| Labels | Visible `<label>` or `aria-label` on every control |
| Live announcements | `aria-live="polite"` for save, flip, and step changes |
| Color contrast | Text on backgrounds must meet 4.5:1; warn if below |
| Errors | `aria-describedby` on fields; never color-only |
| Touch targets | Minimum 44 × 44 px on mobile |
| Reduced motion | Respect `prefers-reduced-motion` |

**Shared commerce flow (after any product designer):**

`Design saved → quantity/options → scheduling (Feature 3) → cart review (Feature 4) → checkout (Feature 5) → confirmation (Feature 6)`

---

### Feature 7: `T-Shirt designer` — P0

> **Reference:** [namerrs.com/t-shirts](https://namerrs.com/t-shirts) — custom printed tees; expert artist reviews every order.

- **Description:** Offcanvas designer (slides from right), similar to Business Card designer. User customizes a t-shirt with dynamic **size**, **fit/style**, **shirt color**, **text**, and **uploaded graphics**. Supports image upload, drag-and-drop onto the shirt preview, crop, and color selection (hex, HSL, RGBA) for text and graphics.

- **User flow:**
  1. User clicks T-Shirt CTA on Home or Products page.
  2. Offcanvas opens with shirt preview and design tools.
  3. User selects **fit** (male/unisex or female) and **size(s)**.
  4. User selects **shirt color** from presets or custom color picker.
  5. User adds **text** and/or **uploads/drags an image** onto the shirt.
  6. User crops and positions the graphic on the print area (front by default; back as optional v2).
  7. User picks **text/graphic colors** (hex, HSL, RGBA).
  8. User clicks **Save** → proceeds to quantity (Feature 8).

- **Fit & size options:**

  | Fit | Sizes available |
  |-----|-----------------|
  | **Male / unisex** | S, M, L, XL, 2XL, 3XL |
  | **Female** | S, M, L, XL, 2XL |

  - User may select one size or multiple sizes with per-size quantities (for team orders).
  - Size chart link shown in designer (builder provides standard measurements table).

- **Shirt color options:** Black, White, Navy, Red, Royal Blue, Gray, Maroon, Forest Green, plus custom color via picker.

- **Print options** (from [namerrs.com](https://namerrs.com) — "Starting at 1 Color"):
  - **Print colors:** 1-color, 2-color, 3-color, full color (affects pricing tier — confirm with Namerrs)
  - **Print placement:** Front chest (default), full front

- **Editable text fields:**

  | Field | Max length | Allowed characters |
  |-------|------------|-------------------|
  | Line 1 (name/team) | 30 | Letters, numbers, spaces, `.`, `&`, `'`, `-` |
  | Line 2 (tagline) | 40 | Same as above |
  | Line 3 (optional) | 40 | Same as above |

- **Image upload rules:** Same as Feature 1 (JPEG/PNG/WebP, 10 MB max, crop, drag-drop, max 2 images on front).

- **Pricing display:** Show `$0.00` greyed out (disabled styling) for all tiers until configured in Firebase. Future tiers (from namerrs.com for reference): 1–3 $25, 4–5 $20, 6–10 $15, 11–20 $10, 21–24 $8, 25–50 $7, 51–100 $6, 101+ $5

- **Product-specific validation:**
  - At least one size with quantity ≥ 1 required before save
  - Fit (male/female) required
  - Shirt color required
  - At least text **or** image required on the design

- **Security, accessibility, edge cases:** Inherits **Shared standards** above. Edge cases match Feature 1 (close mid-edit prompt, offline save, mobile rotation).

- **Outputs:** Shirt preview mockup, saved design draft, print-ready graphic asset for production.

- **Priority:** `P0`

---

### Feature 8: `T-Shirt options & quantity` — P0

- **Description:** After design save, user confirms sizes, per-size quantities, and sees live pricing from tier table above.

- **Validation:** Minimum 1 shirt total; quantity tiers update unit price automatically.

- **Outputs:** Cart line item with design thumbnail, fit, size breakdown, color, quantity, subtotal.

- **Priority:** `P0`

---

### Feature 9: `Banner designer` — P0

> **Reference:** [namerrs.com/banners](https://namerrs.com/banners) — digitally printed 720 DPI on 13 oz premium vinyl; indoor/outdoor, waterproof, UV safe.

- **Description:** Offcanvas designer for custom banners. User selects **banner type**, **size** (preset or custom dimensions), writes a **description/message** for the design brief, and **uploads/drags images** onto the banner preview. Dynamic pricing based on square footage.

- **User flow:**
  1. User clicks Banner CTA on Home or Products page.
  2. Offcanvas opens with banner preview scaled to selected dimensions.
  3. User selects **banner type**: Vinyl or Digital.
  4. User selects **size** from presets or enters custom width × height (in feet).
  5. User writes a **description** in the message box (design instructions, event text, etc.).
  6. User uploads or drags images onto the banner surface; crops and positions.
  7. User picks background/text colors if applicable (hex, HSL, RGBA).
  8. User sees **live price** calculated from sq ft × rate.
  9. User clicks **Save** → quantity (typically 1) → scheduling → cart.

- **Banner type options** (from [namerrs.com/banners](https://namerrs.com/banners)):

  | Type | Price | Notes |
  |------|-------|-------|
  | **Vinyl** | $3.00 / sq ft | 13 oz premium vinyl; 720 DPI print |
  | **Digital** | $5.00 / sq ft | Digital print option |

- **Size options:**

  | Preset | Dimensions (W × H) | Sq ft |
  |--------|-------------------|-------|
  | Small | 2 × 4 ft | 8 |
  | Medium | 3 × 6 ft | 18 |
  | Large | 4 × 8 ft | 32 |
  | X-Large | 6 × 10 ft | 60 |
  | **Custom** | User enters W × H (ft) | W × H |

  - **Maximum single piece:** 10' × 145' without pockets; 9.5' × 145' with pockets (per [namerrs.com](https://namerrs.com)).
  - Oversize banners bonded together — show notice: *"Banners over max width will be joined in sections."*
  - **Minimum size:** 1 × 1 ft.
  - Preview scales proportionally; show dimensions label on preview.

- **Description / message box:**

  | Field | Max length | Purpose |
  |-------|------------|---------|
  | Design description | 500 | Text for banner content, event info, instructions to print team |

  - Allowed: letters, numbers, spaces, basic punctuation (`.`, `,`, `!`, `?`, `'`, `-`, `&`, `#`, line breaks).
  - Required before save.

- **Image upload rules:** Same shared rules (JPEG/PNG/WebP, 10 MB, drag-drop, crop). Max 5 images on banner surface. Recommend 150+ DPI at final print size; warn below threshold.

- **Product-specific validation:**
  - Width and height required (preset or custom); must be within min/max
  - Description required (min 10 characters)
  - Banner type (Vinyl/Digital) required
  - Live price displayed as `$0.00` greyed out until rates configured (future: `width × height × rate = total`)

- **Security, accessibility, edge cases:** Inherits **Shared standards**. Additional edge case: custom dimensions with decimals (allow 0.5 ft increments); show price recalculation on dimension change.

- **Outputs:** Scaled banner preview, description text, uploaded assets, calculated price, print-ready file for production.

- **Priority:** `P0`

---

### Feature 10: `Hat customizer` — P0

> **Reference:** [namerrs.com/hats](https://namerrs.com/hats) — 100% cotton twill, 6-panel structured, matching plastic closure; vinyl print ([namerrs.com](https://namerrs.com) homepage).

- **Description:** Offcanvas customizer for vinyl-printed hats. User provides either a **short company name** (text) **or** a **logo/image** (uploaded and cropped). Simpler than full designer — focused on front-panel placement.

- **User flow:**
  1. User clicks Hat CTA on Home or Products page.
  2. Offcanvas opens with hat preview (front view).
  3. User selects **hat type** (see options below).
  4. User chooses **text** or **image** mode:
     - **Text:** enter short company/name text, pick text color (hex, HSL, RGBA).
     - **Image:** upload or drag logo/image, crop to front-panel print area, position.
  5. User clicks **Save** → quantity → scheduling → cart.

- **Hat type / options** (from [namerrs.com/hats](https://namerrs.com/hats)):

  | Option | Details |
  |--------|---------|
  | **Structured 6-panel** | 100% cotton twill, structured crown |
  | **Closure** | Matching plastic snap/adjustable closure |
  | **Print method** | Vinyl print |
  | **Size** | One size fits most (adjustable closure) |
  | **Colors** | Black, White, Navy, Red, Khaki, Gray (builder adds swatches; confirm with Namerrs) |

- **Text mode:**

  | Field | Max length | Allowed characters |
  |-------|------------|-------------------|
  | Short company / name | 25 | Letters, numbers, spaces, `.`, `&`, `'`, `-` |

- **Image mode:** Same upload rules as shared standards. Crop locked to front-panel aspect ratio (~2.5 × 1.5 in print area). Max 1 image.

- **Product-specific validation:**
  - Hat color required
  - Either text (min 1 char) **or** image required — not both required, but at least one
  - Text mode: max 25 characters enforced

- **Pricing:** Display `$0.00` greyed out until configured in Firebase.

- **Security, accessibility, edge cases:** Inherits **Shared standards**. Toggle between text/image modes must be keyboard-accessible with clear `aria-pressed` state.

- **Outputs:** Hat preview mockup, text or cropped image asset, saved cart line item.

- **Priority:** `P0`

---

### Feature 11: `Magnet customizer` — P0

> **Reference:** [namerrs.com/magnets](https://namerrs.com/magnets) — 12" × 24" full color digital.

- **Description:** Same flow as Hat customizer (Feature 10). User provides **short company name** (text) **or** **logo/image** (uploaded and cropped) for a vehicle magnet.

- **User flow:** Same as Feature 10 — text or image mode → crop/position → save → quantity → scheduling → cart.

- **Product specs** (from [namerrs.com/magnets](https://namerrs.com/magnets)):

  | Spec | Value |
  |------|-------|
  | **Size** | 12" × 24" (fixed) |
  | **Print** | Full color digital |
  | **Orientation** | Landscape (default); portrait option if image aspect fits |

- **Text mode:** Same as Feature 10 — max 25 characters, same character allowlist.

- **Image mode:** Same shared upload/crop rules. Crop locked to 12 × 24 in (2:1) aspect ratio.

- **Pricing display:** `$0.00` greyed out until configured. Future reference tiers: 1 = $40, 2 = $75, 3 = $100

- **Product-specific validation:**
  - Quantity presets: 1, 2, 3 (max 3 per current pricing; custom qty above 3 uses per-unit quote or contact — TBD)
  - Either text or image required

- **Security, accessibility, edge cases:** Inherits **Shared standards** and Feature 10 edge cases.

- **Outputs:** Magnet preview, text or cropped image asset, cart line item with quantity pricing.

- **Priority:** `P0`

---

### Feature 12: `Memorial customizer` — P0

> **Reference:** [namerrs.com/memorial](https://namerrs.com/memorial) — custom memorial prints and stickers.

- **Description:** Same flow as Hat/Magnet customizer (Features 10–11). User provides **short name/text** (e.g. loved one's name, dates, short message) **or** **photo/image** (uploaded and cropped) for a memorial print.

- **User flow:** Same as Feature 10 — text or image mode → crop/position → save → quantity → scheduling → cart.

- **Product specs** (from [namerrs.com/memorial](https://namerrs.com/memorial); sizes not listed on site — use defaults until Namerrs confirms):

  | Product type | Size options |
  |--------------|--------------|
  | **Memorial print** | 8" × 10", 11" × 14", 12" × 18" (presets) |
  | **Memorial sticker** | 4" × 6", 6" × 9" (presets) |

  - User selects product type and size before designing.
  - Full color digital print.

- **Text mode:**

  | Field | Max length | Allowed characters |
  |-------|------------|-------------------|
  | Name | 40 | Letters, numbers, spaces, `.`, `'`, `-` |
  | Dates / short message | 60 | Same + `,` |

- **Image mode:** Same shared upload/crop rules. Crop locked to selected product aspect ratio. Max 1 photo.

- **Product-specific validation:**
  - Product type and size required
  - Either text (at least name) **or** image required
  - Sensitive content: no validation blocking; production team reviews orders (noted in confirmation)

- **Pricing:** Display `$0.00` greyed out until configured in Firebase.

- **Security, accessibility, edge cases:** Inherits **Shared standards**. Use respectful, calm UX copy (e.g. *"Memorial design saved"*). Extra care in confirmation emails.

- **Outputs:** Memorial preview, text or cropped image asset, cart line item.

- **Priority:** `P0`

---

### Pricing display rules (all products — global)

- All prices show **`$0.00`** with greyed-out / disabled styling (`color: #9CA3AF`, `opacity: 0.6`, non-clickable price controls)
- Quantity and design flows remain fully functional
- Pricing UI is wired to Firebase Realtime Database config path `config/pricing` so values can be enabled later without code changes
- When price is `0` or unset, show helper text: *"Pricing coming soon — you can still design and save your order."*
- Refactoring UI: de-emphasize price (smaller, muted text); emphasize design CTA

---

### Feature 13: `Product expandable sections` — P0

- **Description:** On the landing page, each product (Business Cards, T-Shirts, Banners, Hats, Magnets, Memorial) is an **open/expandable section** — not a separate route. Expanding a section updates the view to show product information, specs, and service details sourced from namerrs.com.

- **User flow:**
  1. User scrolls to Products section on home page (or taps Products in nav → scrolls to anchor).
  2. User clicks a product card/accordion header — section expands with animation (react-spring).
  3. Expanded view shows: product image, description, specs table, greyed `$0.00` pricing, and **Add to order** / **Edit design** buttons.
  4. Clicking **Add** or **Edit** opens the offcanvas designer (Features 1, 7, 9, 10–12) for that specific product.
  5. Only one product section fully expanded at a time (accordion behavior) — keeps layout clean per Refactoring UI.

- **Accessibility:** Expand/collapse is a `<button>` with `aria-expanded`; content region linked via `aria-controls`; keyboard Enter/Space toggles.

- **Priority:** `P0`

---

### Feature 14: `Reviews (landing page + modal)` — P0

- **Description:** Reviews displayed in a section on the landing page only. No `/reviews` route. Users submit reviews via a **modal**.

- **User flow:**
  1. User reads existing reviews in the Reviews section on home page.
  2. User clicks **Leave a review** → modal opens.
  3. Modal fields: star rating (1–5), review text (max 500 chars), optional name (max 40 chars).
  4. Submit → saved to Firebase Realtime Database → modal closes → success toast → review appears after moderation flag (auto-approve for v1 or manual — default auto-approve with profanity filter).

- **Validation:** Rating required; review text min 10 chars; server-side sanitization.

- **Security:** Rate limit 3 reviews per IP per day; XSS sanitization on display.

- **Accessibility:** Modal focus trap; `aria-modal="true"`; close on Escape; star rating keyboard-operable.

- **Priority:** `P0`

---

### Feature 15: `Contact (single input + social icons)` — P0

- **Description:** Contact section on landing page with a **single message input field** and **Send** button. Social media icons in header nav and contact section for Instagram, Facebook, phone, X, YouTube, Yelp.

- **User flow:**
  1. User types a message in the single input field (max 500 chars).
  2. User clicks **Send** (icon button with label).
  3. Message sent via Firebase Function (Express) → stored in Realtime Database and/or emailed to NameRRs@gmail.com via configured mailer.
  4. Success toast: *"Message sent — we'll get back to you soon."*

- **Validation:** Message required (min 5 chars); rate limit 5 messages per IP per hour.

- **UX (Refactoring UI):** Input label above field (*"How can we help?"*); placeholder is example not label; Send is primary button; social icons are secondary, evenly spaced with `aria-label` per platform.

- **Accessibility:** Input has visible label; Send button has text + icon; social links have `aria-label` (e.g. *"Visit us on Instagram"*).

- **Priority:** `P0`

---

### Common feature checklist (check all that apply)

- [x] Contact form
- [ ] Newsletter signup
- [x] Search (site-wide / filtered)
- [ ] User authentication (sign up, login, logout, password reset) — `N/A for v1 per user roles`
- [ ] Social login (Google, GitHub, etc.)
- [ ] User profiles / settings
- [ ] Admin dashboard
- [ ] Blog / CMS
- [x] E-commerce (cart, checkout, orders)
- [x] Payments
- [x] File uploads
- [x] Real-time updates (chat, notifications) — `order status email/SMS`
- [ ] Maps / location
- [x] Calendar / booking — `order completion scheduling`
- [x] Comments / reviews
- [ ] Analytics dashboard
- [ ] API for third parties
- [x] Other: `Product designers: Business Cards, T-shirts, Banners, Hats, Magnets, Memorial; offcanvas cart`

---

## 5a. Progress review — gaps still to fill

| Area | Status | Notes |
|------|--------|-------|
| **Project summary** | Done | Deploys to namerrs.web.app; does not replace namerrs.com |
| **Audience** | Done | Last 2 browser versions specified |
| **Scope & products** | Done | Features 1–15 specced; no product routes |
| **Design & branding** | Done | Section 7 — colors, logo, Refactoring UI, no carousel |
| **Technical stack** | Done | Section 8 + 17 — React JSX, Vite, Redux, react-spring, Firebase RTDB, Express functions |
| **Payments** | Done | Stripe components specified |
| **SMS** | Done | Twilio — credentials on backend at deploy |
| **Pricing** | Done | $0.00 greyed out globally until Firebase config updated |
| **Scheduling** | Done | 5 business day minimum lead time |
| **Reviews & contact** | Done | Features 14–15 |
| **SEO & analytics** | Done | Section 13 |
| **Testing** | Done | Jest first (TDD), then Maestro E2E — section 15 |
| **HTTP status handling** | Done | Section 9 — Express + React friendly error UI (400–504, Stripe) |
| **Backend content plan** | Done | Section 9a — RTDB → Express → Redux |
| **Stripe skills** | Done | `.agents/skills/stripe-*` installed from docs.stripe.com |
| **Legal** | Partial | Privacy/Terms content still needs to be written |
| **Logo asset file** | Partial | URL provided; user to supply local image file in repo `public/assets/logo.png` |
| **Real prices** | Later | Enable via Firebase `config/pricing` when ready |

---

## 6. Content

### Copy & tone

- **Brand voice:** `Professional, local, friendly — San Jacinto's trusted print shop since 2008`
- **Reading level:** `Plain language`
- **Languages:** `English only`

### Content you will provide

| Asset | Status | Location / notes |
|-------|--------|-------------------|
| Logo (original) | Have (URL) | https://img1.wsimg.com/isteam/ip/47c0480b-7b57-4199-8a74-10229f839ab8/Namers%20White%20-%20Black%20Logo-01.png — save to `public/assets/logo.png`. **Do not use multicolor logo variant.** |
| Favicon | Generate from logo | `public/favicon.ico` |
| Hero images | From namerrs.com / web.app | Static single hero — no carousel |
| Page copy | Pull from namerrs.com | About from `/about-us`; product copy from product pages |
| Legal text (Privacy, Terms) | Needs creation | Sections 12 |
| Product data | In Firebase RTDB | Seed from namerrs.com specs; pricing defaults to 0 |

### Placeholder content rules

`Use real copy from namerrs.com where available. For missing copy, generate realistic print-shop content — not lorem ipsum.`

### SEO content requirements

- See Section 13 for full SEO implementation

---

## 7. Design & Branding

> **Reference layout:** [https://namerrs.web.app](https://namerrs.web.app) — use its general structure and spacing.
> **Logo:** Original black-and-white from [namerrs.com](https://namerrs.com) only.
> **Do not use:** sliding carousel, multicolor logo.
> **Guidelines:** [*Refactoring UI*](https://www.refactoringui.com/) — hierarchy through size/weight/color, generous whitespace, subtle shadows over borders, de-emphasized secondary elements, labels above inputs, specific error messages.

### Brand guidelines

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#111111` | Logo, headings, primary text — matches original black logo |
| Primary light | `#374151` | Secondary headings |
| Accent / CTA | `#1D4ED8` | Primary buttons, links — 4.5:1+ contrast on white |
| Accent hover | `#1E40AF` | Button hover state |
| Background | `#FFFFFF` | Page background |
| Surface | `#F9FAFB` | Cards, expanded product sections |
| Surface elevated | `#FFFFFF` | Cards with shadow on grey surface |
| Text primary | `#111827` | Body text |
| Text secondary | `#6B7280` | Supporting text, specs, muted labels |
| Text disabled | `#9CA3AF` | Greyed-out `$0.00` pricing |
| Border | `#E5E7EB` | Dividers (use sparingly — prefer spacing) |
| Success | `#059669` | Confirmations |
| Error | `#DC2626` | Validation errors |
| Focus ring | `#93C5FD` | Keyboard focus — 2px ring |

### Contrast rules

- Body text on white: minimum **4.5:1** (WCAG AA)
- Large headings (18px+ bold): minimum **3:1**
- CTA buttons: white text on `#1D4ED8` = ~6.7:1 ✓
- Disabled pricing `#9CA3AF` on `#F9FAFB`: decorative only — not for essential info

### Typography

| Role | Font | Size | Weight |
|------|------|------|--------|
| H1 | System sans / Inter | 36–48px | 700 |
| H2 | System sans / Inter | 28–32px | 600 |
| H3 | System sans / Inter | 20–24px | 600 |
| Body | System sans / Inter | 16px | 400 |
| Small / labels | System sans / Inter | 14px | 500 |
| Button | System sans / Inter | 16px | 600 |

- Limit to **2 font sizes per component** where possible (Refactoring UI)
- Use font weight and color before adding more sizes

### Spacing scale (Tailwind-compatible)

`4, 8, 12, 16, 24, 32, 48, 64` — prefer consistent gaps; more whitespace between sections than within components.

### Reference sites

- **Like:** [namerrs.web.app](https://namerrs.web.app) (layout/structure), [namerrs.com](https://namerrs.com) (brand, copy, logo)
- **Avoid:** Multicolor logo, image carousels, cluttered product grids

### Design assets

- **Figma:** None — design in code
- **Component library:** Custom reusable components from skeleton (`C:\Users\cloud\projects\skeleton`)
- **Icons:** Lucide React or Heroicons for social, cart, send, expand/collapse
- **Photography:** Product images from namerrs.com

### Responsive behavior

- **Breakpoints:** Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280)
- **Mobile:** Hamburger nav; sticky cart icon; full-width offcanvas; 44px touch targets
- **Accessibility target:** WCAG 2.1 AA

### Motion & interaction

- **react-spring** for offcanvas slide, accordion expand, modal fade
- Subtle hover on buttons and product cards
- **No** sliding carousel
- Respect `prefers-reduced-motion` — instant transitions when set

---

## 8. Technical Requirements

### Stack preferences (builder defaults — mandatory)

| Layer | Technology |
|-------|------------|
| Framework | React (JSX only — **no TypeScript**) |
| Build | Vite |
| State | Redux Toolkit |
| Animation | react-spring |
| Styling | Tailwind CSS + Sass (variables in `src/styles/variables/`) |
| Routing | React Router (minimal routes: `/`, `/about`, `/privacy`, `/terms`) |
| Backend | Firebase Cloud Functions with **Express server** |
| Database | **Firebase Realtime Database** (CRUD) |
| File storage | Firebase Storage (uploads, print assets) |
| Auth | None for v1 (guest checkout) |
| Hosting | Firebase Hosting → `https://namerrs.web.app` |
| Payments | **Stripe** — `@stripe/stripe-js`, `@stripe/react-stripe-js` |
| SMS | **Twilio** (credentials provided at backend deploy) |
| Analytics | **Google Analytics 4** |
| Unit tests | **Jest** + React Testing Library |
| E2E tests | **Maestro** (after Jest suite passes) |
| Stripe skills | `.agents/skills/stripe-best-practices`, `stripe-directory`, `stripe-projects`, `upgrade-stripe` (from `npx skills add https://docs.stripe.com`) |
| HTTP errors | Shared `apiClient` + Redux `ui` slice + reusable error pages/components |
| Content | Backend-driven via Express `/api/content/*` → Redux `content` slice |

### Hard constraints

- No TypeScript — JSX only
- Must run on Windows locally for development
- Firebase project ID: `namerrs` (from `.firebaserc`)
- Skeleton reference: `C:\Users\cloud\projects\skeleton` — align folder/file/component architecture; update skeleton if it diverges from these requirements
- **TDD approach:** Write Jest tests first → implement until tests pass → then Maestro E2E
- No prop drilling unless absolutely necessary for speed/optimization
- No hardcoded properties in function arguments — use constants, Redux state, or config
- DRY global styles and utilities

### Performance targets

- **Lighthouse:** 90+ performance, accessibility, SEO
- **Core Web Vitals:** LCP < 2.5s, CLS < 0.1, INP < 200ms
- Lazy-load product section images and offcanvas designer

### Browser / environment

- SPA (client-side rendering via Vite)
- Firebase emulators for local dev (Auth, RTDB, Storage, Functions)

---

## 9. Data & Integrations

### Firebase project

| Field | Value |
|-------|-------|
| Project ID | `namerrs` |
| Hosting URL | `https://namerrs.web.app` |
| Console | Firebase Console + Google Cloud Console (user logged in) |

### Realtime Database structure (CRUD via Express Functions)

```
/orders/{orderId}        — order records (design, qty, schedule, status, stripePaymentId)
/cart/{sessionId}        — guest cart sessions
/designs/{designId}      — saved design drafts (linked to cart)
/reviews/{reviewId}      — customer reviews
/messages/{messageId}    — contact form submissions
/config/pricing          — product pricing (default 0.00 until updated)
/config/products         — product specs and descriptions
/content/pages           — page copy (hero, about teaser, FAQ, footer)
/content/sections        — landing section visibility, order, headings
/content/products        — product descriptions, specs, images (CMS-like)
/content/seo             — meta titles, descriptions, keywords per route
/content/social          — social links and contact info
```

### Express Cloud Functions (CRUD)

- `functions/` hosts Express app mounted on Firebase Functions
- REST endpoints: `POST/GET/PUT/DELETE` for orders, designs, reviews, messages
- **Content API:** `GET /api/content`, `GET /api/content/pages/:slug`, `GET /api/content/products/:id`, `GET /api/content/seo/:route`
- Stripe webhook endpoint: `POST /webhooks/stripe`
- Twilio SMS endpoint: called on order status changes
- Migrate/update existing `firebase/index.js` to use **Realtime Database** (currently references Firestore — correct during build)

### HTTP status code handling (Express + React — mandatory)

> Both backend and frontend must handle common HTTP/HTTPS status codes with user-friendly UI. Use a shared error response shape from Express; React/Redux maps codes to messages and UI states.

**Express standard JSON error response:**

```json
{
  "error": true,
  "status": 404,
  "code": "NOT_FOUND",
  "message": "Human-readable message for UI",
  "retryable": false
}
```

| Status | When (Express) | User-facing message (React) | UI behavior |
|--------|----------------|----------------------------|-------------|
| **200** | Success | — | Render data |
| **201** | Created (order, design, review) | *"Saved successfully."* | Toast + update Redux |
| **400** | Bad request / validation failed | Field-specific message from `message` | Inline errors on form |
| **401** | Unauthorized (future auth) | *"Please sign in to continue."* | Redirect or modal |
| **403** | Forbidden | *"You don't have permission to do that."* | Error banner |
| **404** | Resource or route not found | *"We couldn't find what you're looking for."* | 404 page or empty state + home link |
| **408** | Request timeout | *"That took too long. Please try again."* | Retry button |
| **409** | Conflict (duplicate, stale cart) | *"This was already updated. Refresh and try again."* | Refresh action |
| **422** | Unprocessable (valid JSON, bad data) | Specific validation message | Inline field errors |
| **429** | Rate limited | *"Too many requests. Wait a moment and try again."* | Disabled submit + countdown |
| **500** | Server error | *"Something went wrong on our end."* | Error page + retry + contact link |
| **502** | Bad gateway (Stripe/upstream down) | *"Service temporarily unavailable."* | Retry + status banner |
| **503** | Service unavailable / maintenance | *"We're doing maintenance. Check back soon."* | Maintenance view |
| **504** | Gateway timeout | *"The server didn't respond in time."* | Retry button |

**React/Redux implementation:**

- `src/utils/apiClient.js` — central fetch wrapper; parses status codes; dispatches to Redux `ui/error` slice
- `src/redux/slices/ui.slice.js` — `httpStatus`, `errorMessage`, `retryable`, `isLoading`
- Reusable `<HttpErrorBanner />`, `<NotFoundPage />`, `<ServerErrorPage />` components
- React Router catch-all `*` route → 404 page
- Global error boundary for uncaught React errors → 500-style fallback
- Stripe errors handled separately in checkout slice but follow same UX pattern
- All API errors use Refactoring UI: specific, calm, actionable — never raw status numbers shown to users

**Express middleware:**

- `errorHandler` middleware — catches all errors, returns consistent JSON + correct status code
- `notFoundHandler` — 404 for unknown API routes
- Log full error server-side (Firebase Functions logger / Google Cloud Logging); never leak stack traces to client in production

### External services

| Service | Purpose | Keys provided |
|---------|---------|---------------|
| Stripe | Payments, checkout | Yes — API keys at deploy; install Stripe React components |
| Twilio | Order SMS notifications | Yes — account exists; SID/token/phone on backend |
| Google Analytics 4 | Traffic and conversion tracking | Set up GA4 property; measurement ID in env |
| Firebase Storage | Image uploads | Firebase project config |

### Webhooks & background jobs

- Stripe `payment_intent.succeeded` → update order status in RTDB → trigger confirmation email/SMS
- Order status change → Twilio SMS if user opted in

### Email / SMS templates needed

- Order confirmation (email + optional SMS)
- Order status changed
- Order ready for pickup
- Contact form notification to NameRRs@gmail.com

---

## 9a. Backend-driven content — implementation plan

> **Goal:** Most site content (copy, product info, SEO meta, social links, pricing display flags) is stored in Firebase Realtime Database and served via Express API. React/Redux fetches on load and renders — no hardcoded page copy in components.

### Architecture

```
Firebase RTDB (/content/*)
        ↓
Express Cloud Functions (GET /api/content/*)
        ↓
React apiClient → Redux content slice → UI components
```

### Phase 1 — Content schema & seed (build first)

1. Define RTDB paths under `/content/` (see Section 9 data structure)
2. Seed initial content from namerrs.com into `/content/products`, `/content/pages`, `/content/seo`
3. Express `GET /api/content` — returns full content tree (or paginated sections)
4. Express `GET /api/content/pages/:slug` — home, about, privacy, terms
5. Express `GET /api/content/products/:productId` — specs, descriptions, images URLs
6. Express `GET /api/content/seo/:route` — title, description, og:image
7. Redux `content.slice.js` — `fetchContent()`, `selectPageContent`, `selectProductContent`, `selectSeo`
8. Jest tests for content slice and API client before UI integration

### Phase 2 — React integration

1. `ContentProvider` or app-level `useEffect` dispatches `fetchContent()` on mount
2. Components read from Redux — **no hardcoded strings** for: hero, slogans, FAQ, product descriptions, footer, social links
3. Loading state: skeleton placeholders while content fetches
4. Error state: if content API returns 4xx/5xx, show cached/fallback + `HttpErrorBanner`
5. Product expandable sections (Feature 13) render from `selectProductContent(productId)`

### Phase 3 — Admin content updates (via Firebase / Google Cloud Console)

1. **Firebase Console** → Realtime Database → edit `/content/*` nodes directly (v1 — no custom admin UI)
2. **Google Cloud Console** → Cloud Functions logs for content API errors
3. Optional v2: simple admin page protected by Firebase Auth to edit content
4. Content changes propagate on next page load (or add `?refresh` / short TTL cache in Redux)

### Phase 4 — Firebase Hosting + CDN

1. Static assets (logo, hero images) in `public/` and Firebase Storage
2. Content API URLs referenced in image fields point to Storage signed URLs or Hosting paths
3. `firebase.json` rewrites: `/api/**` → Cloud Functions; all other routes → `index.html` (SPA)
4. Cache-Control headers: static assets long cache; `/api/content` short cache or no-cache

### Redux content slice shape (example)

```js
{
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  httpStatus: null,
  error: null,
  pages: { home: {...}, about: {...} },
  products: { businessCards: {...}, tshirts: {...}, ... },
  seo: { '/': {...}, '/about': {...} },
  social: { instagram, facebook, phone, ... },
  pricing: { businessCards: 0, tshirts: 0, ... }
}
```

### Content editable without redeploy

| Content type | RTDB path | Consumed by |
|--------------|-----------|-------------|
| Hero text | `/content/pages/home/hero` | HomePage |
| FAQ items | `/content/pages/home/faq` | FaqSection |
| Product specs | `/content/products/{id}` | ProductSection, offcanvas |
| SEO meta | `/content/seo/{route}` | `useSeo()` hook / Helmet |
| Social links | `/content/social` | Header, Footer, Contact |
| Pricing | `/config/pricing` | All product sections |
| Reviews | `/reviews` | ReviewsSection (live data, not static content) |

### TDD order for content feature

1. Jest: Express content routes return 200 + correct shape
2. Jest: Express returns 404 for unknown slug
3. Jest: Redux content slice handles loading, success, 500 error
4. Jest: components render skeleton → content from Redux
5. Maestro: home page loads with content from API

---

## 10. Authentication & Authorization (if applicable)

- **Auth methods:** `[email/password, magic link, OAuth providers]`
- **Session model:** `[JWT, cookie session, duration]`
- **Protected routes:** `[list paths requiring login]`
- **Role-based access:** `[who can access what]`
- **Account flows:** `[signup, verify email, reset password, delete account]`

---

## 11. Forms & User Input

### Form: Contact message (Feature 15)

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Message | text | yes | min 5, max 500 chars |

- **Submit behavior:** `POST` to Express Function → save to RTDB → notify email
- **Success state:** Toast — *"Message sent — we'll get back to you soon."*
- **Spam protection:** Rate limit 5/hour per IP; honeypot field

### Form: Review modal (Feature 14)

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Rating | stars 1–5 | yes | integer 1–5 |
| Review text | textarea | yes | min 10, max 500 |
| Name | text | no | max 40 chars |

- **Submit behavior:** Save to RTDB `reviews/`
- **Success state:** Toast + close modal

### Form: Checkout (Feature 5)

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | text | yes | min 2 chars |
| Email | email | yes | valid email |
| Phone | tel | yes | valid phone (for Twilio SMS) |
| SMS opt-in | checkbox | no | — |
| Notes | text | no | max 200 chars |

- **Payment:** Stripe Payment Element (embedded in checkout offcanvas)
- **Spam protection:** Stripe fraud tools + server-side validation

---

## 12. Legal, Privacy & Compliance

- [ ] Privacy Policy page
- [ ] Terms of Service page
- [ ] Cookie consent banner
- [ ] GDPR / data export & deletion
- [ ] CCPA considerations
- [ ] Age restrictions
- [ ] Industry-specific compliance: `[HIPAA, PCI, etc. or N/A]`

---

## 13. SEO, Analytics & Marketing

### Google Analytics 4

- Install GA4 via gtag.js or Firebase Analytics
- Track: page views, product section expands, designer opens, add-to-cart, checkout start, purchase
- Measurement ID stored in env: `VITE_GA_MEASUREMENT_ID`

### SEO files to generate

| File | Purpose |
|------|---------|
| `public/sitemap.xml` | XML sitemap for all routes (`/`, `/about`, `/privacy`, `/terms`) and section anchors (`/#products`, `/#reviews`, `/#contact`) |
| `public/robots.txt` | Secure, SEO-optimized — allow crawlers on public pages; disallow `/api/`, `/admin/` if added later |
| `index.html` meta tags | Per-route title, description, canonical |

### robots.txt rules

```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://namerrs.web.app/sitemap.xml
```

### On-page SEO (implement on every page)

- Unique `<title>` and `<meta name="description">` per route
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card tags
- Canonical URL: `https://namerrs.web.app/[path]`
- JSON-LD `LocalBusiness` schema:

```json
{
  "@type": "LocalBusiness",
  "name": "Namerrs Signs & Printing",
  "url": "https://namerrs.web.app",
  "telephone": "+1-951-350-0270",
  "address": { "streetAddress": "227 Main Street", "addressLocality": "San Jacinto", "addressRegion": "CA", "postalCode": "92583" }
}
```

### Recommended target keywords

- `custom t-shirts San Jacinto`, `business cards printing`, `vinyl banners`, `signs and printing`, `Namerrs`

### Additional SEO best practices

- Semantic HTML (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- `alt` text on all images
- Heading hierarchy (one H1 per page, no skipped levels)
- Fast load (lazy images, compressed assets)
- Mobile-friendly responsive layout
- Register site in Google Search Console after deploy
- Newsletter: out of scope for v1

---

## 14. Error States & Edge Cases

> Full HTTP status handling spec in Section 9. This section covers UI-level edge cases.

| Scenario | Expected behavior |
|----------|-------------------|
| 404 page/route not found | Custom `<NotFoundPage />` — friendly message, home link, contact link |
| 404 API resource | Empty state in component — *"We couldn't find that item."* |
| 400 / 422 validation | Inline field errors; focus first invalid field |
| 401 / 403 | Banner or modal — no raw status shown |
| 429 rate limit | Disable submit; show countdown or *"Try again in a moment."* |
| 500 / 502 / 503 / 504 | `<ServerErrorPage />` or banner — retry button + phone/email contact |
| Stripe card declined | Friendly mapped message in checkout offcanvas (see Feature 5) |
| Stripe network error | *"Payment service unavailable."* + retry |
| Empty search results | *"No results found. Try a different search."* |
| Slow network | Loading skeletons; 408 timeout → retry prompt |
| Content API fails on page load | Fallback to cached Redux content or minimal static fallback; banner *"Some content couldn't load."* |
| Offline | *"You're offline. Check your connection."* — disable submit |
| Form validation failure | Inline errors per Refactoring UI; `aria-describedby` on fields |

---

## 15. Testing & Quality Bar

### Approach: test-first (TDD)

1. **Jest** unit and component tests written **before** implementation
2. Implement feature until Jest suite passes
3. **Maestro** E2E flows added after Jest passes for that feature
4. Do not merge features without passing tests

### Jest (unit + component)

- Framework: **Jest** + React Testing Library (migrate from Vitest setup in `__tests__/setup.js` if needed)
- Location: `__tests__/` and co-located `*.test.jsx` next to components
- Coverage targets: utils 90%+, components 80%+, Redux slices 90%+
- Mock: Firebase, Stripe, Twilio, react-spring in unit tests

### Maestro (E2E — after Jest)

- Location: `.maestro/flows/`
- Critical flows:
  - `home-load.yaml` — landing page renders, product sections visible
  - `product-expand-design.yaml` — expand product → open offcanvas designer
  - `add-to-cart.yaml` — design → save → cart
  - `checkout-stripe.yaml` — checkout form + Stripe test card
  - `contact-send.yaml` — single input contact message
  - `review-modal.yaml` — open modal → submit review
  - `http-errors.yaml` — 404 page, API error banner, retry on 500
  - `content-load.yaml` — home page content loads from backend API

### Jest tests for HTTP status handling

- `apiClient` returns parsed error for 400, 404, 429, 500, 502, 503
- Redux `ui` slice sets correct `httpStatus` and `retryable` flag
- `<NotFoundPage />` renders on unknown route
- `<HttpErrorBanner />` shows mapped message, not raw status code
- Stripe checkout maps `card_declined` to friendly message
- Content slice handles API failure with fallback state

### Acceptance criteria

1. Given a visitor on the homepage, when they expand Business Cards, then they see specs and Add/Edit buttons
2. Given the designer is open, when the user saves a design, then it appears in the cart offcanvas
3. Given items in cart, when the user checks out with Stripe test card, then order is created in RTDB
4. Given the contact section, when the user sends a message, then a success toast appears
5. Given the reviews section, when the user submits a review via modal, then it appears in the list
6. Given any price display, then it shows `$0.00` in greyed-out disabled style
7. Given scheduling, when the user picks a date fewer than 5 business days out, then a validation warning appears
8. Given an unknown URL, when the user navigates there, then they see a friendly 404 page with a home link
9. Given the content API returns 500, when the home page loads, then a retry banner appears (not a blank page)
10. Given Stripe declines a card, when checkout fails, then the user sees a friendly message (not a raw error code)
11. Given content in Firebase RTDB, when the home page loads, then hero and product copy render from Redux (not hardcoded)

---

## 16. Deployment & Operations

- **Production URL:** `https://namerrs.web.app`
- **Original site (unchanged):** `https://namerrs.com`
- **Staging:** Firebase preview channels (from skeleton `.github/workflows/firebase-preview.yml`)
- **SSL:** Automatic via Firebase Hosting
- **CI/CD:** GitHub Actions — firebase-deploy on merge to main (from skeleton)

### Environment variables

```env
# Frontend (.env)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=namerrs
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_GA_MEASUREMENT_ID=
VITE_SITE_URL=https://namerrs.web.app

# Backend (Firebase Functions config / Secret Manager)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
CONTACT_EMAIL=NameRRs@gmail.com
```

- **Monitoring:** Firebase Crashlytics / Functions logs
- **Backups:** Firebase RTDB automated backups enabled in console

---

## 17. File & Repo Expectations

- **Project location:** `C:\Users\cloud\projects\namerrs` (repo root)
- **Skeleton reference:** `C:\Users\cloud\projects\skeleton` — mirror and extend; correct skeleton if architecture diverges
- **README must include:** install, dev, test (Jest + Maestro), build, deploy, env setup, Firebase emulator usage

### Folder architecture (reusable, DRY)

```
namerrs/
├── public/
│   ├── assets/logo.png
│   ├── sitemap.xml
│   └── robots.txt
├── src/
│   ├── pages/              # HomePage, AboutPage, PrivacyPage, TermsPage
│   ├── ui/
│   │   ├── components/     # Reusable: Button, Modal, Offcanvas, ProductSection, etc.
│   │   └── layouts/        # Header, Footer, MainLayout
│   ├── features/           # Per-product designers (businessCard, tshirt, banner, etc.)
│   ├── redux/
│   │   ├── store.js
│   │   ├── constants/      # Action types, Redux constants
│   │   └── slices/         # cart, design, content, ui, auth
│   ├── hooks/
│   ├── utils/              # DRY utilities (apiClient, validation, formatting, errors)
│   ├── styles/
│   │   ├── variables/    # colors, fonts, buttons, links (Sass)
│   │   └── main.scss
│   ├── Providers/
│   └── constants/          # App-wide constants (not Redux-specific)
├── firebase/
│   └── index.js            # Express app + Cloud Functions
├── functions/              # If split from firebase/
├── __tests__/              # Jest setup and integration tests
├── .maestro/flows/         # Maestro E2E flows
└── content/                # Product copy config (from skeleton pattern)
```

### Component file conventions (mandatory)

```jsx
/**
 * ComponentName — brief description of what this component does.
 */

// React / third-party libraries
import { useState } from 'react';
import { useSpring } from '@react-spring/web';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Local components
import Button from './Button';

// Utils / constants
import { MAX_LENGTH } from '../../constants/validation';

// --- Redux constants (if any) ---
const SLICE_ACTION = 'slice/action';

// --- Component-local constants ---
const DEFAULT_COLOR = '#111111';

const ComponentName = (props) => {
  // --- Redux state ---
  const cart = useSelector((state) => state.cart);

  // --- Local state ---
  const [open, setOpen] = useState(false);

  // --- useEffects (grouped, separated by concern) ---
  useEffect(() => { /* ... */ }, []);

  // --- handlers ---
  const handleClick = () => { /* ... */ };

  return (/* JSX */);
};

export default ComponentName;
```

### Code rules

| Rule | Detail |
|------|--------|
| No TypeScript | JSX only |
| No prop drilling | Use Redux or context unless performance-critical |
| No hardcoded function args | Extract to constants, config, or Redux |
| DRY styles | Shared Sass variables + Tailwind utilities; no duplicate color/spacing values |
| Reusable components | Compose from `ui/components/` — do not duplicate Button, Modal, Offcanvas, etc. |
| Redux organization | Constants in `redux/constants/`; slices separated; readable action names |
| useEffects | Grouped at top of component body, separated by blank line and comment |
| Imports | Grouped: libraries → Redux → components → utils/constants (blank line between groups) |
| Component notes | Description comment at top of every component file |

- **Seed data:** Yes — product specs from namerrs.com in RTDB `config/products`; pricing all `0.00`
- **License:** Private

---

## 18. Open Questions & Decisions

### Resolved

| Question | Decision |
|----------|----------|
| Payment processor | **Stripe** with React Stripe components |
| SMS provider | **Twilio** — credentials on backend at deploy |
| Pricing | **$0.00 greyed out** until updated in Firebase `config/pricing` |
| Lead time | **5 business days** minimum |
| Domain | **namerrs.web.app** — does not replace namerrs.com |
| Product routes | **None** — expandable sections on landing page |
| Reviews | **Landing page + modal** — no /reviews route |
| Database | **Firebase Realtime Database** (not Firestore) |
| Testing | **Jest first (TDD)**, then Maestro E2E |
| HTTP errors | Express + React handle 400–504 with friendly UI |
| Content | Backend-driven via Express API → Redux (Section 9a) |
| Stripe skills | Installed from docs.stripe.com |

### Still open

1. Exact business card pricing tiers when enabled (500 / 1000 / 2500 / 5000)
2. Hat and memorial pricing when enabled
3. GA4 measurement ID (create property in Google Analytics)
4. Local logo file — confirm saved to `public/assets/logo.png`

### Builder defaults

`React JSX (no TS), Vite, Redux, react-spring, Tailwind, Sass, Firebase RTDB + Storage + Hosting + Express Functions, Stripe, Twilio, GA4, Jest + Maestro, WCAG 2.1 AA, OWASP validation, $0.00 greyed pricing, 5 business day lead time, skeleton architecture from C:\Users\cloud\projects\skeleton.`

---

## 19. Attachments & Links

| Item | Link / path |
|------|-------------|
| New app (deploy target) | [https://namerrs.web.app](https://namerrs.web.app) |
| Original site (unchanged) | [https://namerrs.com](https://namerrs.com) |
| Original logo (black & white) | [Logo PNG](https://img1.wsimg.com/isteam/ip/47c0480b-7b57-4199-8a74-10229f839ab8/Namers%20White%20-%20Black%20Logo-01.png) → `public/assets/logo.png` |
| Design reference | [namerrs.web.app](https://namerrs.web.app) (no carousel, no multicolor logo) |
| Skeleton template | `C:\Users\cloud\projects\skeleton` |
| Existing codebase | `C:\Users\cloud\projects\namerrs` |
| Firebase project ID | `namerrs` |
| Stripe | API keys provided at deploy |
| Twilio | Account exists — credentials on backend at deploy |
| Google Analytics | GA4 — measurement ID TBD |
| Google Cloud / Firebase Console | User logged in — configure RTDB, Storage, Functions, Hosting |

---

## 20. Final Build Instruction

> **Build request:** Using everything above, build a fully functional, production-ready website for **https://namerrs.web.app**. Implement all P0 features (1–15). Use design from namerrs.web.app with the **original black-and-white logo** from namerrs.com — no carousel, no multicolor logo. All pricing displays **$0.00 greyed out**. Write **Jest tests first**, implement until passing, then **Maestro E2E**. Use React JSX (no TypeScript), Vite, Redux, react-spring, Tailwind, Sass, Firebase Realtime Database, Storage, Hosting, and Express Cloud Functions with CRUD. **Serve content from backend** (Section 9a) — React/Redux renders copy from Express `/api/content/*`. **Handle all common HTTP status codes** (Section 9) with friendly user-facing UI on both frontend and backend, including Stripe errors. Use **Stripe skills** in `.agents/skills/`. Install Stripe React components and wire Twilio on the backend. Generate `sitemap.xml` and `robots.txt`. Hook up Google Analytics 4. Follow skeleton architecture and component conventions in Section 17. Align skeleton if needed. Document all setup in README.

---

*Template version: 1.2 — HTTP status handling, backend content plan, Stripe skills*
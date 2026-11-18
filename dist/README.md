# Sweet Delight Bakery – Premium 3D Bakery Website

An exceptional, luxury dark-themed, interactive 3D bakery website built for **Sweet Delight Bakery**. Designed and engineered to deliver an authentic, handcrafted, high-end patisserie experience.

---

## 🎨 Luxury Color Palette
- **Primary Background:** Deep Chocolate Black (`#17110F`)
- **Secondary Background:** Dark Brown (`#241914`)
- **Accent Color:** Warm Golden (`#D6A45B`)
- **Text Color:** Cream White (`#F5EBDD`)
- **Secondary Text:** Soft Beige (`#C7B8A5`)

---

## ✨ Features & Architecture

### 1. Sticky Luxury Navigation
- Blurred glassmorphism backdrop (`backdrop-filter: blur(16px)`) with subtle golden bottom border on scroll.
- Interactive shopping cart counter badge with bounce animation.
- Responsive mobile hamburger menu with smooth slide-down animation.
- ScrollSpy tracking active section highlighting.

### 2. Interactive 3D Hero Showcase (Three.js)
- Procedural multi-tier luxury chocolate cake with 24K gold leaf bands, cream rosettes, glossy ruby strawberries, and dark chocolate wafers.
- Realistic golden key, rim, and spot lighting with ACESFilmic tone mapping.
- 220 swirling gold dust / sparkle particles orbiting the dessert.
- **Mouse & Touch 360° Drag Rotation:** Visitors can spin and view the dessert from every angle.
- **Flavor Morph Switcher:** Seamlessly morph materials between Belgian Dark Chocolate, Ruby Strawberry Velvet, and Salted Caramel Toffee.
- Floating luxury assurance badges with subtle parallax float.

### 3. "Our Story" About Us Section
- Two-column balanced layout with golden framed bakery photography.
- "Est. 2018 Master Patisserie" golden seal.
- Three core pillars: **Quality Ingredients**, **Freshly Baked Products**, and **Made with Love**.
- Trust metrics and master baker handwritten signature touch.

### 4. "Our Delicious Creations" Product Grid
- 6 signature creations:
  1. **Chocolate Cake** – PKR 3,850
  2. **Strawberry Cake** – PKR 4,200
  3. **Vanilla Cupcakes** – PKR 1,450
  4. **Chocolate Donuts** – PKR 950
  5. **Fresh Croissants** – PKR 850
  6. **Chocolate Cookies** – PKR 1,100
- **3D Card Tilt Engine:** Mouse movement calculates perspective rotation and casts a dynamic golden specular glare directly under the cursor.
- Filter tabs (All, Artisan Cakes, Cupcakes & Donuts, Pastries & Cookies).
- **Quick View Modal:** In-depth ingredient highlights and notes.
- **Functional Shopping Cart:** Add to cart, adjust quantities, view total in PKR, and simulate checkout with local storage persistence.

### 5. "Let's Make Something Sweet!" Contact Us Section
- Dedicated contact info cards:
  - Email: `hello@sweetdelightbakery.com`
  - Phone: `+92 300 1234567`
  - Address: `Rawalpindi, Pakistan`
- Weekly fresh baking hours schedule.
- Interactive contact form with real-time field validation, error feedback, loading state, and toast notification confirmation.

### 6. Premium Footer
- Brand insignia, quick links, contact details, social links, VIP newsletter form, and copyright:
  `© 2026 Sweet Delight Bakery. All Rights Reserved.`

---

## 🚀 How to Run & Preview

### Option 1: Direct in Browser
Simply double-click or open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Node.js)
```bash
# Using npx serve
npx serve .

# Or using python
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

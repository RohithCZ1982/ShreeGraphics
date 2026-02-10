# Client Logos - Shree Graphics Website

## Overview
The website now displays client logos in a professional grid layout in the About section.

## Current Setup

### Logo Display
- **Desktop**: 3-column grid layout
- **Mobile**: 2-column grid layout
- **Style**: White logos on semi-transparent dark backgrounds with hover effects

### Placeholder Logos
Currently, the website uses auto-generated placeholder logos with company names. These are created using JavaScript canvas and styled to look professional.

## Adding Real Client Logos

To replace the placeholder logos with actual company logos:

### 1. Prepare Logo Files

Create a folder: `images/clients/`

Save your logo files with these exact names:
- `government-of-india.png`
- `karnataka-govt.png`
- `skanray.png`
- `lt.png`
- `tata.png`
- `SVL.png`
- `kaynes.png`
- `bvpundits.png`
- `hexmoto.png`

### 2. Logo Specifications

**Format**: PNG with transparent background (preferred)
**Size**: 400x200px (or similar 2:1 ratio)
**Color**: 
- If logos are dark, they will be inverted to white automatically
- If logos are already white/light, remove the CSS filter

### 3. Removing the CSS Filter (if needed)

If your logos are already white/light colored, edit both CSS files:

**In `css/desktop.css` and `css/mobile.css`**, find:
```css
.client-logo img {
    filter: brightness(0) invert(1);
}
```

Change to:
```css
.client-logo img {
    filter: none;
}
```

## Client List

Current clients displayed:
1. Government of India
2. Karnataka Government
3. SKANRAY
4. L&T
5. TATA Communications
6. SLV
7. KAYNES Technology
8. B.V. PUNDIT'S
9. HEXMOTO

Plus "And many more..." text below the grid.

## Adding More Clients

To add more client logos:

1. **Update HTML** (`index.html`):
```html
<div class="client-logo">
    <img src="images/clients/new-client.png" alt="New Client Name" id="clientLogo10">
</div>
```

2. **Update JavaScript** (`js/script.js`):
```javascript
generateClientLogo('clientLogo10', 'New Client Name');
```

3. **Add the logo file** to `images/clients/new-client.png`

## Styling Notes

- Logos have a subtle hover effect (lift and glow)
- Background boxes are semi-transparent with rounded corners
- Logos are centered within their containers
- Responsive design adjusts grid columns based on screen size

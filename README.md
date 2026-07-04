# Alexander Escalera — Portfolio

Plain HTML/CSS/JS. No build step, no framework — open `index.html` locally or deploy the folder as-is.

## What's here
```
index.html              homepage
about.html               about / resume page
work/
  data-catalog.html
  maxis-consumers.html
  assignable-ebook.html
assets/
  css/style.css
  js/main.js             mobile nav + lightbox + demo password gate
```

Images currently link back to your old Webflow CDN (`cdn.prod.website-files.com`) so you could preview right away without re-uploading anything. **Before you take the old site down, replace these with your own higher-resolution exports** — see "Swapping in real images" below.

---

## 1. Put it on GitHub (recommended)

You don't strictly need a repo — you could drag-and-drop this folder into Netlify's dashboard. But a repo gets you version history and one-click redeploys whenever you edit something, so it's worth the extra 5 minutes.

1. Go to github.com → New repository → name it something like `portfolio`.
2. On your machine, in this folder:
   ```
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```
   (If you'd rather skip the command line entirely, GitHub's web UI lets you drag files directly into a new repo — no git commands needed.)

## 2. Deploy — Netlify (recommended for you)

Netlify gives you **real, server-side password protection** as a plain toggle, which is what you need for NDA'd client work.

1. Go to [netlify.com](https://netlify.com) → sign up / log in with GitHub.
2. "Add new site" → "Import an existing project" → pick your `portfolio` repo.
3. Leave build settings blank (no build command, publish directory = `/`) → Deploy.
4. You'll get a `*.netlify.app` URL immediately — check it renders correctly.

### Connect your domain
1. In Netlify: Site settings → Domain management → Add custom domain → enter your domain.
2. Netlify shows you DNS records to add. Go to wherever you bought the domain (GoDaddy, Namecheap, Google Domains, etc.) and add those records — usually an `A` record pointing at Netlify's load balancer IP, or an `ALIAS`/`CNAME` if your registrar supports it, plus a `CNAME` for `www`.
3. DNS changes can take anywhere from a few minutes to ~24 hours to propagate. Netlify auto-issues a free HTTPS certificate once it verifies the domain.

### Real password protection
1. Requires a paid plan (Netlify Pro, ~$19/mo) — this is what makes it *real* protection instead of a JS trick.
2. Site settings → **Visitor access** → turn on password protection → set your password.
3. This gates the entire site at the server level before any HTML/JS/images are sent to the browser — nobody can view-source their way past it.

If a single case study needs protection but the rest of the site should stay public, Netlify's visitor access applies site-wide; for per-page protection you'd want to either split it into a separate Netlify site (e.g. a subdomain like `private.alexanderescalera.com`) or use Netlify's paid "Password protected" per-path rules (Enterprise) / a serverless function. Happy to help set that up if you need it — just say the word.

### Free alternative: Cloudflare Pages + Cloudflare Access
If you'd rather not pay for Netlify Pro:
1. Deploy the same repo to [Cloudflare Pages](https://pages.cloudflare.com) (free, same GitHub-connect flow).
2. Point your domain's nameservers at Cloudflare (Cloudflare walks you through this).
3. In the Cloudflare dashboard → Zero Trust → Access → Applications → add your domain, and set up a one-time-PIN or password policy.
This is genuine server-side auth, free, but a few more steps to configure than Netlify's toggle.

---

## The built-in "gate" in the code (demo only — not real security)

`assets/js/main.js` includes an optional password gate: a full-screen overlay that checks a password against a stored hash before revealing the page. **This is convenience, not security** — the page content is still delivered to the browser either way, and a determined visitor could bypass it via dev tools. Use it only for something low-stakes, like a "coming soon" gate before launch — not for NDA'd client work (use Netlify/Cloudflare Access for that, above).

To turn it on for a page:
1. Generate a SHA-256 hash of your password (e.g. in a browser console: `crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourpassword')).then(b => console.log(Array.from(new Uint8Array(b)).map(x=>x.toString(16).padStart(2,'0')).join('')))`).
2. Add this markup right after `<body>` on the page you want gated:
   ```html
   <div id="gate" data-pass-hash="PASTE_YOUR_HASH_HERE">
     <div class="gate-box">
       <div class="cs-kicker">Protected</div>
       <h2>This page is private</h2>
       <p>Enter the password to continue.</p>
       <form>
         <input type="password" placeholder="Password" autocomplete="off">
         <button class="btn" type="submit">Unlock</button>
         <div class="gate-error"></div>
       </form>
     </div>
   </div>
   ```
`main.js` already contains the logic to wire this up — no other changes needed.

---

## Swapping in real images

Right now every image tag points at your old Webflow CDN URLs, e.g.:
```html
<img src="https://cdn.prod.website-files.com/.../data-catalog-main.png" ...>
```
To use your own files instead:
1. Create an `images/` folder in this project.
2. Drop in higher-resolution exports (aim for at least 1600px wide for hero shots, PNG or WebP).
3. Find-and-replace each CDN URL with `images/your-filename.png`.

Keeping the Webflow CDN links working depends on that old site staying live — swap these out before you cancel/replace it.

---

## Editing content
Everything is plain HTML — case study text lives directly in each page under `work/`, so you can edit copy, add sections, or reorder images by editing the `<figure>` blocks in the `.gallery` sections. Each image inside a gallery is click-to-expand automatically (via the `data-expand` attribute) — no extra JS needed when you add new ones, just follow the existing pattern.

# benho.org

Static source for Benjamin Ho's personal website and the book *Why Trust Matters*. The site is designed for GitHub Pages and has no build step or external runtime dependencies.

## Site structure

- `index.html` — modern homepage
- `original.html` — preserved legacy homepage with a switch back to the modern version
- `academic/index.html` — modern academic profile with the complete publication archive
- `academic/original.html` — preserved Vassar academic page with a switch back to the modern version
- `academic/files/` — current CV and locally archived research papers
- `art.html` — interactive 2009 art criticism engine
- `picturecredits.html` — retired picture gallery and credits
- `assets/legacy/` — images copied from the Hostinger site
- `assets/site.css` and `assets/site.js` — modern presentation and progressive behavior
- `CNAME` — primary GitHub Pages custom domain (`benho.org`)
- `redirect-vassar/` — ready-to-upload redirect page and server-rule examples for the former Vassar URL

## Local preview

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub Pages

Publish from the repository's `main` branch at `/ (root)`. The primary custom domain is `benho.org`. GitHub Pages accepts only one custom domain in `CNAME`, so `whytrustmatters.com` should use a registrar/DNS-provider HTTP redirect to `https://benho.org` while preserving the requested path where supported.

Before changing DNS, add and verify both owned domains in GitHub account settings. After Pages is active, configure the `benho.org` apex records, test HTTPS, configure the secondary-domain redirect, and only then retire the Hostinger copy.

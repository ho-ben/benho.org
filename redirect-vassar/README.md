# Redirecting the former Vassar academic page

The new canonical academic site is:

`https://benho.org/academic/`

For the best search-engine handoff, ask the Vassar web administrator to install the two permanent redirects in `.htaccess.example`. A server-side HTTP 301 is preferable because it preserves link equity and clearly marks the move as permanent.

If server configuration is not available, upload `bh.htm` over the former `/faculty/bh/bh.htm`. It immediately forwards visitors, including URL fragments such as `#research`, using JavaScript with a no-script fallback.

Do not upload this directory to `/faculty/bh/` as-is. Upload only the selected redirect file, or apply the server rules through the Vassar hosting control panel.

# DNS cutover: Hostinger to GitHub Pages

Prepared August 11, 2026. Do not remove the working Hostinger site until the final checks pass.

## Canonical-domain decision

Use `https://benho.org` as the canonical GitHub Pages domain. GitHub Pages stores only one domain in `CNAME` and does not support serving one Pages site from two unrelated apex domains. Configure `whytrustmatters.com` as a permanent HTTP redirect to `https://benho.org` through Hostinger's **Forward Domain** feature.

This gives visitors the same destination, consolidates search ranking signals, and allows GitHub to provision one valid HTTPS certificate cleanly.

## Current records observed

Both domains currently use Hostinger's nameservers:

- `ns1.dns-parking.com`
- `ns2.dns-parking.com`

Current web records:

| Domain | Name | Type | Value |
| --- | --- | --- | --- |
| `benho.org` | `@` | `A` | `151.106.97.207` |
| `benho.org` | `www` | `CNAME` | `benho.org` |
| `whytrustmatters.com` | `@` | `A` | `151.106.97.207` |
| `whytrustmatters.com` | `www` | `CNAME` | `whytrustmatters.com` |

No MX records were returned for either domain during the check. Preserve all unrelated TXT, CAA, and verification records unless they are known to be obsolete.

## Before changing web records

1. In GitHub, open **Settings → Pages** for the `ho-ben` account and add `benho.org` as a verified domain.
2. GitHub will provide a TXT value. Add it in Hostinger at `_github-pages-challenge-ho-ben.benho.org` and keep it permanently.
3. Confirm the repository's Pages settings still show:
   - Source: `main` / `/ (root)`
   - Custom domain: `benho.org`
   - Build status: built
4. If possible, lower the existing web-record TTL to 300 seconds several hours before cutover.

## Target records for `benho.org`

In Hostinger hPanel under **Domains → benho.org → DNS / Nameservers**:

1. Remove the old `@` A record pointing to `151.106.97.207`.
2. Add all four GitHub Pages IPv4 records:

| Name | Type | Value |
| --- | --- | --- |
| `@` | `A` | `185.199.108.153` |
| `@` | `A` | `185.199.109.153` |
| `@` | `A` | `185.199.110.153` |
| `@` | `A` | `185.199.111.153` |

3. Change `www` to a CNAME that points directly to `ho-ben.github.io`.
4. Optional but recommended: add GitHub's IPv6 records as `AAAA` records for `@`:

```text
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

Do not use wildcard DNS records.

## Redirect `whytrustmatters.com`

Do not point this second apex domain at the same GitHub Pages site. In Hostinger:

1. Open **Domains → whytrustmatters.com → Domain Overview**.
2. Select **Forward Domain**.
3. Choose `HTTPS`.
4. Set the destination to `https://benho.org`.
5. Choose a `301 Permanent` redirect.
6. Confirm both `whytrustmatters.com` and `www.whytrustmatters.com` redirect to the canonical site.

Hostinger documents this forwarding option for domains without a hosting plan, so the redirect can remain after the old web-hosting package is retired as long as the domain remains active and uses Hostinger's required nameservers.

## Validate, then retire Hostinger hosting

After propagation:

```sh
dig benho.org +noall +answer -t A
dig www.benho.org +noall +answer -t CNAME
curl -I https://benho.org
curl -I https://www.benho.org
curl -I https://whytrustmatters.com
curl -I https://www.whytrustmatters.com
```

Confirm that:

- the four apex A records match GitHub Pages;
- `www.benho.org` points to `ho-ben.github.io` and redirects to the apex;
- GitHub's repository settings report a successful DNS check;
- **Enforce HTTPS** can be enabled and all site pages and images load;
- both `whytrustmatters.com` variants return a permanent redirect to `https://benho.org`;
- the modern/original switch, art project, and retired gallery still work.

Keep the old Hostinger files for at least 48 hours after DNS and HTTPS are stable. The rollback is simply restoring the old `@` A record (`151.106.97.207`) and the old `www` CNAME while the Hostinger copy still exists.

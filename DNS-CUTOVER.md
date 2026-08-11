# DNS cutover: Hostinger to GitHub Pages, using GoDaddy DNS

Verified August 11, 2026. Do not cancel Hostinger or delete its websites until every final check in this guide passes.

## What is moving—and what is not

- GoDaddy is the registrar for both `benho.org` and `whytrustmatters.com`. Keep both registrations active and on auto-renew if you want to retain the names.
- Hostinger is still the authoritative DNS provider because both domains use `ns1.dns-parking.com` and `ns2.dns-parking.com`.
- This procedure moves authoritative DNS from Hostinger to GoDaddy. It is **not** a domain-registration transfer.
- GitHub Pages hosts `benho.org` from [`ho-ben/benho.org`](https://github.com/ho-ben/benho.org).
- GoDaddy will permanently redirect `whytrustmatters.com` to `https://benho.org`.
- The academic site remains separate at [`https://ho-ben.github.io/`](https://ho-ben.github.io/) and needs no custom-domain DNS.

## Direct links

- [GoDaddy Domain Portfolio](https://dcc.godaddy.com/portfolio)
- [GoDaddy: change nameservers](https://www.godaddy.com/help/change-my-domain-nameservers-664)
- [GoDaddy: manage DNS records](https://www.godaddy.com/help/manage-dns-records-680)
- [GoDaddy: forward a domain](https://www.godaddy.com/help/forward-my-godaddy-domain-12123)
- [GitHub account Pages settings](https://github.com/settings/pages)
- [GitHub Pages settings for `ho-ben/benho.org`](https://github.com/ho-ben/benho.org/settings/pages)
- [GitHub: verify a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [GitHub: configure custom-domain DNS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Hostinger hPanel](https://hpanel.hostinger.com/)
- [Hostinger: cancel a hosting service](https://www.hostinger.com/support/1583775-how-to-cancel-a-hosting-plan-at-hostinger/)

## Current public state

| Domain | Record | Current value |
| --- | --- | --- |
| `benho.org` | Nameservers | `ns1.dns-parking.com`, `ns2.dns-parking.com` |
| `benho.org` | `@` A | `151.106.97.207` |
| `benho.org` | `www` CNAME | `benho.org` |
| `whytrustmatters.com` | Nameservers | `ns1.dns-parking.com`, `ns2.dns-parking.com` |
| `whytrustmatters.com` | `@` A | `151.106.97.207` |
| `whytrustmatters.com` | `www` CNAME | `whytrustmatters.com` |

No public MX records were returned for either domain. Public DNS does contain SPF, DMARC, and Google-verification TXT records. Preserve them during the first move even if they appear obsolete; email-related records can be cleaned up later after confirming that no Hostinger or Titan email service is needed.

## Phase 1: prepare before changing nameservers

### 1. Download a final Hostinger backup

1. Sign in to [Hostinger hPanel](https://hpanel.hostinger.com/).
2. Open **Websites** and select **Dashboard** beside each website.
3. Open **Files → Backups** (the label may appear as **Backups** or **Restore and download**).
4. Download the website files and any database backup offered.
5. Open Hostinger’s **Emails** section and confirm whether any Hostinger Mail or Titan accounts are in use. Back them up separately if they are.

Do not rely on Hostinger to retain this data after cancellation; service expiration permanently deletes associated data.

### 2. Copy the complete Hostinger DNS zones

For each domain in Hostinger:

1. Open **Domains → Domain portfolio**.
2. Select the domain.
3. Click **DNS / Nameservers → DNS records**.
4. Save screenshots or export/copy every `A`, `AAAA`, `CNAME`, `MX`, `TXT`, `CAA`, `SRV`, and verification record.

Records currently visible publicly and worth preserving initially include:

| Domain | Name | Type | Current value |
| --- | --- | --- | --- |
| `benho.org` | `@` | TXT | `v=spf1 include:spf.titan.email include:spf.mx.hostinger.com include:relay.mailchannels.net ~all` |
| `benho.org` | `_dmarc` | TXT | `v=DMARC1; p=none` |
| `whytrustmatters.com` | `@` | TXT | `google-site-verification=qdCMwpAPMcgKAHYhQ8asmHMU4wGSoMai90HuU-e-L2k` |
| `whytrustmatters.com` | `@` | TXT | `v=spf1 include:spf.titan.email include:spf.mx.hostinger.com include:relay.mailchannels.net ~all` |
| `whytrustmatters.com` | `_dmarc` | TXT | `v=DMARC1; p=none` |

The Hostinger control panel is the authoritative inventory; the public list above may not reveal every record.

### 3. Verify `benho.org` in the GitHub account

1. Open [GitHub account Pages settings](https://github.com/settings/pages). This must be the profile-level settings page, not the repository page.
2. Under **Verified domains**, click **Add a domain**.
3. Enter `benho.org` and click **Add domain**.
4. GitHub displays a TXT record whose name begins `_github-pages-challenge-ho-ben` and a unique value. Copy both.
5. While Hostinger DNS is still authoritative, add that TXT record in Hostinger under **Domains → benho.org → DNS / Nameservers → DNS records**.
6. Wait for GitHub to detect it, return to [GitHub account Pages settings](https://github.com/settings/pages), open the menu beside the domain, choose **Continue verifying**, and click **Verify**.
7. Keep this TXT record when recreating the zone at GoDaddy; GitHub recommends retaining it permanently.

### 4. Confirm the GitHub repository is ready

Open [`ho-ben/benho.org` → Settings → Pages](https://github.com/ho-ben/benho.org/settings/pages) and confirm:

- **Build and deployment source:** `main`, `/ (root)`
- **Custom domain:** `benho.org`
- The latest deployment is successful

The **Enforce HTTPS** box will remain unavailable until DNS points to GitHub and its certificate is ready.

## Phase 2: move DNS management to GoDaddy

Perform these steps for `benho.org`, then repeat them for `whytrustmatters.com`.

1. Open the [GoDaddy Domain Portfolio](https://dcc.godaddy.com/portfolio) and sign in.
2. Click the domain name to open **Domain Settings**.
3. Click **DNS**, then **Nameservers**.
4. Choose **GoDaddy Nameservers (recommended)**.
5. Click **Save**, then **Continue**.
6. Complete the Domain Protection or two-step-verification prompt if shown.

GoDaddy says nameserver changes often appear within an hour but may take up to 48 hours globally. Keep Hostinger active throughout this period. After selecting GoDaddy nameservers, return immediately to the domain’s **DNS → Records** screen and create the records below.

## Phase 3: configure `benho.org` in GoDaddy

### Replace the web records

In [GoDaddy Domain Portfolio](https://dcc.godaddy.com/portfolio):

1. Select `benho.org`.
2. Open **DNS → Records**.
3. Delete any GoDaddy parking `A` record for `@`, and do not copy the old Hostinger `151.106.97.207` record.
4. Click **Add New Record** four times and enter:

| Type | Name | Data / Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | Default or 1 hour |
| A | `@` | `185.199.109.153` | Default or 1 hour |
| A | `@` | `185.199.110.153` | Default or 1 hour |
| A | `@` | `185.199.111.153` | Default or 1 hour |

5. Find the `www` record. Edit it—or delete and recreate it—as:

| Type | Name | Data / Value | TTL |
| --- | --- | --- | --- |
| CNAME | `www` | `ho-ben.github.io` | Default or 1 hour |

Do not put `https://`, a slash, or the repository name in the CNAME value. Do not add wildcard (`*`) DNS records.

### Recreate non-web records

1. Recreate every still-needed TXT, MX, CAA, SRV, and verification record copied from Hostinger.
2. Recreate the `_github-pages-challenge-ho-ben` TXT record supplied by GitHub.
3. Initially copy the SPF and DMARC records exactly. If you confirm there is no Hostinger/Titan mail service, clean obsolete email-provider entries up later rather than during cutover.
4. Do not copy Hostinger’s `NS` records into the GoDaddy zone.

### Finish the GitHub Pages setup

1. Open [repository **Settings → Pages**](https://github.com/ho-ben/benho.org/settings/pages).
2. Wait for the custom-domain section to report **DNS check successful**.
3. Wait for **Enforce HTTPS** to become selectable; GitHub notes certificate provisioning can take up to 24 hours.
4. Select **Enforce HTTPS**.

## Phase 4: forward `whytrustmatters.com` at GoDaddy

Do this only after `whytrustmatters.com` uses GoDaddy nameservers and its non-web DNS records have been copied.

1. Open the [GoDaddy Domain Portfolio](https://dcc.godaddy.com/portfolio).
2. Select `whytrustmatters.com`.
3. Open **DNS → Forwarding**.
4. Click **Add Forwarding** and choose **Domain**.
5. For the destination protocol choose **https://**.
6. Enter `benho.org` as the destination.
7. Choose **Permanent (301)**.
8. Choose forwarding only; **do not use masking**.
9. Click **Save** and complete identity verification if prompted.
10. Under **DNS → Records**, confirm `www` is a CNAME pointing to `@`. GoDaddy requires this for the `www` version to follow the root-domain forwarding.

GoDaddy automatically manages and locks the forwarding `@` A record. Do not replace that generated record with GitHub’s IP addresses.

## Phase 5: validation checklist

Allow up to 48 hours for the nameserver change and up to 24 hours for GitHub’s HTTPS certificate. Then check:

```sh
dig benho.org +short NS
dig whytrustmatters.com +short NS
dig benho.org +short A
dig www.benho.org +short CNAME
curl -I https://benho.org
curl -I https://www.benho.org
curl -I https://whytrustmatters.com
curl -I https://www.whytrustmatters.com
```

Expected results:

- Both domains use GoDaddy nameservers ending in `domaincontrol.com`, not `dns-parking.com`.
- `benho.org` returns all four `185.199.10x.153` GitHub addresses.
- `www.benho.org` is a CNAME to `ho-ben.github.io` and reaches `https://benho.org`.
- GitHub reports **DNS check successful** and **Enforce HTTPS** is enabled.
- `whytrustmatters.com` and `www.whytrustmatters.com` return a permanent redirect to `https://benho.org`.
- The modern/original switch, art page, image gallery, academic links, and CV links work.
- Any email service you intend to retain can still send and receive mail.

## Phase 6: cancel Hostinger safely

Wait at least 48–72 hours after all validation checks pass.

1. Confirm the downloaded Hostinger backup opens locally.
2. Confirm both domains use GoDaddy nameservers.
3. Confirm there are no Hostinger/Titan email accounts, databases, or other websites you still need—or migrate/back them up first.
4. Open [Hostinger hPanel → Billing → Subscriptions](https://hpanel.hostinger.com/billing/subscriptions).
5. Locate the hosting service and disable its **auto-renewal** toggle.
6. Do not request an immediate refund or delete the websites until the migration is stable; an immediate termination erases associated data.
7. Keep the GoDaddy domain registrations and auto-renewal active.

Once DNS is hosted at GoDaddy and the Hostinger subscription expires, Hostinger is no longer required for either website or either domain’s DNS.

## Rollback before Hostinger is canceled

If a serious problem occurs while Hostinger is still active:

1. In GoDaddy, select the affected domain under **DNS → Nameservers**.
2. Choose **I’ll use my own nameservers**.
3. Restore `ns1.dns-parking.com` and `ns2.dns-parking.com`.
4. Click **Save → Continue**.

This restores Hostinger as the authoritative DNS provider after propagation. Do not use this rollback after deleting the Hostinger service or its DNS zones.

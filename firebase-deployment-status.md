# Firebase Deployment Status — Namerrs

**Date:** July 1, 2026  
**Project:** `namerrs`  
**Live site:** https://namerrs.web.app

---

## Summary

| Item | Status |
|------|--------|
| Blaze plan | Active |
| RTDB rules + seed data | Deployed and verified |
| Storage rules | Deployed |
| Cloud Functions (`api`) | **Deployed and ACTIVE** |
| Hosting (production build) | Deployed with `/api` base URL + real Firebase config |
| Live API `/api/health` | Working |
| Live API `/api/content` | Working (RTDB content returned) |
| Stripe | Placeholder keys only — checkout not live |
| Twilio | Not configured (orders skip SMS) |

---

## What was deployed

### Realtime Database
- Instance: `namerrs-default-rtdb`
- Rules and seed data deployed
- Hero content verified in production

### Storage
- Rules deployed to `namerrs.firebasestorage.app`

### Cloud Functions
- Function: `api` (Node.js 20, gen2, `us-central1`)
- Cloud Run URL: `https://api-ipd6i6g5jq-uc.a.run.app`
- Hosting rewrite: `/api/**` → `api`

### Hosting
- Production build uses `.env.production`:
  - `VITE_API_BASE_URL=/api`
  - Real Firebase web app config
  - `VITE_USE_FIREBASE_EMULATORS=false`
  - `VITE_GA_MEASUREMENT_ID=G-D5276NCJ7N`

---

## Issues resolved during deploy

### 1. Initial function build failed (IAM)
Cloud Build could not read the function source bucket.

**Fix:** Granted `849760792239-compute@developer.gserviceaccount.com`:
- `roles/storage.objectViewer`
- `roles/artifactregistry.writer`
- `roles/logging.logWriter`

### 2. Function returned 403 (org policy blocks `allUsers`)
Organization policy prevented public `run.invoker` binding.

**Fix:** `gcloud run services update api --no-invoker-iam-check` (allows unauthenticated access without `allUsers` IAM binding).

### 3. `/api/*` routes returned 404 through Hosting
Firebase Hosting forwards the full `/api/...` path to Express, but routes were mounted at `/health`, `/content`, etc.

**Fix:** Added middleware in `functions/src/app.js` to strip the `/api` prefix before routing.

### 4. `/api/content` hung — invalid Admin SDK credentials
Default compute service account could not authenticate to RTDB.

**Fix:** Set function `serviceAccount` to `firebase-adminsdk-fbsvc@namerrs.iam.gserviceaccount.com` and updated default storage bucket to `namerrs.firebasestorage.app`.

---

## Verified live endpoints

```bash
curl https://namerrs.web.app/api/health
# {"ok":true,"service":"namerrs-api","emulator":false,...}

curl https://namerrs.web.app/api/content
# Returns full content + pricing JSON from RTDB
```

---

## Production Firebase web config

```
apiKey:            AIzaSyCUpHNpC0nttO6pdhtrS-DBTTBHctifZb0
authDomain:        namerrs.firebaseapp.com
databaseURL:       https://namerrs-default-rtdb.firebaseio.com
projectId:         namerrs
storageBucket:     namerrs.firebasestorage.app
messagingSenderId:   849760792239
appId:             1:849760792239:web:bc458b48f9a5d08c9dee5a
measurementId:     G-D5276NCJ7N
```

Stored in `.env.production` (used at `npm run build` time).

---

## Still not production-complete

| Item | Notes |
|------|-------|
| **Stripe** | Add real `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` in Functions secrets; add `VITE_STRIPE_PUBLISHABLE_KEY` for frontend |
| **Storage uploads** | Design file upload pipeline not implemented |
| **Live pricing** | RTDB `config/pricing` values are `0` placeholders |
| **Maestro E2E** | Not created |
| **Node.js 20 deprecation** | Cloud Run warns Node 20 EOL Oct 2026 — plan upgrade to Node 22 |

---

## Useful commands

```bash
# Deploy functions only
firebase deploy --only functions --project namerrs --force

# Production frontend build + hosting
npm run build
firebase deploy --only hosting --project namerrs

# Check function status
firebase functions:list --project namerrs

# Test live API
curl https://namerrs.web.app/api/health
curl https://namerrs.web.app/api/content

# RTDB spot-check
firebase database:get /content/pages/home/hero --instance namerrs-default-rtdb --project namerrs
```

---

## Console links

- [Firebase project](https://console.firebase.google.com/project/namerrs/overview)
- [RTDB data](https://console.firebase.google.com/project/namerrs/database/namerrs-default-rtdb/data/)
- [Cloud Functions](https://console.firebase.google.com/project/namerrs/functions)
- [Hosting](https://console.firebase.google.com/project/namerrs/hosting)
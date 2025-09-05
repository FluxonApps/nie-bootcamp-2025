# FeedTheNeed – Short Developer Notes

What’s done (focused):
- Donor flow completed end‑to‑end and integrated with existing backend.
- Recipient sees newly donated items as “available” and can request them.
- Admin flow untouched (reserved for teammate), but endpoints used are compatible.
- Fixed backend warnings and enum mismatch; routes are clean and structured for handoff.
- Completed the leftover donor-side tasks originally assigned to Abhishek. due to his having some github issues

How to run:
- Backend
  - `cd nie-bootcamp-2025/feedtheneed/backend && npm i && node index.js` (PORT 8002)
- Frontend
  - `cd nie-bootcamp-2025/feedtheneed/frontend && npm i && npm run dev` (opens on 5173)

Frontend highlights:
- Role-based login redirect: admin → `/admin-dashboard`, recipient → `/recipient-dashboard`, donor → `/donor-dashboard`.
- Donor Dashboard
  - Authenticated `GET /api/donations` and `POST /api/donations` (modal form: category, description, quantity).
  - Live stats update and donation history with status badges (active→Pending, fulfilled, cancelled).
- Recipient Dashboard
  - Shows available donations (status `active`) from `GET /api/donations`.
  - `POST /api/requests` to request an item; local state updates accordingly.

Backend highlights:
- JWT auth middleware in place; roles: donor | recipient | admin.
- Donation schema enum fixed; default `active`.
- Services provide: all donations, donor-only list, available list for recipients.
- Implemented `GET /api/donations/my`; removed noisy startup warning.

Ready for teammates:
- Admin approvals/fulfillment remain to be wired in UI using existing `PUT` endpoints.
- Recipient “My Requests” listing can consume `GET /api/requests` directly.

That’s it 
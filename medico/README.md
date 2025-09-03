
Medico – Ingredient Authenticity Verification Platform.
Product Requirements Document
This document is designed as a template for PMs to use when writing product requirements for clients. The sections here are meant to be taken as suggestions and are not intended to be interpreted as dogma. In other words, feel free to remix, remove, and add sections as you feel would be most beneficial to the client. 
			
	Status	In Progress

	Last Updated	Sept 1, 2025	
	Author(s)	Chandu S	
	Collaborator(s)	Person Person Person	
			

Executive Summary
Medico is a digital platform that helps consumers test and verify the authenticity of everyday food ingredients. It provides simple adulteration checks, educational resources, and an admin-reviewed database, enabling healthier choices and building trust in what people consume.
Goals and objectives
Why are we building this product?
To address rising concerns about food adulteration, which impacts health, trust, and food safety.
Goals of the product:
•	Provide users with easy methods to check ingredient purity.
•	Build a transparent, reliable ingredient database.
•	Allow admins to review and validate authenticity data.
Problem to solve:
Consumers lack reliable, accessible tools to check if their ingredients (milk, honey, spices, oil, etc.) are adulterated.
Business impact:
•	Improve consumer trust in food safety.
•	Position Medico as a trusted health-tech solution.
•	Enable partnerships with brands, food labs, and health agencies.
Success metrics
User Engagement:
•	500+ active users testing ingredients in the first 3 months.
Database Growth:
•	50+ ingredients covered in the first release.
Admin Accuracy:
•	≥90% accuracy of adulteration verification after admin review.
User Feedback:
•	4.0/5 average satisfaction score.
Target audience
•	Primary Users:
o	Health-conscious consumers.
o	Families and households in urban areas.
•	Secondary Users:
o	Food safety enthusiasts.
o	Researchers and nutritionists.
Assumptions:
•	Users will input basic ingredient info rather than uploading lab test results (MVP scope).
•	Admins will curate and validate authenticity data manually.


Use cases
●	What are the different use cases for your product?
●	Are there any specific use cases your product will not support?
If the product has several cohorts of users with different capabilities, fill out the table below describing these different users, their roles, and their different product use cases.
User role	Product use case
Consumer (User)	Search ingredient details (e.g., Milk → Possible adulterants, detection methods).
Consumer (User)	Submit ingredient for authenticity check (form input).
Consumer (User)	Report suspicious/adulterated ingredient.
Admin	Review user submissions and approve/reject.
Admin	Add/edit/delete ingredient info.
Admin	Monitor ingredient database health (status, reports).
Medico – Ingredient Authenticity Verification Platform

We aim to build a platform that tests and verifies the authenticity of everyday ingredients. It will help consumers detect adulteration easily and make more informed choices. By ensuring transparency and safety, the platform promotes healthier living and builds trust in what people use daily.

Product Requirements Document
Status: In Progress
Last Updated: Sept 3, 2025
Author(s): Parushuram M
Collaborator(s):
Executive Summary
We aim to build a platform that tests and verifies the authenticity of everyday ingredients. It will help consumers detect adulteration easily and make more informed choices. By ensuring transparency and safety, the platform promotes healthier living and builds trust in what people use daily.

Medico is a web-based product that combines a curated ingredient database, simple at-home detection method`s, a rule-based analysis engine for instant suggestions, and an admin review layer to validate and maintain data quality. The MVP focuses on user-facing ingredient lookup, simple rule-based 03checks, submission handling, and admin review workflows.
Goals and objectives
Why are we building this product?
- To address rising concerns about food adulteration which impacts health, trust, and food safety.
Note: Adulteration means mixing or adding unwanted, inferior, harmful, or prohibited substances to food, drinks, or other products, which reduces their quality, safety, or purity.

Goals of the product:
- Provide users with easy methods to check ingredient purity.
- Build a transparent, reliable ingredient database.
- Allow admins to review and validate authenticity data.

Problem to solve:
- Consumers lack reliable, accessible tools to check if their ingredients (milk, honey, spices, oil, etc.) are adulterated.

Business impact:
- Improve consumer trust in food safety.
- Position Medico as a trusted health‑tech solution.
- Enable partnerships with brands, food labs, and health agencies.

Success metrics
- User Engagement: 500+ active users testing ingredients in the first 3 months.
- Database Growth: 50+ ingredients covered in the first release.
- Admin Accuracy: ≥90% accuracy of adulteration verification after admin review.
- User Feedback: 4.0/5 average satisfaction score.
- Operational: API response time <1s for ingredient lookup; support 1,000+ users in MVP.
Target audience
Primary Users:
- Health-conscious consumers.
- Families and households in urban areas.

Secondary Users:
- Food safety enthusiasts.
- Researchers and nutritionists.

Assumptions:
- Users will input basic ingredient info rather than uploading lab test results (MVP scope).
- Admins will curate and validate authenticity data manually.
User Side (Simplified Input)
•	Users will just type in basic ingredient info (e.g., “Milk looks watery” or “Honey dissolves too quickly”).
•	They won’t upload lab test reports, chemical analysis data, or any heavy files.
•	The system will give them instant rule-based feedback (e.g., “Possible adulteration with water” based on known rules).
Admin Side (Manual Validation)
•	Admins will review all user submissions.
•	They’ll cross-check with the ingredient database, known adulterants, and rules.
•	They will approve/reject/annotate the authenticity reports.
•	They can also add or edit ingredient data to improve the database over time.

Use cases
Key user flows and use cases:
1) Search ingredient details (e.g., Milk → Possible adulterants, detection methods).
2) Submit ingredient for authenticity check (form input).
3) Receive instant rule-based suggestion (likely authentic / possible adulteration).
4) Report suspicious/adulterated ingredient.
5) Admin reviews submissions and approves/rejects.
6) Admin manages ingredient database (add/edit/delete).

Excluded use cases for MVP:
- No hardware integration or lab result ingestion in the MVP.
- No automated lab-grade chemical analysis (only rule-based suggestions + human admin verification).
User roles & product use cases (table)
User role -> Product use case

Consumer (User):
- Search ingredient details (adulterants, detection methods)
- Submit ingredient for authenticity check (form input)
- Report suspicious/adulterated ingredient

Admin:
- Review user submissions and approve/reject
- Add/edit/delete ingredient info
- Monitor ingredient database health (status, reports)

Functional requirements - PoS 1: Ingredient Database + User Side
Ingredient Database
- Store ingredient details (name, description, possible adulterants, simple detection methods).

User Interface
- Ingredient search (by name / category).
- Ingredient details page (show adulterants + detection methods).
- Authenticity check submission form (user enters ingredient + suspected issue).

API Endpoints
- GET /ingredients (list all)
- GET /ingredients/:id (details)
- POST /check (submit authenticity check request)

Notes: Person A can take this (frontend + backend for user-facing parts).
Functional requirements - PoS 2: Admin Panel
Admin Panel (MVP: simple, skip login if needed for early demo)
- Review authenticity submissions (approve/reject).
- Manage ingredient database: Add new ingredient, Update ingredient details, Delete ingredient.

API Endpoints
- GET /submissions
- PUT /submissions/:id (review/update status)
- POST /ingredients
- PUT /ingredients/:id
- DELETE /ingredients/:id
Functional requirements - PoS 3: Rule-based AI Logic
Basic Detection Rules Engine
- Simple rules like:
  * If ingredient = milk and test=water mix → adulteration likely
  * If sugar floats in water → contains chalk powder
- On submission, system gives instant suggestion based on database rules.

API Endpoints
- POST /analyze → takes ingredient + user input, returns 'likely authentic' or 'possible adulteration'.

Integration
- Linked with PoS 1 submission form to give quick results.
Non-functional requirements
- Platforms: Web (React frontend, Node.js backend).
- Devices: Desktop + mobile browser support.
- Tracking: Ingredient search frequency, user submissions, admin reviews.
- Scale: Support 1,000+ users in MVP.
- Regions: Launch in India (focus market).
- Performance: API response time <1s for ingredient lookup.
- Security: JWT-based authentication for users/admins (MVP may skip strict auth but design for it).
Dependencies and potential risks
Dependencies:
- MongoDB Atlas for database.
- Render/Heroku for backend hosting.
- Vercel/Netlify for frontend hosting.

Risks:
- Limited dataset for adulteration detection (may affect accuracy).
- Rule-based AI may give oversimplified predictions.
- Deployment delays if API integration fails.
- Admin workload may grow quickly as submissions increase; consider moderation tooling and batching.

APIs (detailed list & minimal contract)
Ingredient APIs
- GET /ingredients
  * Query params: ?q=<search>&?category=<category>&?page=&?limit=
  * Response: 200 OK [ { id, name, description, category, adulterants[], tests[] } ]

- GET /ingredients/:id
  * Response: 200 OK { id, name, description, adulterants[], tests[] }

- POST /ingredients (Admin)
  * Body: { name, description, category, adulterants:[{name, description}], tests:[{name, steps}] }
  * Response: 201 Created { id }

- PUT /ingredients/:id (Admin)
  * Body: partial or full updates

- DELETE /ingredients/:id (Admin)

Submissions APIs
- POST /check
  * Body: { ingredientId (optional), ingredientName, userDescription, observedTests:[{testName, result}], location (optional) }
  * Response: 202 Accepted { submissionId, instantAnalysis: { verdict, matchingRules:[] } }

- GET /submissions (Admin)
  * Query: ?status=&?page=&?limit=

- GET /submissions/:id

- PUT /submissions/:id
  * Body: { status: 'approved'|'rejected'|'needs_info', adminNotes: '' }

Rule Engine API
- POST /analyze
  * Body: { ingredientName or ingredientId, observed………………………………………………………………………………………………………………………………………..+
+
ests:[{testName, result}], optional user fields }
  * Response: { verdict: 'likely_authentic'|'possible_adulteration', confidence: 0-1, matchedRules:[] }

Optional / Future APIs
- Auth: POST /login, POST /signup, POST /logout
- Metrics: GET /metrics
- Bulk import: POST /ingredients/bulk

Data model (MongoDB schemas - examples)
Ingredient Schema (collection: ingredients)
{
  _id: ObjectId,
  name: string,
  category: string,
  description: string,
  adulterants: [ { name: string, description: string, detection: [string] } ],
  tests: [ { name: string, steps: [string], expectedResult: string } ],
  createdAt: Date,
  updatedAt: Date
}

Submission Schema (collection: submissions)
{
  _id: ObjectId,
  ingredientId: ObjectId | null,
  ingredientName: string,
  userDescription: string,
  observedTests: [ { testName: string, result: string } ],
  instantAnalysis: { verdict: string, matchedRules: [string], confidence: number },
  status: 'pending'|'approved'|'rejected'|'needs_info',
  adminNotes: string,
  createdAt: Date,
  updatedAt: Date
}

User/Admin (optional for MVP)
{
  _id: ObjectId,
  name: string,
  email: string,
  role: 'admin'|'user',
  passwordHash: string,
  createdAt: Date
}

Sample adulterant table (seed entries for MVP)

Ingredient	Common Adulterants	Simple Detection Method
Milk	Water, starch, detergent, synthetic milk	1) Drop on polished surface: flows quickly → water.2) Add iodine: blue → starch.3) Shake: excessive foam → detergent.
Honey	Sugar syrup, glucose, jaggery syrup	1) Drop on blotting paper: pure honey doesn’t spread easily.2) Dissolve in water: adulterated honey dissolves quickly.
Sugar	Chalk powder, washing powder	1) Dissolve in water: chalk settles.2) Lather indicates washing powder.
Turmeric	Lead chromate, starch, artificial colors	1) Mix in water: streaks indicate artificial color.2) Iodine: blue → starch.
Tea leaves	Iron filings, coal tar dye, exhausted tea	1) Move a magnet through dry tea: iron filings stick.2) Dip in water: colored solution indicates dye.
Cooking oil	Argemone oil, mineral oil	1) Heat oil: argemone oil causes pungent smell.2) Feel test: mineral oil feels greasy longer.


Feature → API mapping (summary)
Feature -> APIs

- Search ingredients: GET /ingredients
- View ingredient details: GET /ingredients/:id
- Submit authenticity check: POST /check
- Instant rule-based analysis: POST /analyze
- Review submissions (admin): GET /submissions, GET /submissions/:id, PUT /submissions/:id
- Manage ingredients (admin): POST /ingredients, PUT /ingredients/:id, DELETE /ingredients/:id

Tasks breakdown (recommended tickets for next 48 hours)
Frontend (React)
- T1: Implement ingredient search page + results (connect GET /ingredients)
- T2: Implement ingredient details page (GET /ingredients/:id)
- T3: Implement submission form (POST /check) + client-side validation
- T4: Display instant analysis results (call POST /analyze)
- T5: Admin dashboard: list submissions (GET /submissions)
- T6: Admin dashboard: submission details + approve/reject (PUT /submissions/:id)

Backend (Node.js / Express)
- B1: Ingredient CRUD endpoints (GET/POST/PUT/DELETE /ingredients)
- B2: Submissions endpoints (POST /check, GET /submissions, GET /submissions/:id, PUT /submissions/:id)
- B3: Rule engine endpoint (POST /analyze) and simple rule storage
- B4: Connect to MongoDB Atlas and write seed script for sample ingredients

Database
- D1: Design MongoDB schemas and create indexes for search (text index on name/description)
- D2: Seed DB with the sample adulterant table

DevOps & QA
- CI: Setup basic CI to run lint/tests
- Deployment: Set up Render (backend) and Vercel (frontend) preview builds
- QA: Manual test plan for each endpoint and UI flow

Estimate: Aim to complete core user flows (search, view, submit, instant analysis, admin review) within 3-5 working days for an MVP demo.
Priority roadmap for MVP
Priority (build order):
1) Ingredient data model + GET endpoints + search UI
2) Submission form + POST /check with instant analysis integration
3) Rule engine (simple if-then rules) and POST /analyze
4) Admin: list submissions + approve/reject
5) Admin: manage ingredients (add/edit/delete)
6) Auth (JWT) and security hardening
7) Analytics and metrics

Rationale: Deliver a working user flow end-to-end early so demos can validate product value; expand admin and data operations next.
Work to be done before tomorrow's standup (checklist)
- Finalize list of features for MVP (confirmed in this doc)
- Break down features into tasks (see 'Tasks breakdown')
- Create pending APIs for the task app and medico (see APIs list)
- Seed database with sample ingredients (use sample adulterant table)
- Assign owners for T1-B4 tasks and confirm who will demo

Suggested owners (example):
- Frontend lead: Person A
- Backend lead: Person B
- Data & Admin workflows: Person C
- QA: Person D

Standup deliverables:
- Each owner states progress and blockers
- Backend returns endpoints' status (ready / in progress)
- Frontend shows stub UI for search and details

Appendix - Additional docs & links (placeholders)
- Roadmap/Project plan: (link to shared board)
- Engineering design doc: (link to eng doc)
- Mockups/UI/UX design: (link to Figma or mockups)
- Test plan: (link to test plan)
- Seed data CSV: (attach sample CSV in repo)

Notes & next steps:
- Consider enabling lightweight auth for admin before public launch.
- Plan data quality process: weekly review, curator quotas, and escalation to labs for suspicious patterns.
- Consider partnership outreach script to local food testing labs and consumer rights groups.

Medico PRD — Generated by team assistant. Last Updated: Sept 3, 2025




	
Requirements
Functional requirements
PoS 1 – Ingredient Database + User SideIngredient Database
o	Store ingredient details (name, description, possible adulterants, simple detection methods).
•	User Interface
o	Ingredient search (by name / category).
o	Ingredient details page (show adulterants + detection methods).
o	Authenticity check submission form (user enters ingredient + suspected issue).
•	API Endpoints
o	GET /ingredients (list all)
o	GET /ingredients/:id (details)
o	POST /check (submit authenticity check request)
 Person A can take this (frontend + backend for user-facing parts).
________________________________________
PoS 2 – Admin Panel
(Skip login for now, keep it simple)
•	Admin Panel
o	Review authenticity submissions (approve/reject).
o	Manage ingredient database:
	Add new ingredient
	Update ingredient details
	Delete ingredient
•	API Endpoints
o	GET /submissions
o	PUT /submissions/:id (review/update status)
o	POST /ingredients
o	PUT /ingredients/:id
o	DELETE /ingredients/:id

________________________________________
PoS 3 – Rule-based AI Logic
•	Basic Detection Rules Engine
o	Simple rules like:
	“If ingredient = milk and test=water mix → adulteration likely”
	“If sugar floats in water → contains chalk powder”
o	On submission, system gives instant suggestion based on database rules.
•	API Endpoints
o	POST /analyze → takes ingredient + user input, returns “likely authentic” or “possible adulteration”.
•	Integration
o	Linked with PoS 1 submission form to give quick results.
Non-functional requirements
•	Platforms: Web (React frontend, Node.js backend).
•	Devices: Desktop + mobile browser support.
•	Tracking: Ingredient search frequency, user submissions, admin reviews.
•	Scale: Support 1,000+ users in MVP.
•	Regions: Launch in India (focus market).
•	Performance: API response time <1s for ingredient lookup.
•	Security: JWT-based authentication for users/admins.





Dependencies and potential risks
•	Dependencies:
o	MongoDB Atlas for database.
o	Render/Heroku for backend hosting.
o	Vercel/Netlify for frontend hosting.
•	Risks:
o	Limited dataset for adulteration detection (may affect accuracy).
o	Rule-based AI may give oversimplified predictions.
o	Deployment delays if API integration fails.



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


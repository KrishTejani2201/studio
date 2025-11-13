# **App Name**: EduInsights Pro

## Core Features:

- CSV/XLSX Upload and Validation: Accept CSV/XLSX files, provide UI for validation, mapping of columns, and previewing data.
- Failure Risk Prediction: Predict the risk of student failure based on uploaded data, showing probability, risk bucket, and top contributing features.
- LLM-Generated Parent Feedback: Generate multiple variations of parent feedback using a LLM tool. Safe prompts to include only factual fields from uploaded data.
- Learning Resource Recommendations: Ingest learning resources, compute embeddings, and recommend top 5 resources based on semantic similarity, filtered by grade and difficulty.
- Role-Based Access Control: Implement role-based access control (RBAC) for teacher, parent, and admin roles, with JWT authentication and optional OAuth.
- Data Security and Observability: Implement TLS, encryption at rest, audit logs, rate limits, and data deletion workflows, ensuring comprehensive data protection.

## Style Guidelines:

- Primary color: Forest green (#0B6E4F) to convey growth and education.
- Background color: Light green (#F0F8F4), a soft, desaturated tint of the primary color.
- Accent color: Amber (#F59E0B) to highlight key interactive elements.
- Headline font: 'Space Grotesk', a sans-serif font that adds a computerized techy, scientific feel; use 'Inter' for body text.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use consistent, clear icons to represent data types and actions.
- Design a clear and responsive layout that adapts to different screen sizes, ensuring a seamless user experience.
- Use subtle transitions and animations to enhance user interactions, such as loading indicators and feedback on form submissions.
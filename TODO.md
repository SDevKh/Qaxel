# TODO: Complete Account Settings Page

## Steps to Complete
- [x] Import necessary Firebase Auth functions and React hooks in AccountSettings.tsx
- [x] Add state variables for user data, form fields (username, email, passwords), loading, and errors
- [x] Implement useEffect to listen for auth state changes and redirect to /login if not authenticated
- [x] Pre-populate form fields with current user details (email and display name)
- [x] Add form submission handler for updating profile (display name and email)
- [x] Add password change functionality with re-authentication and validation
- [x] Implement form validation (e.g., password confirmation, required fields)
- [x] Use toast notifications for success and error feedback
- [x] Structure the UI with sections for profile details and password change using existing UI components
- [x] Test the page by logging in and verifying pre-population, updates, and redirects

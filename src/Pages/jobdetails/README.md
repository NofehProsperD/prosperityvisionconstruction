# Prosperity Vision Construction — Job Details Page

This is a React job-details page for the Prosperity Vision Construction website. It retrieves an individual job from the existing GETLIN jobs API by the `:id` in the route. The page itself contains no GETLIN branding, navigation or application form.

## Files

- `JobDetails.jsx` — page component
- `JobDetails.css` — page styling
- `assets/construction-job-fallback.svg` — construction-themed fallback illustration

## 1. Configure the GETLIN API URL

In the root of the Prosperity Vision Construction React client, create or update `.env`:

```env
VITE_GETLIN_API_URL=https://YOUR-GETLIN-BACKEND-DOMAIN
```

Use the actual deployed GETLIN backend origin. Do not add `/jobs` at the end; the component adds `/jobs/:id`.

Restart the Vite development server after changing `.env`.

## 2. Put the fallback image in the public folder

Copy `assets/construction-job-fallback.svg` into the React client's `public` folder and name it:

`public/construction-job-fallback.svg`

The component uses `/construction-job-fallback.svg` whenever the job has no usable image or its image fails to load.

## 3. Add the route

In the file where your React Router routes are defined:

```jsx
import JobDetails from "./pages/JobDetails/JobDetails";

// Inside your <Routes>:
<Route path="/jobs/:id" element={<JobDetails />} />
```

Adjust the import path to match where you place `JobDetails.jsx`. Keep your existing jobs-list route, for example `/jobs`.

## 4. Link each job card

When rendering a job from the GETLIN jobs list:

```jsx
<Link to={`/jobs/${job._id}`}>View job</Link>
```

The page reads that ID with `useParams()` and requests:

`GET https://YOUR-GETLIN-BACKEND-DOMAIN/jobs/:id`

## 5. Expected public job fields

The page uses only:
- `title`
- `company` (string or object with a public name)
- `images` (array of `{ url, public_id }`; only `url` is displayed)
- `type`
- `category`
- `location`
- `salary`
- `dateline` (the page also falls back to `deadline` if an older record uses that name)
- `description`
- `status` (for the availability label)

It does not display `email`, `updatedBy`, `public_id`, or other private/internal fields. `expiresAt` is not displayed; the visible deadline is taken from `deadline`.

## Important API assumptions to verify

This component assumes:
- The detail endpoint is `GET /jobs/:id`.
- The backend returns the job directly, or inside `{ job: ... }`, `{ data: ... }`, or `{ data: { job: ... } }`.
- The job document contains `_id`.

If your actual GETLIN endpoint uses another path or response shape, change the fetch URL or `getJobFromResponse()` in `JobDetails.jsx`. The backend must allow the Prosperity Vision Construction domain through CORS and must expose only fields safe for public viewing.

## Dependencies

This page expects `react`, `react-router-dom`, and a Vite React client. No extra icon package is required.

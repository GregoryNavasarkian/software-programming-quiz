# Software Programming Quiz

```
To run:
npm ci
cd frontend
npm ci --legacy-peer-deps
cd ../backend
npm ci
npm run dev
```

### Requirements

Three main interfaces:

- For the employer, to CRUD an account and profile and login
- For the employer, to create a quiz and then email a unique key link that authorizes a person to take the quiz. The app should auto-email the key link to the candidate.
- For candidates, given the key link, allows them to take the timed quiz.
- For the employer, to see the quiz respondents ranked, and also individual results and stats.
- Variable number of questions, True/False, multiple choice, check all that apply, free-form answers.
- User has configurable amount of time to complete the quiz after clicking the key link and confirming the start of the quiz.
- An email should be sent to the employer after a candidate has completed a quiz.

# Universal Email Sender

A scalable, provider-agnostic email delivery system built with **Node.js**, **Express**, **BullMQ**, **MongoDB**, and **Redis**. It supports real-time email queuing, retry logic, and provider fallback across SMTP, Amazon SES

## Features

* RESTful API for sending emails
* Templated HTML emails
* Queue-based architecture using BullMQ
* Provider fallback logic (SES > SMTP)
* Rate limiting with Redis
* MongoDB logging for observability

## Getting Started

### Prerequisites

* Docker & Docker Compose

### Clone the repo

```bash
git clone [https://github.com/your-username/universal-email-sender.git](https://github.com/carlkiptoo/UniversalEmailSender.git)
cd universal-email-sender
```

### Configure Environment

Copy and configure the `.env` file:

```bash
cp .env.example .env
```

Set the following keys:

```env
PORT=3000
API_KEY=your_secure_api_key
REDIS_URL=redis://redis:6379
MONGO_URL=mongodb://mongo:27017/email-service

# Provider chain and credentials
PROVIDER_CHAIN=ses,smtp
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
```

### Run Everything

```bash
docker compose up --build
```

## 📨 API Usage

### POST `/v1/send`

Send an email using one of the configured providers.

**Headers**

```
Authorization: Bearer <API_KEY>
Content-Type: application/json
```

**Body**

```json
{
  "to": ["recipient@example.com"],
  "from": "noreply@yourdomain.com",
  "subject": "Welcome!",
  "template": "welcome",
  "variables": {
    "name": "John"
  }
}
```

### GET `/v1/health`

Returns the health status of the service.

## Security

* Authenticated using a Bearer API key
* Rate-limited (10 requests per 15 mins per IP)
* Abuse protection via Redis store

## Technologies Used

* **Node.js / Express** - REST API
* **BullMQ / Redis** - Job queue
* **MongoDB / Mongoose** - Logging
* **Nodemailer, AWS SDK** - Email providers

## Testing (coming soon)

You can test email delivery using tools like:

* Mailtrap (for SMTP)
* Amazon SES (sandbox)
* Logs in `email-service.emaillogs` collection (MongoDB)

## License

MIT

## Want to Contribute?

PRs welcome! Let me know if you want to add more email providers or improve performance.

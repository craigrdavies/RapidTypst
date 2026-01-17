// Code Documentation Template

#set page(margin: 2cm)
#set text(size: 11pt)
#set heading(numbering: "1.1")

#align(center)[
  #text(size: 28pt, weight: "bold")[Project Name]
  
  #v(0.5em)
  
  #text(size: 12pt, fill: gray)[
    Technical Documentation v1.0
  ]
]

#v(1em)

#outline(title: "Contents", indent: 1em)

#pagebreak()

= Introduction

== Overview

This document provides technical documentation for *Project Name*, a brief description of what the project does.

== Quick Start

```bash
# Clone the repository
git clone https://github.com/username/project.git

# Install dependencies
npm install

# Run the application
npm start
```

== Requirements

- Node.js >= 18.0
- npm >= 9.0
- MongoDB >= 6.0

= Architecture

== System Overview

The application follows a microservices architecture:

#figure(
  table(
    columns: 3,
    fill: (x, y) => if y == 0 { rgb("#f0f0f0") },
    [*Service*], [*Port*], [*Description*],
    [API Gateway], [8080], [Request routing and auth],
    [User Service], [8081], [User management],
    [Data Service], [8082], [Data processing],
  ),
  caption: [Service Architecture]
)

== Data Flow

+ Client sends request to API Gateway
+ Gateway authenticates and routes request
+ Service processes request
+ Response returned to client

= API Reference

== Authentication

All API endpoints require authentication via Bearer token.

#rect(fill: rgb("#fff3cd"), width: 100%, inset: 1em)[
  *Note:* Tokens expire after 24 hours. Use the refresh endpoint to obtain new tokens.
]

=== POST /api/auth/login

Authenticates a user and returns access token.

*Request:*
```json
{
  "email": "user@example.com",
  "password": "secretpassword"
}
```

*Response:*
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 86400
}
```

== Users

=== GET /api/users

Returns list of all users.

*Headers:*
- `Authorization: Bearer <token>`

*Response:*
```json
{
  "users": [
    {
      "id": "123",
      "email": "user@example.com",
      "name": "John Doe"
    }
  ],
  "total": 1
}
```

= Configuration

== Environment Variables

#figure(
  table(
    columns: 3,
    fill: (x, y) => if y == 0 { rgb("#f0f0f0") },
    [*Variable*], [*Required*], [*Description*],
    [`DATABASE_URL`], [Yes], [MongoDB connection string],
    [`JWT_SECRET`], [Yes], [Secret for JWT signing],
    [`PORT`], [No], [Server port (default: 8080)],
    [`LOG_LEVEL`], [No], [Logging level (default: info)],
  ),
  caption: [Environment Variables]
)

= Troubleshooting

== Common Issues

=== Connection Refused

*Problem:* Cannot connect to database

*Solution:*
+ Verify MongoDB is running
+ Check `DATABASE_URL` is correct
+ Ensure network connectivity

=== Authentication Failed

*Problem:* 401 Unauthorized response

*Solution:*
+ Verify token is not expired
+ Check Authorization header format
+ Regenerate token if needed

= Changelog

== v1.0.0 (2025-01-15)

- Initial release
- User authentication
- CRUD operations
- API documentation

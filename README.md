# 🐞 Issue Tracker Backend (Passwordless MERN API)

This project is a secure Issue Tracker backend built with Node.js, Express, MongoDB, and JWT, using a password-less authentication system (OTP via Email) and role-based access control (RBAC).

It follows a clean layered architecture suitable for real-world applications and academic assignments.


## 📌 Key Features

- ✅ Password-less Authentication (OTP via Email)

- ✅ JWT-based Authorization

- ✅ Role & Permission-based Access Control

- ✅ Issue CRUD Operations

- ✅ Admin-only Issue Management

- ✅ Audit Logging

- ✅ Email Notifications

- ✅ Clean Architecture (Controller → DTO → Service → Model)

### 🏗️ Backend Architecture

src/
├── controllers/      # Handle HTTP requests & responses
├── services/         # Business logic
├── dtos/             # Data Transfer Objects (validation & formatting)
├── middlewares/      # Auth & permission checks
├── models/           # MongoDB schemas
├── utils/            # Helper utilities (JWT, OTP, logging)
├── templates/        # Email templates
├── routes/           # API route definitions


### 🔐 Authentication Flow (Password-less)

- 1️⃣ Request OTP

- -User submits email

- -OTP is generated and emailed

- -OTP stored in DB (hashed)

- -Short-lived OTP token returned

- 2️⃣ Verify OTP

- - User submits OTP + token

- - OTP verified

- - JWT access token issued

- 3️⃣ Access Protected Routes

- - JWT sent in Authorization header

- - Permissions validated per route

## 🔑 Role & Permission System

- Role Model

```json

{
  name: "admin",
  permissions: [
    "issue:create",
    "issue:get-my-issues",
    "issue:update-my-issue",
    "issue:get-my-one-issue",
    "issue:all",
    "issue:modify"
  ]
}


```

- User Model

```json

{
  email: "user@example.com",
  role: ObjectId("role_id"),
  isActive: true
}


```


- ⚠️ Admin users are manually assigned in MongoDB (Compass)
- This simplifies the system and avoids admin misuse.

## 🛡️ Middleware Explanation

- Auth Middleware

- - Validates JWT and attaches user to request.

```js

const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;

```

- Permission Middleware

- - Checks whether the user role contains required permissions.

```js

checkPermission(["issue:modify"])


```

### 📦 DTO (Data Transfer Object) Pattern

- DTOs sanitize and standardize incoming data.

- Example: Create Issue DTO

```js


exports.CreateIssueDTO = (data, token) => ({
  data: {
    title: String(data?.title || "").trim(),
    desc: String(data?.desc || "").trim()
  },
  token: String(token || "").trim()
});


```

- ✅ Prevents invalid data
- ✅ Keeps controllers clean


### 🎯 Controller Responsibility

- Controllers:

- - Read request

- - Call DTO

- - Call service

- - Send response


- Example: Create Issue Controller

```js

const dto = CreateIssueDTO(req.body, token);
const result = await IssueService.CreateIssue(dto.data, dto.token, req);
res.status(200).json(result);

```

- ❌ No business logic here
- ✅ Clean & readable

## 🧠 Service Layer (Business Logic)

- Handles:

- - Token verification

- - DB operations

- - Email notifications

- - Audit logging

### Example: Create Issue Service

```js

const issue = new Issue({
  title: data.title,
  desc: data.desc,
  user: user._id
});

await issue.save();
await NotificationEmail(user.email, "Issue Created");


```

### 🧾 Audit Logging

- Every important action is logged.

```js

await logUserAction(
  req,
  "ISSUE_CREATED",
  "User created an issue",
  metadata,
  user._id
);


```

- Stored data:

- - User

- - Action

- - IP Address

- - User Agent

- - Timestamp


### 📧 Email System

- Uses Nodemailer (Gmail SMTP)

- Types:

- - OTP Login Email

- - Issue Notification Email

```js

await sendEmail({
  to: email,
  subject: "System Notification",
  html: emailTemplate
});


```

## 🐞 Issue Management Rules
### Normal User

- Create issue

- View own issues

- Update own issues

### Admin

- View all issues

- Modify severity / priority / status


```js

router.put(
  "/modify-issue/:id",
  auth,
  checkPermission(["issue:modify"]),
  IssueController.modifyissue
);


```

### 🔒 Security Considerations

- OTP is hashed

- OTP expires automatically

- JWT expiration enforced

- Permissions validated per route

- Admin role cannot be self-assigned


### 🧪 Technologies Used

- Node.js

- Express.js

- MongoDB + Mongoose

- JWT

- Nodemailer

- bcrypt

- OTP-based authentication


### 📘 Assignment Notes

- Uses industry-level architecture

- Demonstrates RBAC

- Shows password-less security

- Clean separation of concerns

- Suitable for MERN / Backend assignments



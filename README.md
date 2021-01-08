# task_app
This task app was built following along a course about NodeJS.

<br/>

## Features:

User profile creation, update and deletion, login, logout from current or all sessions

Tasks creation, update and deletion. Fetch of one or many with filters and sorting parameters

<br/>

## Data models:

user
```
{
    name: "string | required",
    email: "string | required | unique",
    password: "string | required | minlength = 7",
    age: "number | optional",
    avatar: "buffer | image"
    -- internal fields --
    tokens: "array of session tokens",
    createdAt: "datetime",
    updatedAt: "datetime",
    tasks: "virtual field / relationship"
}
```

tasks
```
{
    description: "string | required",
    completed: "boolean | optional, defaults to false",
    -- internal fields --
    owner: "objectId | user who created",
    createdAt: "datetime",
    updatedAt: "datetime"
}
```

<br/>

## Endpoints

----------

### /users

*User sign-up*

POST `/users`

request body =>
```
{
    name: "string | required",
    email: "string | required | unique",
    password: "string | required | minlength = 7",
    age: "number | optional"
}
```

response => session token
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

*User login*

POST `/users/login`

request body =>
```
{
    email,
    password
}
```

response => session token
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

*User logout*

POST `/users/logout`

request header => session token
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

response => 200

*User logout from all sessions*

POST `/users/logoutAll`

request header => session token
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

response => 200

*Get profile*

GET `/users/me`

request header => session token
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

response => user object
```
{
    name,
    email,
    age,
    createdAt,
    updatedAt
}
```

*Update profile*

PATCH `/users/me`

request header => session token
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

request body => desired updates (from the ones allowed)
```
{
    name: "string",
    email: "string | unique",
    password: "string | minlength = 7",
    age: "number"
}
```

response => user object
```
{
    name,
    email,
    age,
    createdAt,
    updatedAt
}
```

*User deletion*

DELETE `/users/me`

request header => session token
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

response => user object
```
{
    name,
    email,
    age,
    createdAt,
    updatedAt
}
```

*Add profile pic*

POST `/users/me/avatar`

request header => session token
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

request body => form data with file type field
```
avatar: file (png, jpg or jpeg)
```

response => 200

*Delete profile pic*

DELETE `/users/me/avatar`

request header => session token
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

response => 200

*Fetch an user's profile*

GET `/users/:id/avatar`

request header => session token
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

response => profile of user referenced in the "id" parameter

---------------

### /tasks

*Task creation*

POST `/tasks`

request header => session token
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

request body =>
```
{
    description: "string | required",
    completed: "boolean | optional, defaults to false"
}
```

response => created task
```
{
    description,
    completed,
    createdAt,
    updatedAt
}
```

*Fetch all tasks*

GET `/tasks`

optional query parameters:
```
completed = true | false 
sortBy: any field, colon asc or desc = createdAt:asc, updatedAt:desc, completed:asc
limit: page size = 10
skip: page number (if equal to page size) = 10
```

request header => session token
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

response => tasks array
```
[
    {
        description,
        completed,
        createdAt,
        updatedAt
    },
    {
        description,
        completed,
        createdAt,
        updatedAt
    }
]
```

*Fetch an specific task*

GET `/tasks/:id`

request header => session token
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

response => task object
```
{
    description,
    completed,
    createdAt,
    updatedAt
}
```

*Update a task*

PATCH `/tasks/:id`

request header => session token
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

request body => desired updates (from the ones allowed)
```
{
    description: "string",
    completed: "boolean"
}
```

response => task object
```
{
    description,
    completed,
    createdAt,
    updatedAt
}
```

*Task deletion*

DELETE `/tasks/:id`

request header => session token
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

response => task object
```
{
    description,
    completed,
    createdAt,
    updatedAt
}
```



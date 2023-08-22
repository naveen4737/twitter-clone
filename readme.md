
# Twitter Clone

Backend - NodeJS

Frontend - ReactJS

Database - MongoDB

API Architecture - REST API


## Live Site

https://twitter-clone-3i0t.onrender.com


## Features
### User
- LogIn

        POST    /api/v1/users/login
- SignUp

        POST    /api/v1/users/register
- Follow user

        PUT    /api/v1/users/follow
- Unfollow user

        PUT    /api/v1/users/unfollow

### Tweet
- Post Tweet

        GET    /api/v1/tweet/create
- Edit Tweet

        PUT    /api/v1/tweet/edit
- Delete Tweet

        DELETE    /api/v1/tweet/:id
- View user's tweets

        GET    /api/v1/tweet/fetch
- View tweets in user's timeline

        GET    /api/v1/tweet/mytweets



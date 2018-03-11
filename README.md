# Fancy To Do as GAMES BACKLOG, your nightmares
adding game to do list and listing your unplayed steam games

# Routing
basic routes for this project:

| Route               | HTTP   | Description  |
| --------------      |:------:| ------------:|
| /users/add          | POST   | add a new User, admin only |
| /users/task/:id     | GET    | get user data and to do tasks, authorized user |
| /users/edit/:id     | PUT    | edit user data, authorized user |
| /users/delete/:id   | DELETE | delete user data, authorized user |

| Route               | HTTP    | Description  |
| --------------      |:-------:| ------------:|
| /tasks/search       | GET     | Search for user's Task, authorized user |
| /add/:userID        | POST    | add task to user, authorized user |
| /edit/:taskID       | PUT     | edit task data, authorized user |
| /delete/:taskID     | DELETE  | delete task data, authorized user |

| Route               | HTTP   | Description  |
| --------------      |:------:| :------------|
| /fb-api/facebook    | POST   | login to facebook and record user data in database if not already in db |
| /steam/add-all      | POST   | authorize user, then check the steamid exist in db. then connect to steam api to get all owned games with playtime < 10 hours. recorded all games as tasks into database |

# Usage

Setting up
```
npm install
```

Starting with npm
```
npm start
```
or
```
npm run dev
```

# Database create method in postman/ insomnia
User
```
create requires req.body : userName, email, and JWT token
edit requires req.body : {edit data}, and JWT token
getting user data requires req.body : JWT token
Deleting requires req.body of JWT token
*note it is required to add steamid manually through editing
```

Task
```
getting Task data requires req.body : JWT token
create requires req.body : name, category, desc, and JWT token
edit requires req.body : {edit data}, and JWT token
Deleting requires req.body of JWT token
```

API
```
login to fb requires req.body : token(fb access token with email and profile scope)
adding steam games to task requires req. body : JWT token
*warning adding all steam games may result in hundreds of your backlog shows up as task.
```


Access from postman/insomnia at localhost:3000

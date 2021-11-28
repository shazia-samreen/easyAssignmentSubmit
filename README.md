
# EasyAssignmentSubmit

An Application where teachers can distribute the assignment, students can submit the assignments and teacher can score the assignments accordingly


## Features

#### For teachers
- Teachers can create an account and login with the credentials
- Teachers can distribute assignments in the form of PDF to students.
- Teachers can choose which class to give the assignment to and all the students of that class would find that assignment in their dashboard.
- Teachers can see the submitted assignments.
- Teachers can score the submitted assignments.
- Teachers can modify the submitted assignment scores any time.
- Teachers can filter assignments based on duration the assignment is submitted like teachers can filter assignments that were submitted in last 2 days,3 days,7 days etc.

#### For students
- Students can create an account and login with the credentials
- Students can see the assignments given to them
- Student can submit the assignments
- The score that teacher gave will be reflected on the students dashboard

#### Extra features
- Encryption of password is used using bcrypt algorithm.
- User can reset password any time they forget password

## Tech Stack

**Client:** React

**Server:** Node, Express

**Database:** MongoDB





## Live Demo

http://easy-assignment-submit.herokuapp.com/


## To run Locally

Clone the project

```bash
  git clone https://github.com/shazia-samreen/easyAssignmentSubmit.git
```

Go to the project directory

```bash
  cd directory_where_project_is_cloned
```
Change branch if the branch is anything other than master

```bash
  git checkout master
```

### Steps to run project in development mode

Install backend dependencies

```bash
  npm install
```

Install front dependencies

```bash
  cd frontend
  npm install
```
Change the root url in http-common.js file present in frontend directory to localhost:3000

```bash
  cd directory_where_project_is_cloned
  create a database and generate a MONGODB_URI copy install
  create a user under iam role section of aws and store the AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY
  create an .env file and add the fields MONGODB_URI,AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY
```
Go to the root directory and start the backend server

```bash
  cd directory_where_project_is_cloned
  npm install nodemon --save-dev
  npm run devstart or simply run the command node app.js
```

Go to frontend directory and start the server

```bash
  cd frontend
  npm start
```
##### Now you can access the app at ```localhost:3000 ```

### Steps to run project in production mode

Install backend dependencies

```bash
  npm install
```
Change the root url in http-common.js file present in frontend directory to localhost:3000

```bash
  cd directory_where_project_is_cloned
  create a database and generate a MONGODB_URI copy install
  create a user under iam role section of aws and store the AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY
  create an .env file and add the fields MONGODB_URI,AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY
  In .env file,add a field NODE_ENV and set it to production
```
Go to the root directory and start the backend server

```bash
  cd directory_where_project_is_cloned
  npm install nodemon --save-dev
  npm run devstart or simply run the command node app.js
```
##### Now you can access the app at ```localhost:5000 ```

### Documents to get more information about Schema and project workflow

https://drive.google.com/file/d/14Yz9fp5yTtvIic_uNFqOTdhCTbk4qU80/view?usp=sharing
https://drive.google.com/file/d/1C4gK0aaDhTf2fpQtt_YT70aGvxoDDDKJ/view?usp=sharing



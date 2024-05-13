# Nextjs and Prisma with Login create Tasks

#### [Same Project with React and Flask ](https://github.com/diegoperea20/Flask-React-Login-create-Tasks)

#### [Same Project with Nextjs and Flask ](https://github.com/diegoperea20/Nextjs-and-Flask-with-Login-create-Tasks)

<p align="justify">
Nextjs fronted with Flask REST API with sqlite where there is a login and register (you can change password and email, delete account) where each user can create titles and descriptions (you can edit and delete them) and in 'same' section the user can select the count of how many people have the same title he has created and see the emails of those people who have the same title.
</p>

<p align="center">
  <img src="README-images/login.PNG" alt="Step1">
</p>

<p align="justify">
First create an account where you must create a username, password ("Must include at least one number.", "Must include at least one lowercase letter,"Must include at least one lowercase letter.", "Must include at least one uppercase letter.", "Must include at least one uppercase letter.","Must include at least one uppercase letter.", "Must include at least one uppercase letter.", "Must include at least one uppercase letter.","Must include at least one special character.", "Must include at least one special character.", "Must include at least one special character.","The length of the password must be equal to or greater than 8 characters.","Must not contain blank spaces.")  Confirm your password and enter an email address.
</p>

<p align="center">
  <img src="README-images/loginup_1.PNG" alt="Step2">
</p>

<p align="justify">
After entering the data correctly, click on the "Register" button.
</p>

<p align="center">
  <img src="README-images/loginup-2.PNG" alt="Step3">
</p>


<p align="justify">
In login enter your username and password, click on the "Login" button.
</p>

<p align="center">
  <img src="README-images/login-2.PNG" alt="Step4">
</p>


<p align="justify">
After logging in you will see the home screen where you will see your user name and registration id, in this section you can log out, change your password, delete your account (delete your account and tasks), and create a new task.
</p>

<p align="center">
  <img src="README-images/home.PNG" alt="Step5">
</p>

<p align="justify">
In change password you can change your password and email if required.
</p>

<p align="center">
  <img src="README-images/changepassword.PNG" alt="Step6">
</p>

<p align="justify">
In task, you can create a title and a description of your choice, you can edit and delete it, and with the "home" button you go back to home and the "same" button to the same section.
</p>

<p align="center">
  <img src="README-images/task-1.PNG" alt="Step7">
</p>

<p align="justify">
Once you have created your task you can edit it with the "Edit" button where you will see the title and description, you only have to modify it by clicking on the "Update" button. If you don't want to make the modification click on the "Cancel Edit" button.
</p>

<p align="center">
  <img src="README-images/task-edit.PNG" alt="Step8">
</p>
<p align="center">
  <img src="README-images/task-edit-2.PNG" alt="Step9">
</p>
<p align="center">
  <img src="README-images/task-edit-3.PNG" alt="Step10">
</p>

<p align="justify">
In this same section there are three buttons in which "Task" to return to Task, the button "Count People Same titile" once clicked counts how many users have the same title of the titles that the user has created in his account and these are shown in a table, the button "People Emails same title" once clicked shows the emails of the users that have the same title that the user has created in his account in a table form.
</p>

<p align="center">
  <img src="README-images/same.PNG" alt="Step11">
</p>

<p align="justify">
If there are no matching titles, a message will appear where it says: No title matches with other users.
</p>

<p align="center">
  <img src="README-images/same-not.PNG" alt="Step12">
</p>

<p align="justify">
But if there are the same titles, the table of the selected button appears, in this case "Count People Same title":
</p>
<p align="center">
  <img src="README-images/same-count.PNG" alt="Step13">
</p>

<p align="justify">
But if there are the same titles, the table of the selected button appears, in this case "People Emails same title":
</p>
<p align="center">
  <img src="README-images/same-emails.PNG" alt="Step14">
</p>


## Steps to implement it


Fronted Nextjs Options for do it:


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
Nodejs version v20.10.0 and Next.js version v14.2.3 

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Resolve : Error Nextjs Parsing error: Cannot find module 'next/babel'

Put this code in .eslintrc.json 
```bash
{
  "extends": ["next/babel","next/core-web-vitals"]
}
```



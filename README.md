# BORDER-502 CSCE431 project

## _About_

An application designed for Engineers Without Borders (EWB) to highlight its mission and allow officers to easily track it's users information. This app provides an interactive platform to showcase EWB's projects, track their progress, and allow users to easily store and update user information. This repository contains the source code, documentation, and development resources for the EWB app.

## _Requirements_
This code has been run and tested on:

- **Ruby:** 3.2.2
- **Rails:** 7.0.3
- **Ruby Gems:** Listed in `Gemfile`
- **PostgreSQL:** 13.7
- **NodeJS:** v20.17.0
- **npm:** 10.8.3

## _External Dependencies_

- **Docker:** Download latest version at https://www.docker.com/products/docker-desktop
- **Heroku CLI:** Download latest version at https://devcenter.heroku.com/articles/heroku-cli
- **Git:** Downloat latest version at https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

## _Installation_

Dowload this code repository by using git:

`git clone https://github.com/tysanders-tamu/border-502-project.git`

## _Tests_

An RSpec test suite is available and can be run using:

`rspec spec/`

Must be in `backend` directory

The frontend can be tested by using:

`npm run test`

Must be in `frontend` directory

## _Execute Code_

Run the following code in Powershell if using windows or the terminal using Linux/Mac

  `cd border-502-project`
  
  `docker run --rm -it --volume "$(pwd):/csce431" -e DATABASE_USER=test_app -e DATABASE_PASSWORD=test_password -p 3000:3000 tysand/border-502`

  `cd backend`
  
Install the backend API

  `bundle install && rails db:create && rails db:migrate`

Run the backend API

  `rails s -b=0.0.0.0`

In another window, run the following code in Powershell if using windows or the terminal using Linux/Mac

  `cd border-502-project`

  `cd frontend`

Install the frontend application

  `npm install`

Run the frontend application

  `npm run dev`

The frontend application can be seen in the browser by navigating to http://localhost:3001
The backend application is located at http://localhost:3000, but as it is an API and it authenticates requests, not much will be shown

## _Environment Variables/Files_

Google OAuth2 support requires two keys to function as intended: Client ID and Client Secret

The frontend needs these 2 keys in the form of environment variables

Navigate to the `frontend` directory and create a `.env.local` file with the following lines

  `AUTH_GOOGLE_ID="YOUR_GOOGLE_OAUTH_CLIENT_ID_HERE"`

  `AUTH_GOOGLE_SECRET="YOUR_GOOGLE_OAUTH_CLIENT_SECRET_HERE"`

The frontend needs another environment variable which can be added to the same `.env.local` file. Add the following line to the file

  `NEXTAUTH_URL=http://localhost:3001`

Both the frontend and backend need the `AUTH_SECRET` which can be generated with `npm exec auth secret` in the frontend directory. This will add the environment variable to the `.env.local` file. You can copy this line generated to a `.env.local` file in the `backend` directory.

The backend needs 2 more environment variables which can be added to the `.env.local` file we generated for the backend. Add the following lines to that file

  `FRONTEND_ORIGIN=http://localhost:3001`

  `NEXT_PUBLIC_AUTHJS_LOCAL_SESSION_COOKIE="next-auth.session-token"`

## _Deployment_

Setup a Heroku account: https://signup.heroku.com/

Two pipelines will be needed. One for the backend and one for the frontend. The backend pipeline will be created first.

From the heroku dashboard select `New` -> `Create New Pipline`

Name the pipeline, and link the respective git repo to the pipeline

Select `Enable Review Apps`

Click `New app` under review apps, and link your test branch from your repo

Once the app is created, click on it and go to `manage add-ons`. Search for `Heroku Postgres` and add it. Navigate to the settings and select `Add buildbpack` in `Buildbpacks`. Add the `https://github.com/timanovsky/subdir-heroku-buildpack` buildpack.

Repeat the same steps for the frontend pipeline, but don't add the `Heroku Postgres` add-on.

Under staging app, select `Create new app` and link your main branch from your repo. Do this for both pipelines.

Config Vars can be set in `Settings` -> `Config Vars` -> `Reveal config vars`. Both the frontend and backend need the `PROJECT_PATH` variable which is set to the directory where the app is hosted, so either backend or frontend. The rest of the environment varaibles for the respective applications can be set like we did with the `.env.local` files. The environment variables with URLs must be changed to match their new URLs.

You can select `Open app` in the pipeline dashboard once the apps are built.

With the staging app, if you would like to move the app to production, click the two up and down arrows and select `Move to production`

Now the app will be in production

## _CI/CD_

For continuous development, we set up Heroku to automatically deploy our apps when their respective github branches are updated.

  `Review app: test branch`

  `Production app: main branch`

For continuous integration, we set up a Github action to run our specs, security checks, linter, etc. after every push or pull-request. This allows us to automatically ensure that our code is working as intended.

## _Support_

Admins looking for support should first look at the application help page.
Users looking for help seek out assistance from the same page or the customer.

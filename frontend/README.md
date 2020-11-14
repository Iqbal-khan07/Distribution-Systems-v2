# Commercial Distribution Solutions - Frontend Team

## Description
This frontend project currently uses React, Facebook and Google OAuth, and several react modules
like Materials UI along with Heroku to deploy this web application.
Commercial Distribution Solutions is a distribution center management system that allows authorized users to
sign in and perform the tasks that correpond to their role as either order taker or order fulfillers.
Such tasks include viewing all invoices, placing an order, and viewing
registered shops (customers) in the system.

## What Works for the MVP
Currently, our application features l

## Setup
To use this repository, you must follow these steps:
### 0. Clone this repo
1. Run `git clone https://github.com/Zoraiz-Naeem/Distribution-System-CS490`
2. Go to github and make a new personal repository.
3. To make your own personal repository and have your git point to it, run the following:
    - `git remote rm origin`
    - `git remote add origin http://www.github.com/<your-username>/<your-repo-name>`
4. Run `git remote -v` and make sure this points to your newly created Github repo
5. Now run `git push origin master`

### 1. Upgrade Node version

`$ nvm install 12.18.1`

if you don't current have NVM installed, you can follow the steps in the link before and
retry this step.
https://itnext.io/nvm-the-easiest-way-to-switch-node-js-environments-on-your-machine-in-a-flash-17babb7d5f1b

### 6. Install initial `npm` dependencies from `package.json`

This command runs `npm`, which looks inside our `package.json` file, 
retrieves a list of packages, and installs them to the `node_modules` folder
inside your repository. `node_modules` folder **does not** need to be pushed
to Heroku or GitHub.

- `npm install` 
    **Note: This command MUST be run from the folder that contains package.json!**
    **You will get an error if you are in a different folder!**
- `npm install react-facebook-login`
- `npm install react-google-login`
- `npm install formik --save` 
- `npm install @material-ui/core`
- `npm i @date-io/date-fns`
- `npm install axios`
- `npm i date-fns`
- `formik`
- `formik-material-ui`
- `formik-material-ui-pickers`
- `react-router-dom`


:warning: :warning: :warning: If you see any error messages, make sure you use `sudo pip` or `sudo npm`.
If it says "pip cannot be found", run `which pip` and use `sudo [path to pip from which pip] install` :warning: :warning: :warning:




### 3. Setup OAuths
#### Google OAuth
1. Go to <https://console.developers.google.com/> and login using your personal google account (if you don't already have one, just sign up)
2. Click "CREATE PROJECT" or in the dropdown menu called "Select a Project" in the top, click "NEW PROJECT".   
3. Make a new project named ChatApp. "No organization" is fine.  
4. Click "Credentials" in the left hand bar, then click "+ CREATE CREDENTIALS" and then click "OAuth client ID".  
4.5. If you see a warning that says "To create an OAuth client ID, you must first set a 
product name on the consent screen", do the following steps:  
	a. Click the "CONFIGURE CONSENT SCREEN" button.
	b. Choose "External"
	c. For "Application name," specify "ChatApp" or something similar.
	d. Press save.
5. Go back to Credentials -> Create Credentials -> OAuth client ID. Click "web application".  
6. Make name the "ChatApp" and under both Authorized JavaScript origins & Authorized redirect URIs you're going to click "Add URI" and paste the
link for you website (once we deploy on heroku, we will have to add our heroku app link onto here too)
:grey_exclamation: If you plan on running the app locally you must include http://localhost:3000 as your URI:grey_exclamation:
7. Click "Create" and copy your Client ID. This ID will be pasted into your GoogleButton.jsx file.  Towards the bottom of the file, where
it says `clientId="<some-id>"``, you're going to replace <some-id> with the Client ID you just copied. Save changes.

#### Facebook OAuth
1. Go to <https://developers.facebook.com/> and login using your personal account (if you don't already have one, just sign up)
2. Create an App. Select “for everything else” and specify Project Name (i.e. "ChatApp")
3. Create App ID
4. Under add a Product select “Facebook Login” Setup
5. Enable Client OAuth login and Web OAuth login
6. Under Valid OAuth Redirect URIs insert the link for your website (same as with the Facebook one).  Keep in mind we will need to add a new URI when we get our heroku app up.
:grey_exclamation: If you plan on running the app locally you don't need to include a URI :grey_exclamation:
7. Save Changes
8. Now you have your App ID that you can copy to make this work.  Include this key in your FacebookButton.jsx file towards the bottom of
the file where it says `appId="<some-id>"``, you're going to replace <some-id> with the AppD you just copied.  Save
changes.


### 2. Run React App
`npm start`

This command runs the app in the development mode.  It will take a some time to start the development server.
Once the program has compiled and the server is up, you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make edits.
You will also see any lint errors in the console.


**If this step fails for whatever reason, refer to the error message to see what steps you can  take to fix it**


### 9. Deploying onto Heroku
1. Sign up for heroku at <https://www.heroku.com/> 
2. Install heroku by running `npm install -g heroku`


#### Pushing files into Heroku
1. On Heroku console, configure variables by adding your secret keys (from ipstack.env). Go to <https://dashboard.heroku.com/apps>
    and click into your app. Click on Settings, then scroll to "Config Vars." Click
    "Reveal Config Vars" and add the key value pairs for each variable used.
    Your config var key names should be:
    DATABASE_URL ***This is automatically configured***
    IPSTACK_KEY
2. Create and push heroku files
    a. Configure Procfile with the command needed to run your app:
    `web: python app.py`
    b. Configure requirements.txt with all requirements needed to run your app:
        i. Automatically load all requirements onto requirements.txt with `pip freeze > requirements.txt` command
3.	Commit and push changes to git
4.	Push onto heroku with `git push heroku master`
5.	After the app builds, navigate to your newly-created heroku site!
6.	If the app is not working then restart all dynos from heroku app console
7. If you are still having issues, you may use heroku logs --tail to see what's wrong.



## Troubleshooting
1. I had difficulty understanding how to use sockets.  In particular, I was having a hard time trying to figure out how to
prevent users who weren’t logged in yet from sending messages to the chat.  Also, I was having a hard time understanding
how to display the messages that were saved on the database to a user only upon logging in.  To solve this problem, I 
spent a long time reading the flask-socketio documentation.  I realized later that I could make use of the rooms feature 
on sockets.  In doing this, I can make the main chat in the room, that the user can join only upon successful login.  
Upon joining the room, the user was then emitted the chat history from the server
2. I had a hard time rendering the messages that the user sent that were meant to be links/images.  The reason for this is 
because the messages were being passed from the server to the client as strings so tags within the string were not being
rendered and were being shown on the webpage.  As I did research, I found there exists a React component called Interweave 
that parses the string and returns html tags.


## Information on Individual Progress/Contributions
### Zoraiz Naeem
1. Set up the Frontend React Project Template/directory structure to follow.
2. Implemented the Signed In template for the pages. It includes a closable side bar, and navbar
3. Set up user context, and axios default end point.
4. Implemented the new order form.
       - Used Formik for the state management of the form.
5. Implemented the order status component
6. Set up the react routing for the project.
7. Implemented a few other smaller components.
8. Implemented the layouts of the shoptracker and orders page. Basically where and how the components will be placed relative to each other.

### Denisse Mendoza

## Work Left Incomplete
1. The login form is not connected to the backend. Basically, the OAuth for Google and Facebook is setup but we could not relay that information to the backend via a Post Request(Lacking a minor Post call)
2. Form the order taking form, all the data is collected, but the data is not sent back to the backend via a Post Request(Lacking a minor Post call)

## Frontend Team
Zoraiz Naeem
(Note implementation includes styling the components, writing the html, wiring the various components together, making api calls to backend etc etc)
Denisse Mendoza
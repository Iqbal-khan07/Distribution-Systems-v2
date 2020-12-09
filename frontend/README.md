# Commercial Distribution Solutions - Frontend Team

## Description

This frontend project currently uses React, Facebook and Google OAuth, and several react modules like Materials UI, Formik and Apex Charts along with Heroku to deploy this web application. Commercial Distribution Solutions is a distribution center management system that allows authorized users to sign in and perform the tasks that correpond to their role as either order taker or order fulfillers. Such tasks include viewing all invoices, placing an order, and viewing registered shops (customers) in the system.

## What is Currently Working in Frontend

**To properly interract with the application, you will need the following log-in information**
**Administrator**
username: admin
password: root

**Order-Taker:**
username: order_taker
password: ot1234

**Order-Fulfiller:**
username: order_fulfiller
password: of1234

Our application, in its current standing for the MVP contains the following features:

- The main page contains 3 pages the user can redirect to:
  1. The logo redirects to the home page.
  2. The "About Us" button redirects to the landing page for the app.
  3. The login button that pops up a log in dialogue box.
- A log-in Screen:
  1. The user can be signed in with either Facebook or Google OAuth.
  2. The user can input and email and password.
  3. The user is redirected to their logged-in Dashboard as it corresponds to their role.
- An Orders Page (Signed-In Page):
  1. A list of all orders is displayed in a table.
  2. The user can get more info on a shop by clicking the info icon from an order on the table.
  3. The user can place an order.
  4. An order status card is displayed that shows the number of orders that are delivered, pending, paid, and
     credited.
  5. Current stock is displayed in an order.  An order can only be placed if there is enough items in stock.
- A Shop-Tracker Page (Signed-In Page):
  1. A list of all registered shops (clients) is displayed in a table.
  2. The user can press a button to add a shop.
  3. A 'total shops' card is displayed that shows the total number of registered shops.
- An Inventory Manager Page (Signed-In Page):
  1. A list of all products and the stock inventory detail
  2. The user can add a product to the distribution center by filling in a form.
  3. The user can update the stock value.
- An Employee Page (Signed-In Page):
  1. A list of all employees is displayed in a table.
  2. The user can get more info on an employee by clicking the info icon next to the employee's entry.
  3. If the selected user is an order-fulfiller, a card with the number of orders delivered today will display.
  4. If the selected user is an order-taker, a card with the goal details of the order-taker will display.
  5. A monthly goal can be set for a selected-order taker by submitting a form.
  6. The user can add an employee by clicking on the button and filling out the form.
- Order-Fulfiller Dashboard
  1. A display of the aggregate sum of products that are needed for today's deliveries is displayed in a table.
  2. All delivery cards with the delivery address, and order details is displayed.
  3. The user can mark an order as delivered, which is then confirmed.
- Order-Taker Dashboard
  1. A display of the goal detail for the month is displayed.
  2. The user can see the amount of orders they've taken, the amount in sales they've made, and their target goal for the month


## Setup

To use this repository, follow these steps:

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

If you don't current have `nvm` installed, follow the steps in the link below and
retry this step.

<https://itnext.io/nvm-the-easiest-way-to-switch-node-js-environments-on-your-machine-in-a-flash-17babb7d5f1b>

### 2. Install `npm` dependencies from `package.json`

`npm install`

This command runs `npm`, which looks inside our `package.json` file, retrieves a list of packages, and installs them to the `node_modules` folder inside your repository. `node_modules` folder **does not** need to be pushed to Heroku or GitHub.

**Note: This command MUST be run from the folder that contains package.json!**
**You will get an error if on are in a different folder!**

:warning: :warning: :warning: If you see any error messages, make sure to use `sudo pip` or `sudo npm`.
If it says "pip cannot be found", run `which pip` and use `sudo [path to pip from which pip] install` :warning: :warning: :warning:

### 3. Setup OAuths

#### Google OAuth

1. Go to <https://console.developers.google.com/> and login using your personal google account (make an account if you don't have one already)
2. Click "CREATE PROJECT"
3. Make a new project named CDS. "No organization" is fine.
4. Click "Credentials" in the left hand bar, then click "+ CREATE CREDENTIALS" and then click "OAuth client ID".
   - If a warning displays "To create an OAuth client ID, you must first set a product name on the consent screen", do the following steps:
     a. Click the "CONFIGURE CONSENT SCREEN" button.
     b. Choose "External"
     c. For "Application name," specify "CDS" or something similar.
     d. Press save.
5. Go back to Credentials -> Create Credentials -> OAuth client ID. Click "web application".
6. Make "CDS" the name and under both Authorized JavaScript origins & Authorized redirect URIs you're going to click "Add URI" and paste the link for your website (once we deploy on Heroku, we will have to add our Heroku app link onto here too)
   :grey_exclamation: :grey_exclamation: If you plan on running the app locally, include http://localhost:3000 as your URI:grey_exclamation: :grey_exclamation:
7. Click "Create" and copy your Client ID. This ID will be copied into your GoogleButton.jsx file. Towards the bottom of the file, where it says `clientId="<some-id>"``, you're going to replace <some-id> with the Client ID that was copied just copied. Save changes.

#### Facebook OAuth

1. Go to <https://developers.facebook.com/> and login using your personal account (make an account if you don't have one already)
2. Create an App. Select “for everything else” and specify the Project Name (i.e. "Commercial Distribution Solutions")
3. Create App ID
4. Under add a Product select “Facebook Login” Setup
5. Enable Client OAuth login and Web OAuth login
6. Under Valid OAuth Redirect URIs insert the link for your website (same as with the Facebook one). Upon deployment on Heroku the app link will need to be added as a new URI.
   :grey_exclamation: If you plan on only running the app locally, a local URI does not need to be specified for development :grey_exclamation:
7. Save Changes
8. Copy the App ID. Include this key in the FacebookButton.jsx file towards the bottom of
   the file where it says `appId="<some-id>"`. Replace <some-id> with the copied App ID. Save
   changes.

### 4. Run React App

`npm start`

This command runs the app in the development mode. It will take some time to start the development server.
Once the program has finally successfully compiled and the server is up, you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make edits.
You will also see any lint errors in the console.

**If this step fails for whatever reason, refer to the error message to see what steps you can take to fix it**

### 5. Deploying onto Heroku

1. Sign up for Heroku at <https://www.heroku.com/>
2. Install heroku by running `npm install -g heroku`

#### Pushing files into Heroku

1. Create app with `heroku create <app-name>`
   (You should see 2 links after successfully running this command. Copy the second one)
2. `git remote add heroku <pasted-link>`
3. On Heroku console, add buildpack.
   a. Go to <https://dashboard.heroku.com/apps> and click into your app.
   b. Click on Settings, then scroll to "Buildpacks"
   c. Click **Add buildpack** and add the following link <https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz> and save.
4. Commit and push changes to git.
5. Push onto Heroku with `git push heroku master`
   **If you cloned the entire directory, you're going to want to push only the frontend directory**
   **This is done with `git subtree push --prefix frontend heroku master` instead of the above command**
6. After the app builds, navigate to your newly-created Heroku site!
7. If the app is not working, restart all dynos from the Heroku app console
8. If there are still issues, use `heroku logs --tail` to see what's wrong.

**If you haven't already make sure to include the appropriate URIs in the Google and Facebook Developer Consoles in order for OAuth to work**

## Frontend Team

Implementation for the frontend project includes the following:

- styling the creating and styling the components
- configuring routing
- writing the frontend scripts
- wiring the various components to work together
- form validations
- handing login/logout functionality
- making api calls to the backend
- display information from these calls to the user.

## Information on Individual Progress/Contributions

### Zoraiz Naeem

1. Set up the Frontend React Project template/directory-structure to follow
2. Implemented the Signed-In template for the pages (this includes a closable side bar, and navigation bar)
3. Set up user context, and axios default end point
4. Created and implemented the new order form
5. Created and implemented the 'add new order' button
   - Used Formik for the state management of the form
6. Implemented the Order Status component
7. Set up the react routing for the project
8. Implemented a few other smaller components
9. Implemented the layouts of the Shop-Tracker and Order pages
10. Injected values from POST/GET requests into the following components:
    - 'Total shops' card
    - Order List and Shop List tables
    - Shop Info and Order Info
    
------- MVP 2 ----------
1. Implemented the page and its components of Inventory Manager
    - Added the Add new Product form
    - Add the inventory display table
    - Logic to update the inventory
2. Implemented the persisted login functional; and logout functionality
3. Implemented the Order Taker Dashboard.
    - Implemented the graphical components.
4. Improved the Order Taking form.
    - Add the inventory amount of each product and added guards for what can be added to the order.
    - Made the Form more friendly as the number of products grow.
5. Added the notification showing framework.
6. Added framework for conditional rendering based on the user role.
    - Also added conditional Rendering to the Inventory Manager and the side bar.
7. Added Add new shop form.
8. Fixed various bugs in the application.

### Denisse Mendoza

1. Created the visual design for the website
2. Created the Home page with the navigation bar
3. Configured routing redirectoin for the home page's navbar
4. Created "About Us" landing page
5. Created Log-In screen
6. Implemented Google and Facebook OAuth
7. Created the templates for the following components:
   - Order List Table
   - Shop List Table
   - Invoice/Order Info Paper
   - Shop Info Paper
   - Total Shops card
8. Pushed app to Heroku

------- MVP 2 ----------
1. Implemented the page and its components of Admin Dashboard
    - Buttons with links to the different pages
2. Connected Order-Taker Dashboard to backend
    - Connect the several components with backend
    - Populated the chart and graph with the data
3. Implemented the page and the components for Order-Fulfiller Dashboard
    - Connected page and components to backend
    - Implemented the functionality to add an order as delivered and send info to backend
    - Created aggregated data of products that need to be put in truck for the all deliveries for the day
4. Implemented the page and the components for Employee Page
    - Connected page and components to backend
    - Created table to display all employees
    - Created form to add an employee
    - Created form to add an order-taker goal
    - Created employee detail card that's injected the info of the selected employee
    - Created the displays of the role-dependent stats.
5. Created mocks to be refered to throughout the entire project
6. Improved forms by allowing the picture to be previewed as soon as the link is entered.
7. Fixed various bugs and syling problems in the application.
8. Pushed app to Heroku



## Authors
Abdul-Quddus Adeniji
Denisse Mendoza
Zoraiz Naeem

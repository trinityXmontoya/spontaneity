# **Sightseer**

Sightseer is an app that encourages finding the unexpected in places new to you, or that you *think* you know like the back of your hand. Given where you are, how much time you have, and a basic indication of what you're looking for, Sightseer generates directions to an adventure for you, only, you won't know where you're going until you arrive!

#### **Technologies:**

Built using Rails 4, Angular.js, jQuery, Angular-Google-Maps, Devise, HTML5 & CSS3, Google Maps API, FourSquare API.

#### Future goals:

We'd like to eventually convert this into a native mobile experience using the PhoneGap library.

#### Future features:

Integrating user interests into the API calls we're making to make adventures even more personally relevant.

#### **Installation:**

1. Git clone git@github.com:trinityXmontoya/spontaneity.git
2. cd spontaneity
3. Run bundle
4. Run touch .env from your terminal or create an .env file.
5. Add .env to your .gitignore file (This app requires a .env file to store your environment variables. The dotenv-rails gem will load the variables from your .env file into the app when it is first loaded.)
6. You will need access tokens from FourSquare and Google Maps API. You will also need to declare a variable for your port of choice, email configuration, and the rack environment Your .env file should look as follows:
FOURSQUARE_ID = ENV['FOURSQUARE_ID']
FOURSQUARE_SECRET = ENV['FOURSQUARE_SECRET']
GOOGLE_API_KEY = ENV['GOOGLE_API_KEY']

21. Run rails s. The app will now be running at http://localhost:X, where X is the PORT number you specified in the.env file.

#### **Installation:**

Built and designed with love, sweat, and tears by Trinity Montoya (https://github.com/trinityXmontoya) and Declan Van Welie (https://github.com/declanv)

Coding Challenge for DynamiCare Health Software Engineering Internship

This is a small app, so I decided to use the framework Sinatra instead of Rails. I also didn't use a database for the same reason. The only pieces of data being saved are strings of 5 characters, with no relationships or associations between them or anything else, so a txt file seemed like it would do the trick.

Dependency: Made with Ruby 2.7.3

To create locally:

- Open a terminal and cd to the folder that will house this project's folder
- `git clone https://github.com/mcat115/internship-challenge`
- `cd internship-challenge`
- `bundle install`
- `yarn install`
- Then open the project and add a .env file to the root directory, and add an API key for OpenWeatherMap with a line like so
  `OPEN_WEATHER_API_KEY = your_key_here`
- Do the same thing on the next line for an API key to access Google Maps like so `GOOGLE_CLOUD_MAP_API_KEY = your_key_here`
- Then in two seperate terminal windows, both open in the directory run `yarn start` in one and `ruby server.rb` in another.
- Finally in Chrome go to `localhost:4567` and the project should be running there!

To clear past searches go into the past_searches.txt file in the root directory and delete them.

Things I'd do if I had more time:

- Style the app
- Combine fetch request functions and move into different files/generic DRY refractor and clean up
- Have searches immediatly populate the past searches list instead of on next visit/refresh, and if that got too long I could have the past ten populate the list, and a seperate page to display them all
- Invalid API key error handling- if there is an issue with either API key, the user gets no information about this and the app just doesn't work

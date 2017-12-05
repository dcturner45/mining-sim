# mining-sim

This is a website made for a class presentation involving a very basic explanation of bitcoin mining (and the benefits of parallelization in mining) to a non-technical student audience. It consists of two portions: a mining simulation and an article. 

In the mining simulation, the students "compete" against the host, where the students solve math problems and contribute to one account as a group, while the host solves math problems and contributes to his/her own account. This is to demonstrate the computing gains realized by splitting up the complex problem of mining into more easily digestible pieces that can be run across multiple computers. A results page shows live progress with names and solved problems to easily demonstrate that the group mines much quicker than the individual. 

The article page is a simple webpage that asks for the student's name and then displays an article, which the students can read. Emphasis is placed on the cleanlineess of the article (i.e. no ads, popups, noisy videos, etc.). A similar live results page will demonstrate that while the students read the article, "mining" is occurring in their web browser (the purpose of this is the punchline of our class project for which the topic was "What if online website ad revenue was replaced with cryptocurrency mining?").

Setup: Install Node.js and check out the repo. Use `npm install` in the repo directory to download dependencies and `npm start` to start (this runs on port 80 so you'll need to use `sudo` or change the port in `server.js`). All data received by the server is validated before use, so this website should be somewhat safe against people trying to inject anything or cause havoc with specially crafted requests. However, **I make no guarantee about the full security of this website**, as development time was more important than protecting against a 20-person non-technical audience for a 2-minute demo. 

Endpoints/Pages (see `server.js`):
* `/`: Students visit this to "mine" (solve simple math problems). Math problems done on here will contribute to the 'group' account. Visiting this page with `?single` will cause the page visitor to contribute to the 'individual' account on the live statistics page. 
* `/stats`: Article "stats" (JSON payload consisting of list of solved math problems and current amount of bitcoin mined) for the simulation. Includes stats for the invidual account and the group account.
* `/statspage`: Displays the results of `/stats` in a nice format.
* `/article`: Loads an article which "mines" in the background.
* `/articlestats`: Same as `/stats`, but for the article simulation. Only one account (the group account) is present.
* `/articlestatspage`: Same as `/articlestatspage`, but for the article simulation.


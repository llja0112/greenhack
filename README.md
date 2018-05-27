# Greenhack

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```
$ git clone or clone your own fork
$ cd greenhack
$ npm install
$ npm start
```
Get the googleAPI key from Suz and save in ./keys
Your app should now be running on [localhost:5000](http://localhost:5000/).

## Testing with Mobile Phone
In modern browser versions, granting the website camera permissions can only be done through a secure server.

1. Download and unzip ngrok
2. Run `$ ./ngrok http 5000` or on whichever port you're running on.
3. Access the Forwarding https server via the mobile phone


## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

## Todo
* Do up look of summary page.
* Reverse camera when taking photo of 'receipt' and 'harvest'.
* Remove alerts text message in photocapture.js function savepicture()
* Control image capture logic in photocapture.js function savepicture()
* Improve title page naming.

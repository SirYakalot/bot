const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log(authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

// /**
//  * Prints the names and majors of students in a sample spreadsheet:
//  * @see https://docs.google.com/spreadsheets/d/1y9FppevCNxkPPtJb9lkOfbYnIoMjFlt1Er4OLhsXY1g/edit
//  * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
//  */
function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1y9FppevCNxkPPtJb9lkOfbYnIoMjFlt1Er4OLhsXY1g',
    range: 'A2:E',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row[0]}, ${row[4]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}


var Twit = require('twit')

var T = new Twit
(
    {
        consumer_key:         'zrms9HJEpqGxNMMosd3m7Gt6H',
        consumer_secret:      'Oafg8iDylnirszlPUAMoDKoVBfDz6CTSKAcgy2BKncMVWSQScZ',
        access_token:         '33581319-Z3POmUV8rxGRFlMO4BCFPLedpJhppVVUtk17zCvVO',
        access_token_secret:  'ssMLpTll9JNfVbOTEX3gnDsVVfcsKbb6XFGwwBZ9ac05V',
    }
)

// need to limit how often this thing fires.... perhaps add them to an array and then slowly follow them... 
// ALSO it would be great if it didn't follow people straight away so it didn't look suspicious. 

// after follows have run out maybe it can start using likes, but need to be careful of this... all of this in fact. need to stop it from liking weird shit...

// need to save out a list of followed user ID's

var users = ["10228272", "155659213", "783214"];

var stream = T.stream('statuses/filter', {track: '#screenshotsaturday,#indiedev,#gamedev,#meetthedev'});


stream.on('tweet', function (tweet) {
    // if (users.indexOf(tweet.user.id_str) > -1) {
        // console.log(tweet.user.name + ": " + tweet.text);
        console.log(tweet.user.name);
        // T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
        //     console.log(data)
        // })
    // }


    let values = [
        [
            [tweet.user.name, tweet.user.client_id]
        ],
    ];
    let resource = {
        values,
    };


    const sheets = google.sheets({version: 'v4', TOKEN_PATH});
        sheets.spreadsheets.values.append({
        spreadsheetId: '1y9FppevCNxkPPtJb9lkOfbYnIoMjFlt1Er4OLhsXY1g',
        range: 'A2:C',
        valueInputOption: 'RAW',
        majorDimension: 'ROWS',
        resource,
    }, (err, result) => {
        if (err) {
        // Handle error.
        console.log(err);
        } else {
        console.log(`${result.updates.updatedCells} cells appended.`);
        }
    });
    // }
})
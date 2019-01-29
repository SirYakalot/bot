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

var count = 0;

var params = {
    q: '#nodejs',
    count: 10,
    result_type: 'recent',
    lang: 'en'
  }

stream.on('tweet', function (tweet) {
    // if (users.indexOf(tweet.user.id_str) > -1) {
        // console.log(tweet.user.name + ": " + tweet.text);
        console.log(count++ + "    " + tweet.user.name);
        // T.post('statuses/retweet/:id', { id: tweet.id_str }, function (err, data, response) {
        //     console.log(data)
        // })
    // }


    let values = [
        [
        // Cell values ...
        ],
    ];
    let resource = {
        values,
    };
    this.sheetsService.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption,
        resource,
    }, (err, result) => {
        if (err) {
        // Handle error.
        console.log(err);
        } else {
        console.log(`${result.updates.updatedCells} cells appended.`);
        }
    });

})


// T.post('statuses/update', { status: 'testing little bot thing!' }, function(err, data, response) {
//     console.log(data)
//   })

// #meetthedev screenshotsaturday #indiedev 



// @keyframes_tw,@StarContext,@NicHickman,@Evolutis1,@louistherouxbot,@IMilk_ManI,@VideoArtGame,@ionlands,@potionomics,@rveenewman,@NightOnBwayLA,@GardensBritish,@lmhpoly,@AFLWMag,@PeteEllisGames,@TrevelyanArt,@Gaohmee,@RLyons3000,@dtlaartdistrict,@m1keadelic,@hydezeke,@c_desse,@TheFoofinator,@komrad36,@thebeauanthony,@Marianne_Hayden,@Nord_Sol,@JennyLeClue,@imjessflowin,@Mike_Yosh,@johnsweeney2147,@reubshah,@hateehateeyo,@mradfo21,@NaughtyDogJobs,@ruben_henares,@_James_Cooper,@hippowombat,@RobertCogburn,@BoxEscapist,@Peter__Field,@Dior,@SunhiLegend,@kurtruslfanclub,@kingsamj,@Ninjafr4me,@Leethul,@allisonsmithart,@coyotehackles,@madewithstring,@ReflectionFox,@dadatrew,@Aluhnim,@MotleyGrue,@rockycv13,@stanleygabriel_,@LoboBrennan,@HutchProd,@surudenise,@vinixkun,@OssieSaysStuff,@thomas_mac,@breckten,@klaustoon,@AOC,@mworch,@SupergiantGames,@dirt_herder,@GameDevRadio,@AlwaysCoding,@joshscherr,@R1c00,@kaylonhunt,@TheAllenChou,@victoria_glass,@Therodz,@PopRelics,@nicholaslance,@cowbs,@Kid_Desimo,@kurtmargenau,@Juleshortstuff,@OmenD4,@BadData_,@cristac_,@Monkokio,@Mornizzle,@Nothke,@cubitstudios,@rebeccamock,@Neil_Druckmann,@stepheneinhorn,@Candace_Walker,@Tori__Alexander,@Budakan,@iamalexf,@iki_ikram,@susu_watari_,@HarryGiles,@Krupa,@sledgesammers,@SheepGoMOO,@GameAnim,@ArtsbyAngel,@Beavs,@ScottLowe,@Naughty_Dog,@douglaslassance,@maxdyckhoff,@Gangles


// @BurdenOfCommand,@RyanLaughton,@SovanJedi,@oliver_joyce
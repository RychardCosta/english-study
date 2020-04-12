const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');


async function start(){
    const speechToText = await new SpeechToTextV1({
      authenticator: new IamAuthenticator({
        apikey: process.env.API_KEY,
      }),
      url: process.env.API_URL,
    });
    await speechToText.method(params)
      .catch(err => {
        console.log('error:', err);
      });

      var params = {
        objectMode: true,
        contentType: 'audio/flac',
        model: 'en-US_BroadbandModel',
        keywords: ['colorado', 'tornado', 'tornadoes'],
        keywordsThreshold: 0.5,
        maxAlternatives: 3
      };

      var recognizeStream = speechToText.recognizeUsingWebSocket(params);

      fs.createReadStream('content/video.mp3').pipe(recognizeStream);

      recognizeStream.on('data', function(event) { onEvent('Data:', event); });
      recognizeStream.on('error', function(event) { onEvent('Error:', event); });
      recognizeStream.on('close', function(event) { onEvent('Close:', event); });
      
      // Display events on the console.
      function onEvent(name, event) {
          console.log(name, JSON.stringify(event, null, 2));
      };
}

start()
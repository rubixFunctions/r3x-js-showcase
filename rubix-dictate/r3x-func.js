const r3x = require('@rubixfunctions/r3x-js-sdk')
// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');

let schema
r3x.execute(function(input){
	return dictate(input.dictate) 
}, schema)

async function dictate(message) {
  // Creates a client
  const client = new textToSpeech.TextToSpeechClient();

  // The text to synthesize
  const text = message;

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML Voice Gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    // Select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the Text-to-Speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  // Build response to request
  let res = {'message' : 'Audio content written to file: output.mp3'}
  // Return response
  return res
}
// Import RubiX SDK
const r3x = require('@rubixfunctions/r3x-js-sdk')
// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');
// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
// Import other required libraries
const fs = require('fs');
const util = require('util');


// Creates a client
const storage = new Storage();
// Declate Google Bucket
const BUCKET = 'r3x-mp3'

async function dictate(message, file) {
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

  const filename = file + '.mp3';

  // Performs the Text-to-Speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(filename, response.audioContent, 'binary');

  const bucketName = BUCKET;

  // Upload audio content to Bucket
  await storage.bucket(bucketName).upload(filename, {
	gzip: true,
	metadata: {
	  cacheControl: 'public, max-age=31536000',
	},
  });
  
  // Build response to request
  let res = {'message' : `Audio content ${filename} uploaded to ${bucketName}.`}
  // Return response
  return res
}

// Execute Dictate Function
let schema
r3x.execute(function(input){
	if(input.title && input.value){
		return dictate(input.value, input.title) 
	}
	let res = {'ERROR': 'Wrong Input Passed'}
	return res
}, schema)
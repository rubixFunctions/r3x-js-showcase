const r3x = require('@rubixfunctions/r3x-js-sdk')
const {Datastore} = require('@google-cloud/datastore');

async function deleteClip(clipId) {
	const projectId = 'r3x-showcase-42';
  
	// Creates a client
	const datastore = new Datastore({
	  projectId: projectId,
	});

	const ClipKey = datastore.key(['Clips', clipId]);

	await datastore.delete(ClipKey);
	console.log(`Task ${clipId} deleted successfully.`);
}

let schema
r3x.execute(function(input){
	if (input.clipId){
		deleteClip(input.clipId)
	} 
	let response = {'message' : 'Hello r3x function'}
	return response 
}, schema)
const r3x = require('@rubixfunctions/r3x-js-sdk')
const {Datastore} = require('@google-cloud/datastore');

async function deleteClip(clipId) {
	const projectId = 'r3x-showcase-42';
  
	// Creates a client
	const datastore = new Datastore({
	  projectId: projectId,
	});

	const ClipKey = datastore.key(['Clips', parseInt(clipId)]);


	await datastore.delete(ClipKey);
	let response = {'message' : `Clip ${clipId} deleted successfully.`}
	return response 
}

let schema
r3x.execute(function(input){
	if (input.clipId){
		return deleteClip(input.clipId)
	} 
	let response = {'WRONG INPUT' : input}
	return response 

}, schema)
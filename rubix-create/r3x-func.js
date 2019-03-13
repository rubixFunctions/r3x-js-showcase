const r3x = require('@rubixfunctions/r3x-js-sdk')
const {Datastore} = require('@google-cloud/datastore');

async function addClip() {
	// Your Google Cloud Platform project ID
	const projectId = 'r3x-showcase-42';
  
	// Creates a client
	const datastore = new Datastore({
	  projectId: projectId,
	});
  
	// The kind for the new entity
	const kind = 'Clip';
	// The name/ID for the new entity
	const name = 'rubixClip';
	// The Cloud Datastore key for the new entity
	const taskKey = datastore.key([kind, name]);
  
	// Prepares the new entity
	const task = {
	  key: taskKey,
	  data: {
		clipId: 'clip1',
		clip: 'Wubba lubba dub dub',
	  },
	};
  
	// Saves the entity
	await datastore.save(task);
	let response = {'message' : `Saved ${task.key.name}: ${task.data.clip}`}
	return response 
  }

let schema
r3x.execute(function(){
	return addClip().catch(console.error);
}, schema)
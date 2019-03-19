const r3x = require('@rubixfunctions/r3x-js-sdk')
const {Datastore} = require('@google-cloud/datastore');

async function addClip(title, value) {
	const projectId = 'r3x-showcase-42';

	// Creates a client
	const datastore = new Datastore({
	  projectId: projectId
	});
  
	// The kind for the new entity
	const kind = 'Clips';

	// The Cloud Datastore key for the new entity
	const clipKey = datastore.key(kind);

	// Prepares the new entity
	const entity = {
		key: clipKey,
		data: [
		  {
			name: 'created',
			value: new Date().toJSON(),
		  },
		  {
			name: 'clip',
			value: value,
			excludeFromIndexes: true,
		  },{
			name: 'title',
			value: title,
			excludeFromIndexes: true,
			},
		],
	  };

  
	// Saves the entity
	await datastore.save(entity)
	let response = {'message' : `Task ${clipKey.id} created successfully.`}
	return response 
  }

let schema
r3x.execute(function(input){
	if(input.title && input.value){
		return addClip(input.title, input.value).catch(console.error);
	}
	let res = {'wrong input': input}
	return res
}, schema)


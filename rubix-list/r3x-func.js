const r3x = require('@rubixfunctions/r3x-js-sdk')
const {Datastore} = require('@google-cloud/datastore');

async function listClips() {
	// Your Google Cloud Platform project ID
	const projectId = 'r3x-showcase-42';

	// Creates a client
	const datastore = new Datastore({
		projectId: projectId,
	});
		
	const query = datastore.createQuery('Clips').order('created');
  
	const [clips] = await datastore.runQuery(query);

	let clipArr = [];

	clips.forEach(clip => {
	  const clipKey = clip[datastore.KEY];
	  clipArr.push({
		  id : clipKey.id,
		  clip : clip.clip
	  });
	});

	let res = {'clips': clipArr}
	return res
  }

let schema
r3x.execute(function(){
	return listClips()
}, schema)
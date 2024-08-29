import generateEmbeddings from "@/services/generateEmbeddings";
import queryPinecone from "@/services/queryPinecone";


export async function GET(request) {
  return new Response('Hello, Next.js!')
}

export async function POST(request) {
  try {
  const data = await request.json()

  const input = JSON.parse(data.message);
  
  // get embedding
  const embedding = await generateEmbeddings(JSON.stringify(input));
  console.log('embedding: ', embedding);

  const queryResults = await queryPinecone(embedding.data[0].embedding);

  if (queryResults.matches) {
    return new Response(JSON.stringify(queryResults), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    })
  }
  else {
    return new Response('No results found', {
      headers: { 'Content-Type': 'application/json' },
      status: 404
    })
  }
  }
  catch (error) {
    console.log('error: ', error);

    return new Response(JSON.stringify(error), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    })
  }
}
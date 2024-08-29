


import allJobs from './allJobs.json' with {type: "json"};
import generateEmbeddings from './generateEmbeddings.js';
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
import 'dotenv/config'; // If using ES Module
// require('dotenv').config(); // If using CommonJS
const result = dotenv.config({ path: '.env.local' });

console.log('PINECONE_API_KEY : ' + process.env.PINECONE_API_KEY);

// get input
const jobsData = allJobs.jobs;

// convert to embedding with OpenAI API
let processedJobs = [];
for (let i = 0; i < jobsData.length; i++) {
  const embedding = await generateEmbeddings(JSON.stringify(jobsData[i]));
  console.log('for loop - embedding: ', embedding);
  processedJobs.push({
    values: embedding.data[0].embedding,
    id: jobsData[i].title,
    metadata: {
      similarTitles: jobsData[i].similar_titles,
      skillsNeeded: jobsData[i].skills_needed,
    }
  });
}

console.log('processedJobs: ', processedJobs);

// // store in vector db
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.index('trajectory-app')
await index.namespace('ns1').upsert(processedJobs);



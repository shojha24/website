import { NextResponse } from 'next/server';
 
export async function POST(url, data) {
  let product = null;

    await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*', 
      'Access-Control-Allow-Headers': '*', 
      'Access-Control-Allow-Methods': '*',
      "ngrok-skip-browser-warning": "true",
    },
  }).then((response) => {
    console.log(response)
    product = response.json();
  });
 
  return product;
}
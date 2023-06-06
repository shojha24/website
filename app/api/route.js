import { NextResponse } from 'next/server';
 
export async function GET(request) {
    await fetch(request, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*', 
      'Access-Control-Allow-Headers': '*', 
      'Access-Control-Allow-Methods': '*',
      "ngrok-skip-browser-warning": "true",
    },
  }).then((response) => {console.log(response)});
  const product = await res.json();
 
  return NextResponse.json({ product });
}
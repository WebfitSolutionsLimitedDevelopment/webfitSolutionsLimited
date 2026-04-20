import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'webfit'

let cachedClient = null
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri)
    await cachedClient.connect()
  }
  return cachedClient.db(dbName)
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET(request, { params }) {
  const path = (params?.path || []).join('/')
  try {
    if (path === '' || path === 'health') {
      return NextResponse.json({ status: 'ok', service: 'webfit-api' }, { headers: corsHeaders })
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: corsHeaders })
  }
}

export async function POST(request, { params }) {
  const path = (params?.path || []).join('/')
  try {
    const body = await request.json()
    if (path === 'contact' || path === 'enquiry') {
      const db = await getDb()
      const doc = {
        id: uuidv4(),
        name: body.name || '',
        email: body.email || '',
        phone: body.phone || '',
        company: body.company || '',
        message: body.message || '',
        type: body.type || 'enquiry',
        createdAt: new Date().toISOString(),
      }
      await db.collection('enquiries').insertOne(doc)
      return NextResponse.json({ success: true, id: doc.id }, { headers: corsHeaders })
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: corsHeaders })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: corsHeaders })
  }
}

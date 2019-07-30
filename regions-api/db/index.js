import { makeDb } from '../src/data-access'
import dotenv from 'dotenv'
dotenv.config()

;(async function setupDb () {
    console.log('Setting up database...')
    const db = await makeDb()
    const result = await db
        .collection('regions')
        .createIndexes([

        ])
    console.log(result)
    console.log('Database setup complete...')
    process.exit()
})
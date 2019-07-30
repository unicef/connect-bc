import Id from '../Id'

export default function makeRegionsDb ({ makeDb }) {
    return Object.freeze({
        findAll,
        findByEmail,
        findById,
        insert,
        remove,
        update,
        // login
    })
    async function findAll({}) {
        const db = await makeDb()
        const query = {}
        const result = await db.collection('regions').find(query)
        return (await result.toArray()).map(({ _id: id, ...found }) => ({
            id,
            ...found
        }))
    }
    async function findById ({ id: _id }) {
        const db = await makeDb()
        const result = await db.collection('regions').find( {_id } )
        const found = await result.toArray()
        if(found.length === 0) {
            return null
        }
        const { _id: id, ...info } = found[0]
        return { id, ...info }
    }
    async function findByEmail ({ email: _email }) {
        const db = await makeDb()
        const result = await db.collection('regions').find( {email: _email } )
        const found = await result.toArray()
        if(found.length === 0) {
            return null
        }
        const { _email: email, ...info } = found[0]
        return { email, ...info }
    }
    async function insert ({ id: _id = Id.makeId(), ...regionInfo }) {
        const db = await makeDb()
        const result = await db
            .collection('regions')
            .insertOne({ _id, ...regionInfo })
        const { _id: id, ...insertedInfo } = result.ops[0]
        return { id, ...insertedInfo }
    }
    async function remove ({ id: _id }) {
        const db = await makeDb()
        const result = await db.collection('regions').deleteOne({ _id })
        return result.deletedCount
    }
    async function update ({ id: _id, ...regionInfo }) {
        const db = await makeDb()
        const result = await db
            .collection('regions')
            .updateOne({ _id }, { $set: { ...regionInfo } })
        return result.modifiedCount > 0 ? { id: _id, ...regionInfo } : null
    }
}
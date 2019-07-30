export default function makeDeleteRegion ({ removeRegion }) {
    return async function deleteRegion (httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try { 
            const deleted = await removeRegion({ id: httpRequest.params.id })
            return {
                headers,
                statusCode: deleted.deletedCount === 0 ? 404 : 200,
                body: { deleted }
            }
        } catch (e) {
            console.log(e)
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}
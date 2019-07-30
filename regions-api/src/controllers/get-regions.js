export default function makeGetRegions({ listRegions }) {
    return async function getRegions(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const postRegions = await listRegions({
                // This might not apply... unless we do organization or something 
                postId: httpRequest.query.postId
            })
            return {
                headers,
                statusCode: 200,
                body: postRegions
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
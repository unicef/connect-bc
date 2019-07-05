export default function makeGetUsers({ listUsers }) {
    return async function getUsers(httpRequest) {
        const headers = {
            'Content-Type': 'application/json'
        }
        try {
            const postUsers = await listUsers({
                // This might not apply... unless we do organization or something 
                postId: httpRequest.query.postId
            })
            return {
                headers,
                statusCode: 200,
                body: postUsers
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
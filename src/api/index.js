const domain = 'http://localhost:8000'




export const WORKSPACEAPI = {
    GET : domain + '/api/v1/workspace/list/',
    CREATE : domain + '/api/v1/workspace/create/'
}


export const PROJECTAPI = {
    LIST : domain + '/api/v1/project/list/',
    GET : domain + '/api/v1/project/',
    CREATE : domain + '/api/v1/project/create/',

}


export const NOTEAPI = {
    UPDATE : domain + '/api/v1/note/update/',
    DELETE : domain + '/api/v1/note/delete/',
    GET : domain + '/api/v1/note/get/',
    LIST : domain + '/api/v1/note/list'
}


export const AUTHAPI = {
    PROFILE : {
        GET : domain + '/api/v1/auth/profile/get/',
    },
    AUTH : {
        LOGIN : domain + '/api/v1/auth/log-in/',
        SIGNUP : domain + '/api/v1/auth/sign-up/'
    }
}
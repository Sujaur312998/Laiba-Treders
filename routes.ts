/**
 * An Array of routers that are accessible to the public
 * This routes do not require authentication
 * type {string[]}
 */
export const publicRoutes = [
    '/',
]



/**
 * An Array of routers that are accessible to the authentication
 * This routes will redirect logged in user to settings
 * type {string[]}
 */
export const authRouetes = [
    '/signin',
    '/register'
]


/**
 * The Prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purpus
 * type {string}
 */
export const apiAuthPrefix='/api/auth'


/**
 * The default redirect path after logging in
 * type{string}
 */
export const DEFAULT_LOGIN_REDIRECT='/dashboard'
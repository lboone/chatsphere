import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';


const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/uploadthing',
]);

export default clerkMiddleware((auth, req) => {
  if (!auth().userId && !isPublicRoute(req)) {

    // Add custom logic to run before redirecting

    return auth().redirectToSignIn();
  }
});

export const config = { matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']};
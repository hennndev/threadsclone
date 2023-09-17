import { authMiddleware } from "@clerk/nextjs"
import { redirectToSignIn } from "@clerk/nextjs"


export default authMiddleware({
  async afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      const absoluteUrl = process.env.NODE_ENV !== 'production' ? "http://localhost:3000" : "https://threadsclone-seven.vercel.app"
      return redirectToSignIn({ returnBackUrl: `${absoluteUrl}/onboarding` });
    }
  },
  publicRoutes: ["/api/webhook/clerk"],
  ignoredRoutes: ["/api/webhook/clerk"]
});

 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
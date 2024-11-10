import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Middleware is running");

  // Retrieve the "userData" cookie
  const userData = request.cookies.get("userData");
  console.log("Retrieved userData:", userData);

  const loginPath = "/auth/login"; // Define the login path

  // Define the list of allowed paths
  const allowedPaths = [
    "/",
    "/users",
    "/semesters",
    "/designations",
    "/courses",
    "/locations",
    "/user/changepassword",
    "/dailyQbStatus",
    "/ecws",
    "/faculties",
    "/auth/login",
  ];

  // Check if the user is trying to access the login page
  if (request.nextUrl.pathname === loginPath) {
    if (userData) {
      const referer = request.headers.get("referer") || "/";
      console.log("REFERER ......... ---------------", referer);
      return NextResponse.redirect(new URL(referer, request.url));
    }
    return NextResponse.next();
  }

  // Redirect to login if userData is missing
  if (!userData) {
    console.log("No userData found, redirecting to login.");
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  try {
    const parsedData = JSON.parse(userData.value);
    if (!parsedData.user.email) {
      console.log("Email is missing in userData, redirecting to login.");
      return NextResponse.redirect(new URL(loginPath, request.url));
    }
  } catch (error) {
    console.error("Error parsing userData:", error);
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  // Check if the request path matches any allowed path
  const isAllowedPath = allowedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!isAllowedPath) {
    console.log("Accessing an unspecified path, redirecting to home.");
    return NextResponse.redirect(new URL("/", request.url));
  }

  console.log("Authentication successful, proceeding to the desired route.");
  return NextResponse.next();
}

// Adjust paths to match your requirements
export const config = {
  matcher: [
    "/",
    "/users",
    "/semesters/:path*",
    "/designations",
    "/courses",
    "/locations",
    "/user/changepassword",
    "/dailyQbStatus/:path*",
    "/ecws",
    "/faculties",
    "/auth/login", // Include the login path in the matcher
  ],
};

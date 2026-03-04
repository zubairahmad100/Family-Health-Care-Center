import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";

export async function updateSession(request: Request): Promise<{
  response: NextResponse;
  user: User | null;
}> {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.headers.get("cookie")?.split(";").map((c) => {
            const [name, ...v] = c.trim().split("=");
            return { name, value: v.join("=").trim() };
          }) ?? [];
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            response.headers.append("Set-Cookie", `${name}=${value}; Path=/`)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  return { response, user };
}

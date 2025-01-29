import { or, ilike } from 'drizzle-orm';
import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search") || "";
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const itemsPerPage = parseInt(url.searchParams.get("itemsPerPage") || "10", 10);

  const offset = (page - 1) * itemsPerPage;

  const query = db
    .select()
    .from(advocates)
    .where(
      search ? or(
        ilike(advocates.firstName, `%${search}%`),
        ilike(advocates.lastName, `%${search}%`),
        ilike(advocates.city, `%${search}%`),
        ilike(advocates.degree, `%${search}%`),
        // ilike(advocates.specialties., `%${search}%`),
        ilike(advocates.phoneNumber, `%${search}%`)
      ) : undefined
    )

  const totalItems = await db.$count(query);
  const data = await query.offset(offset).limit(itemsPerPage);;
  
  return NextResponse.json({ data, totalItems });
}

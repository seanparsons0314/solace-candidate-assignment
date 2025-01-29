import db from "../../../db";
import { advocates } from "../../../db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search") || "";
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const itemsPerPage = parseInt(url.searchParams.get("itemsPerPage") || "10", 10);

  const offset = (page - 1) * itemsPerPage;

  const query = db
    .select()
    .from(advocates)
    .where((builder) => {
      if (search) {
        builder.where("firstName", "like", `%${search}%`)
          .orWhere("lastName", "like", `%${search}%`)
          .orWhere("city", "like", `%${search}%`)
          .orWhere("degree", "like", `%${search}%`)
          .orWhere("specialties", "like", `%${search}%`)
          .orWhere("phoneNumber", "like", `%${search}%`);
      }
    })

  const totalItems = await db.$count(query);
  const data = await query.offset(offset).limit(itemsPerPage);;
  
  return NextResponse.json({ data, totalItems });
}

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);

        const serverId = searchParams.get("serverId");

        if (!serverId) {
            return new NextResponse("Server ID Missing", { status: 400 });
        }

        if (name.toLowerCase() === "general") {
            return new NextResponse("General channel is reserved", { status: 400 });
        }
        
        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in : [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    create: {
                        name: name.toLowerCase(),
                        type,
                        profileId: profile.id,
                    }
                }
            }
        });

        return NextResponse.json(server);

    } catch (error) {
        console.log("[CHANNELS_POST] Error: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
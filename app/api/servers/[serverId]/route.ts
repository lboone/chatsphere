import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params}: { params: { serverId: string } }){
    try {
        const profile = await currentProfile();
        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const server = await db.server.findUnique({
            where: {
                id: params.serverId,
                members: {
                    some: {
                        profileId: profile.id,
                    },
                },
            },
        });

        if (!server) {
            return new NextResponse("Server not found", { status: 404 });
        }

        const { name, imageUrl } = await req.json();

        await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id,
            },
            data: {
                name,
                imageUrl,
            },
        });
        return NextResponse.json(server);

    } catch (error) {
        console.log("[SERVERS_PATCH] Error: ", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
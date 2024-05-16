import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface InvigeCodePageProps {
  params: { inviteCode: string };
}
const InvigeCodePage = async ({ params }: InvigeCodePageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
        members: {
            create: [
                {profileId: profile.id},
            ]
        }
    }
})
if(server) {
    return redirect(`/servers/${server.id}`);
}
  return null
};

export default InvigeCodePage;
'use client'
import qs from "query-string";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Video, VideoOff } from "lucide-react";
import  ActionToolTip  from "@/components/action-tooltip"; 

import React from 'react'

const ChatVideoButton = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isVideo = searchParams?.get("video")
  const Icon = isVideo ? VideoOff : Video;
  const tooltipLabel = isVideo ? "End Video Call" : "Start Video Call";

  const onClick = () => {
    const url = qs.stringifyUrl({
      url: pathname || "",
      query: {video:isVideo ? undefined : true},
    }, { skipNull: true });
    router.push(url);
  }
  return (
    <ActionToolTip label={tooltipLabel} side="bottom">
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionToolTip>
  )
}

export default ChatVideoButton


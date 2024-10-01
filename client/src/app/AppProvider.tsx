"use client";
import { clientSessionToken } from '@/lib/http'
import { useState } from 'react'

export default function AppProvider({
  children,
  inititalSessionToken = "",
}: {
  children: React.ReactNode;
  inititalSessionToken?: string;
}) {
  useState(() => {
    // check xem đang ở môi trường nào nếu là môi trường ở client thì mới có thể xài đc token
    if (typeof window !== "undefined") {
      clientSessionToken.value = inititalSessionToken;
    }
  });
  return (
   <>
    { children }
   </>
  );
}

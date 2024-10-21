import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export const useList = () => {
  const t = useTranslations("profile");

  const list = [
    { id: 1, label: t("my profile") , onclick: () => console.log('Item 1 clicked') },
    { id: 2, label: t("account settings"), onclick: () => console.log('Item 2 clicked') },
    { id: 3, label: t("logout"), onclick: () => signOut()},
    
  ]

  return list
}

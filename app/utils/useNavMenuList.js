"use client";
import { RxDashboard } from "react-icons/rx";
import { FaBorderAll, FaBasketShopping } from "react-icons/fa6";
import { FiUsers, FiTag } from "react-icons/fi";
import { BiComment } from "react-icons/bi";
import { MdOutlinePermMedia } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { TbCategoryPlus } from "react-icons/tb";
import { RiArticleLine, RiCoupon3Line } from "react-icons/ri";
import { BsUiRadiosGrid } from "react-icons/bs";

export function useNavMenuList() {
    const t = useTranslations("navbar");

    const navMenu = [
        {
            id: 1,
            label: t("dashboard"),
            path: "/",
            icon: <RxDashboard size={20} />,
        },
        {
            id: 2,
            label: t("stores"),
            path: "stores",
            icon: <FaBasketShopping size={20} />,
        },
        {
            id: 3,
            label: t("coupons"),
            path: "coupons",
            icon: <RiCoupon3Line size={20} />,
        },
        {
            id: 4,
            label: t("stores category"),
            path: "store-categories",
            icon: <TbCategoryPlus size={20} />,
        },
        {
            id: 5,
            label: t("posts"),
            path: "posts",
            icon: <RiArticleLine size={20} />
        },
        {
            id: 6,
            label: t("category"),
            path: "post-category",
            icon: <BsUiRadiosGrid size={20} />,
        },
        {
            id: 7,
            label: t("tags"),
            path: "post-tag",
            icon: <FiTag size={20} />
        },
        {
            id: 8,
            label: t("comments"),
            path: "comments",
            icon: <BiComment size={20} />
        },
        {
            id: 9,
            label: t("media library"),
            path: "media",
            icon: <MdOutlinePermMedia size={20} />,
        },
        {
            id: 10,
            label: t("users"),
            path: "users",
            icon: <FiUsers size={20} />
        },
        {
            id: 11,
            label: t("settings"),
            path: "settings",
            icon: <IoSettingsOutline size={20} />,
        },
    ];

    return navMenu;
}

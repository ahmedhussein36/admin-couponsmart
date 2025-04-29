import { useLocale, useTranslations } from "next-intl";
import LinkCard from "@/app/components/cards/LinkCard";
import { GrAnnounce } from "react-icons/gr";
import Heading from "@/app/components/headings/Heading";
import { RiCoupon3Line } from "react-icons/ri";
import { ImFileText2 } from "react-icons/im";
import { TbCategoryFilled } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { GiPencilBrush } from "react-icons/gi";

export default function HomePage() {
    const t = useTranslations("home");
    return (
        <div className="w-full m-auto min-h-screen">
            <Heading title={t("title")} />
            <div className="m-auto mt-8 grid grid-cols-3 gap-3 justify-items-center">
                <LinkCard
                    label={t("create new store")}
                    link={"/stores/add-new-store"}
                    icon={<GrAnnounce size={30} color="teal" />}
                />
                <LinkCard
                    label={t("create new coupon")}
                    link={"/coupons/add-new-coupon"}
                    icon={<RiCoupon3Line size={30} color="red" />}
                />
                <LinkCard
                    label={t("create new category")}
                    link={"/store-categories/add-new-store-category"}
                    icon={<MdDashboard size={30} color="orange" />}
                />
                <LinkCard
                    label={t("create new post")}
                    link={"/posts/add-new-post"}
                    icon={<ImFileText2 size={30} color="blue" />}
                />
                <LinkCard
                    label={t("create new category")}
                    link={"/post-category"}
                    icon={<TbCategoryFilled size={30} color="violet" />}
                />
                <LinkCard
                    label={t("customize")}
                    link={"/settings"}
                    icon={<GiPencilBrush size={30} color="lime" />}
                />
            </div>
        </div>
    );
}

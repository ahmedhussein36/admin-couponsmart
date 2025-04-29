import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(req: Request) {
    if (req.method === "GET") {
        try {
            const carouselItems = await prisma.carouselItem.findMany();

            const images = carouselItems.map((image) => {
                return {
                    ...image,
                    link: decodeURIComponent(image.link || ""),
                    createdAt: image.createdAt.toLocaleDateString(),
                };
            });

            return NextResponse.json(images);
        } catch (error) {
            console.error("[GET_CAROUSEL_ERROR]:", error);
            return NextResponse.json(
                { error: "An error occurred while fetching carousel data" },
                { status: 500 }
            );
        }
    } else {
        return NextResponse.json(
            { error: "Method Not Allowed" },
            { status: 405 }
        );
    }
}

export async function POST(req: Request) {
    if (req.method === "POST") {
        const { images } = await req.json();

        if (!Array.isArray(images)) {
            return NextResponse.json(
                { error: "Invalid data" },
                { status: 400 }
            );
        }

        // امسح القديم (اختياري حسب التصميم)
        await prisma.carouselItem.deleteMany();

        // أضف الجديد
        const created = await prisma.carouselItem.createMany({
            data: images.map((img) => ({
                image: img.image,
                link: decodeURIComponent(img.link || ""),
            })),
        });

        return NextResponse.json({ success: true, created });
    } else {
        return NextResponse.json(
            { error: "Method Not Allowed" },
            { status: 405 }
        );
    }
}

export async function DELETE(req: Request) {
    if (req.method === "DELETE") {
        try {
            const { id } = await req.json();
            if (!id)
                return NextResponse.json(
                    { error: "ID is required" },
                    { status: 400 }
                );

            await prisma.carouselItem.delete({
                where: { id },
            });

            return NextResponse.json({ success: true });
        } catch (error) {
            console.error("[DELETE_CAROUSEL_ERROR]:", error);
            return NextResponse.json(
                { error: "Failed to delete carousel item" },
                { status: 500 }
            );
        }
    } else {
        return NextResponse.json(
            { error: "Method Not Allowed" },
            { status: 405 }
        );
    }
}

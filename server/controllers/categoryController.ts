import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// Turn a display name into a URL-safe slug
const slugify = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

// GET /api/categories
export const getCategories = async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
    });
    res.json({ categories });
};

// POST /api/categories
export const createCategory = async (req: Request, res: Response) => {
    const { name, image } = req.body;

    if (!name || !name.trim()) {
        res.status(400).json({ message: "Category name is required" });
        return;
    }

    const slug = slugify(name);
    if (!slug) {
        res.status(400).json({ message: "Invalid category name" });
        return;
    }

    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
        res.status(409).json({ message: "A category with this name already exists" });
        return;
    }

    const category = await prisma.category.create({
        data: { name: name.trim(), slug, image: image || "" },
    });
    res.status(201).json({ category });
};

// PUT /api/categories/:id
export const updateCategory = async (req: Request, res: Response) => {
    const { name, image } = req.body;

    const data: any = {};
    if (name && name.trim()) {
        data.name = name.trim();
        data.slug = slugify(name);
        if (!data.slug) {
            res.status(400).json({ message: "Invalid category name" });
            return;
        }
        // Ensure the new slug is not taken by a different category
        const existing = await prisma.category.findUnique({ where: { slug: data.slug } });
        if (existing && existing.id !== req.params.id) {
            res.status(409).json({ message: "A category with this name already exists" });
            return;
        }
    }
    if (image !== undefined) data.image = image;

    const category = await prisma.category.update({
        where: { id: req.params.id as string },
        data,
    });
    res.json({ category });
};

// DELETE /api/categories/:id
export const deleteCategory = async (req: Request, res: Response) => {
    await prisma.category.delete({ where: { id: req.params.id as string } });
    res.json({ message: "Category deleted" });
};

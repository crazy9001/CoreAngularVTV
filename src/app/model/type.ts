interface ICategory {
    id: number | string;
    text: string;
}
interface DefaultCategory {
    id: number | string;
    name: string;
}
interface IVideoForm {
    id: number;
    title: string;
    description: string;
    publish_at: string;
    sub_category: number;
    thumbnails: string;
    tags: string;
    source: string;
    content: string;
    seo_title: string;
    seo_keywords: string;
    seo_description: string;
    highlight: string;
    category_id: number;
}

interface IProgram {
    name: string;
    content: string;
    images: any;
    description: string;
    active: number;
    seo_keywords: string;
    seo_description: string;
    seo_title: string;
}

export {
    ICategory,
    IVideoForm,
    IProgram,
    DefaultCategory
};

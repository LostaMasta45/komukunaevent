export interface VideoItem {
    id: string | number;
    title: string;
    src: string;
}

export function plainTitle(title: string) {
    return title.replace(/<br\s*\/?\s*>/gi, ' ').replace(/<[^>]*>/g, '');
}

export function getPublicResourceUrl(resourcePath: string) {
    return `${window.location.origin}/${resourcePath}`;
}

export const getIconUrl = (iconPath: string) => getPublicResourceUrl(`icons/${iconPath}`);

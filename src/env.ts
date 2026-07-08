const envSource = import.meta.env;

export const env = {
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
    envSource.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ??
    envSource.VITE_CLOUDINARY_CLOUD_NAME ??
    "strootmann",
  NEXT_PUBLIC_GOOGLE_FEATURABLE_WIDGET:
    envSource.NEXT_PUBLIC_GOOGLE_FEATURABLE_WIDGET ??
    envSource.VITE_GOOGLE_FEATURABLE_WIDGET ??
    "4a7ab06d-759a-49dd-bf79-f9eac6fc982d",
  NEXT_PUBLIC_POSTHOG_KEY:
    envSource.NEXT_PUBLIC_POSTHOG_KEY ?? envSource.VITE_POSTHOG_KEY ?? "",
  NEXT_PUBLIC_POSTHOG_HOST:
    envSource.NEXT_PUBLIC_POSTHOG_HOST ??
    envSource.VITE_POSTHOG_HOST ??
    "https://eu.i.posthog.com",
} as const;

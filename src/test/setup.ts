import "@testing-library/jest-dom/vitest";

const env = process.env as Record<string, string | undefined>;

env.NODE_ENV ??= "test";
env.RESEND_API_KEY ??= "test_resend_key";
env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ??= "test_cloud_name";
env.NEXT_PUBLIC_GOOGLE_FEATURABLE_WIDGET ??= "test_widget";

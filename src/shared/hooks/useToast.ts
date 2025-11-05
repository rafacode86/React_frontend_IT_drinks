type ToastVariant = "success" | "error" | "info";

type ToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
};

const DEFAULT_DURATION = 4000;

export function useToast() {
  function toast({ title, description, variant = "info" }: ToastOptions) {
    const payload = `[${variant.toUpperCase()}] ${title}${
      description ? ` - ${description}` : ""
    }`;

    if (import.meta.env.DEV) {
      console.info(payload);
    } else {
      window.setTimeout(() => {
        console.info(payload);
      }, DEFAULT_DURATION);
    }
  }

  return { toast };
}

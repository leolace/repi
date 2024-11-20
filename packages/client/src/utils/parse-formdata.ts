export function parseFormData(formData: FormData, key: string): string {
  try {
    const value = formData.get(key)?.toString();
    if (!value) throw new Error("Value not found");

    return value;
  } catch (e) {
    console.error(e);
    throw new Error();
  }
}

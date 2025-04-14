export function getStringParam(
  param: string | string[] | undefined
): string | undefined {
  if (!param) return undefined;
  return Array.isArray(param) ? param[0] : param;
}

export function formatCurrency(
  value: string | number,
  currency: string = "NGN"
) {
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) return "Invalid number";

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
  }).format(num);
}

export function formatToLocalDateOnly(isoDateString: string): string {
  const date = new Date(isoDateString);

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const parsePermissionModule = (permissions: string[]) => {
  const moduleSet = new Set();

  for (const perm of permissions) {
    const [module] = perm.split(".");
    if (module) {
      moduleSet.add(module);
    }

    console.log(moduleSet);
  }
};

export const userDataCondition: Record<
  "name",
  {
    description: string;
    checkFunc: (...args: unknown[]) => boolean;
  }[]
> = {
  name: [
    {
      description: "使用者名稱不能為空",
      checkFunc: (...args: unknown[]) => {
        const name = args[0] as string;
        if (typeof name !== "string") return false;
        return name.trim() !== "";
      },
    },
    {
      description: "使用者名稱必須為 1 到 10 個字元",
      checkFunc: (...args: unknown[]) => {
        const name = args[0] as string;
        if (typeof name !== "string") return false;
        const length = name.length;
        return length > 0 && length <= 10;
      },
    },
    {
      description: "使用者名稱不能包含空格",
      checkFunc: (...args: unknown[]) => {
        const name = args[0] as string;
        if (typeof name !== "string") return false;
        return !/\s/.test(name);
      },
    },
  ],
};

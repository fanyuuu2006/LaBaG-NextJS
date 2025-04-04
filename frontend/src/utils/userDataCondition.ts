import { authUser } from "@/types/user";

export const userDataCondition: Record<
  keyof Omit<authUser, "id">,
  {
    description: string;
    checkFunc: (args: { [key: string]: unknown }) => boolean;
  }[]
> = {
  name: [
    {
      description: "使用者名稱不能為空",
      checkFunc: ({ name }) => {
        if (typeof name !== "string") return false;
        return name.trim() !== "";
      },
    },
    {
      description: "使用者名稱必須為 1 到 10 個字元",
      checkFunc: ({ name }) => {
        if (typeof name !== "string") return false;
        const length = name.length;
        return length > 0 && length <= 10;
      },
    },
    {
      description: "使用者名稱不能包含空格",
      checkFunc: ({ name }) => {
        if (typeof name !== "string") return false;
        return !/\s/.test(name);
      },
    },
  ],
  email: [],
  image: []
};

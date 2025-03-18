export const CommitScore = async (Name: string | null, Score: number) => {
  if (Name && Score) {
    try {
      const response = await fetch("/api/CommitScore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name, Score }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error("無法提交分數:", error);
    }
  }
};

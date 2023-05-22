export const formatRole = (role: string) => {
  let newRole = "";
  if (role) {
    const tempRole = role.split("-");
    newRole = `${tempRole[0]} ${tempRole[1]}`;
  }
  return newRole;
};

export const swapper = (val: string) => {
  const words = val?.split(/(?=[A-Z])/);
  return words?.join(" ");
};

export const boolFormatter = (val: boolean) => (val ? "Yes" : "No");

export const formatRole = (role) => {
    let newRole = "";
    if (role) {
        const tempRole = role.split("-");
        newRole = `${tempRole[0]} ${tempRole[1]}`;
    }
    return newRole;
};
export const swapper = (val) => {
    const words = val?.split(/(?=[A-Z])/);
    return words?.join(" ");
};
export const boolFormatter = (val) => (val ? "Yes" : "No");

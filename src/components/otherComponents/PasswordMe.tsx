interface Props {
  showPassword: boolean;
  setShowPassword: (password: boolean) => void;
}
const PasswordMe = (props: Props) => {
  const { showPassword, setShowPassword } = props;
  return (
    <div onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? (
        <div className="icon solid text-blue-2" />
      ) : (
        <div className="icon solid text-blue-2" />
      )}
    </div>
  );
};

export default PasswordMe;

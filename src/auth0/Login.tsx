import classNames from "classnames/bind";
import styles from "./auth0.module.scss";
import { useAuth0 } from "@auth0/auth0-react";
const cx = classNames.bind(styles);
interface LoginProps {
  primary?: string;
  secondary?: string;
}
function Login({ primary, secondary }: LoginProps) {
  const { loginWithRedirect } = useAuth0();
  const classes = cx({ primary: primary, secondary: secondary });
  return (
    <button onClick={() => loginWithRedirect()} className={classes}>
      Đăng nhập
    </button>
  );
}

export default Login;

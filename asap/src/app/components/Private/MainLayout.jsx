import useSettings from "../../hooks/useSettings";
import { MatxLayouts } from "./index";

const MainLayout = (props) => {
  const { settings } = useSettings();
  const ActiveLayout = MatxLayouts[settings.activeLayout];

  return <ActiveLayout {...props} />;
};

export default MainLayout;

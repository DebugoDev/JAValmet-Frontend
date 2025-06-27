// src/pages/settings/index.tsx
import style from "./style.module.css";
import SettingsCard from "./components/SettingsCard";

const SettingsPage = () => {
  return (
    <main className={style.center}>
      <SettingsCard />
    </main>
  );
};

export default SettingsPage;

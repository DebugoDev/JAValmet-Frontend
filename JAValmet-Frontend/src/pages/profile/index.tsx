import UserProfileCard from "./components/login-card"; // ou renomeie para user-profile-card.tsx
import style from "./style.module.css";

const ProfilePage = () => {
    return (
        <main className={style.center}>
            <UserProfileCard />
        </main>
    );
};

export default ProfilePage;

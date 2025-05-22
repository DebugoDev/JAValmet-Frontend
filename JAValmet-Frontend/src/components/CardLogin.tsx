interface CardProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg px-8 py-10 w-[90%] max-w-md">
      {children}
    </div>
  );
};

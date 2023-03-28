const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-zinc-900 text-white p-4 rounded-md shadow-lg'>
      {children}
    </div>
  );
};

export default Card;

import { useNavigate } from '@tanstack/react-router';

const ScreenTwo = () => {
  const navigate = useNavigate();
  const handleSelect = () => {
    // Navigate to the /edit route, passing the product id as a query parameter (or use state)
    navigate({ to: '/' });
  };
  return (
    <>
      <h1>Screen Two</h1>
      <button onClick={handleSelect}>Return</button>
    </>
  );
};

export default ScreenTwo;

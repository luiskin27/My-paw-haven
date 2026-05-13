import { useSelector } from 'react-redux';

export const useAnimals = () => {
  const { animals, loading, error } = useSelector((state) => state.animals);
  return { animals, loading, error };
};
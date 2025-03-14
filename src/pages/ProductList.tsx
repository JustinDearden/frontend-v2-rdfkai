import { useCreateApplication } from '../hooks/useCreateApplication';
import { useNavigate } from '@tanstack/react-router';

interface Product {
  id: number;
  name: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const createApplicationMutation = useCreateApplication();
  const navigate = useNavigate();

  const handleSelectProduct = async (productId: number) => {
    try {
      const newApplication = await createApplicationMutation.mutateAsync({
        productId,
      });
      navigate({ to: `/edit/${newApplication.id}` });
    } catch (error) {
      console.error('Error creating application:', error);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <button onClick={() => handleSelectProduct(product.id)}>
              {product.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

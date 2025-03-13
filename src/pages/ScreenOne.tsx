// src/pages/ScreenOne.tsx
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';
import { useProducts } from '../hooks/useProduct';

const ScreenOne = () => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useProducts();

  if (isLoading) {
    return <div>{t('loading')}...</div>;
  }

  if (error) {
    return <div>{t('errorLoadingData')}</div>;
  }

  // Transform API products into the MortgageProduct format expected by Card
  const mappedProducts = data!.map((product) => {
    const mappedType: 'Fixed' | 'Variable' =
      product.type === 'FIXED' ? 'Fixed' : 'Variable';
    return {
      id: product.id.toString(),
      type: mappedType,
      productName: product.name,
      bestRate: product.bestRate,
      bestLender: product.lenderName,
    };
  });

  // Split products by type
  const fixedProducts = mappedProducts.filter((p) => p.type === 'Fixed');
  const variableProducts = mappedProducts.filter((p) => p.type === 'Variable');

  // Find the best (lowest bestRate) for each type if available
  const bestFixed =
    fixedProducts.length > 0 &&
    fixedProducts.reduce((prev, curr) =>
      prev.bestRate < curr.bestRate ? prev : curr,
    );
  const bestVariable =
    variableProducts.length > 0 &&
    variableProducts.reduce((prev, curr) =>
      prev.bestRate < curr.bestRate ? prev : curr,
    );

  // Filter out the best product from the remaining list for each type
  const remainingFixed = bestFixed
    ? fixedProducts.filter((p) => p.id !== bestFixed.id)
    : [];
  const remainingVariable = bestVariable
    ? variableProducts.filter((p) => p.id !== bestVariable.id)
    : [];

  return (
    <div>
      <h1>Screen One</h1>
      <h1>{t('selectProduct')}</h1>

      {/* Fixed Products Section */}
      <div className="product-section">
        <h2>Fixed</h2>
        {bestFixed && <Card product={bestFixed} />}
        {remainingFixed.length > 0 && (
          <ul>
            {remainingFixed.map((product) => (
              <li key={product.id}>
                <Card product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Variable Products Section */}
      <div className="product-section">
        <h2>Variable</h2>
        {bestVariable && <Card product={bestVariable} />}
        {remainingVariable.length > 0 && (
          <ul>
            {remainingVariable.map((product) => (
              <li key={product.id}>
                <Card product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ScreenOne;

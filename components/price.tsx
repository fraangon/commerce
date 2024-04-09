// eslint-disable-next-line no-unused-vars
const pasrseCurrencyWithLocalConfig = (amount: string, currencyCode: string) => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol'
  }).format(parseFloat(amount));
};

const pasrseCurrency = (amount: string) => {
  return `$${amount.split('.')[0]}`;
};

const Price = ({
  amount,
  currencyCode = 'USD'
}: {
  amount: string;
  currencyCode: string;
} & React.ComponentProps<'p'>) => (
  <span suppressHydrationWarning={true}>{`${pasrseCurrency(amount)} ${currencyCode}`}</span>
);

export default Price;

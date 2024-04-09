import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div className="flex w-full items-center justify-between text-[14px] font-medium leading-none tracking-tight text-brand-900">
      <h3>{title}</h3>
      <Price amount={amount} currencyCode={currencyCode} />
    </div>
  );
};

export default Label;

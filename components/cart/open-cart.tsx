export default function OpenCart({ quantity }: { quantity?: number }) {
  return <span>Carrito {quantity ? <span>({quantity})</span> : null}</span>;
}

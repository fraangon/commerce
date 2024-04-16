import Link from 'next/link';

const EMAIL_ADRESS = 'keyframear@gmail.com';

const Email = () => (
  <Link href={`mailto:${EMAIL_ADRESS}`} className="font-semibold transition-all hover:opacity-80">
    {EMAIL_ADRESS}
  </Link>
);

export const FAQ = [
  {
    question: '¿Cómo puedo contactarlos?',
    answer: (
      <>
        Si tenés algún problema o duda con respecto a tu compra, podés escribirnos a nuestro correo
        electrónico {<Email />}. Para cualquier otra consulta, estamos también en redes sociales.
      </>
    )
  },
  {
    question: '¿Dónde estamos ubicados?',
    answer:
      'Somos de Buenos Aires, Argentina. La venta es exclusivamente online, pero organizamos eventos Pop-Up en distintos puntos de Buenos Aires cada mes.'
  },
  {
    question: '¿Cómo puedo comprar?',
    answer:
      'Para comprar, elegí el producto que te interesa, seleccioná la cantidad y el talle, y agregalo al carrito. Después podés finalizar la compra desde el mismo carrito.'
  },
  {
    question: '¿Cómo puedo hacer un cambio?',
    answer: (
      <>
        Si necesitás hacer un cambio, escribinos a nuestro correo electrónico {<Email />} con tu
        número de orden y el producto que querés cambiar. No tenemos mucho stock, así que no podemos
        asegurar el cambio por el mismo artículo, pero vamos a hacer todo lo posible para que
        termines contento. Todos los costos de envío los tiene que cubrir el cliente, a menos que el
        producto esté defectuoso, caso en el que nos hacemos cargo nosotros. No aceptamos
        devoluciones ni reembolsos.
      </>
    )
  },
  {
    question: '¿Cuánto tarda en llegar mi pedido?',
    answer: (
      <>
        El tiempo de entrega depende del servicio de correo que usamos. Generalmente, los envíos en
        Argentina tardan entre 3 y 9 días hábiles. Para envíos internacionales, varía según el país.
        No podemos asegurar una fecha exacta de entrega, pero te vamos a mantener al tanto. Si tenés
        dudas sobre tu pedido, podés contactarnos en cualquier momento a nuestro correo electrónico{' '}
        {<Email />}.
      </>
    )
  }
];

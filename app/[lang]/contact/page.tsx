import Footer from 'components/layout/footer';
import { FAQ } from 'lib/constants/faq';

export default function ContactPage({ params: { lang } }: { params: { lang: Location } }) {
  return (
    <>
      <div className="flex w-full flex-col gap-8 overflow-x-auto px-4 pb-20 pt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-brand-900">
          Preguntas Frecuentes
        </h2>
        <ul className="flex w-full flex-col gap-6">
          {FAQ.map(({ question, answer }) => (
            <li key={question} className="flex w-full flex-col gap-4">
              <h3 className="text-1xl font-semibold text-brand-900/90">{question}</h3>
              <p className="text-brand-900/80">{answer}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer lang={lang as any} />
    </>
  );
}

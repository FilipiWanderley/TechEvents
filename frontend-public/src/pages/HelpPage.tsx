import { useState } from 'react';

export function HelpPage() {
  const faqs = [
    {
      question: "Como criar um evento?",
      answer: "Para criar um evento, clique no botão 'Organizar' no menu superior. Você será redirecionado para o painel administrativo, onde poderá gerenciar todos os detalhes do seu evento."
    },
    {
      question: "Como recuperar senha?",
      answer: "Na tela de login, clique em 'Esqueci minha senha'. Enviaremos um link de recuperação para o seu e-mail cadastrado."
    },
    {
      question: "O evento é gratuito?",
      answer: "A maioria dos eventos listados são gratuitos, mas alguns workshops e conferências podem ter custo. Verifique os detalhes na página de cada evento."
    },
    {
      question: "Posso cancelar minha inscrição?",
      answer: "Sim, você pode cancelar sua inscrição acessando a área 'Meus Eventos' no painel do usuário até 24 horas antes do início do evento."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-160px)] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Central de Ajuda
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Tire suas dúvidas e aproveite ao máximo a plataforma TechEvents.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50"
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`px-6 text-gray-600 bg-gray-50 transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-48 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
        }`}
      >
        {answer}
      </div>
    </div>
  );
}

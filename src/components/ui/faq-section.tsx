import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const frequentlyAskedQuestions = [
  {
    question: "What is elchai pulse?",
    answer:
      "Pulse answers questions about your company out loud. Ask it something the way you would ask a colleague, and it finds the answer in your company's own files and tells you.",
  },
  {
    question: "Does Pulse search the internet?",
    answer:
      "No. Pulse only answers from the files you give it. It has no other source of information about your company.",
  },
  {
    question: "Can I type instead of speaking?",
    answer: "Yes. Speak or type — you get the same answer either way.",
  },
  {
    question: "What kinds of files can Pulse read?",
    answer:
      "PDFs, Word documents, Excel spreadsheets, and plain text. It can also read scanned documents.",
  },
  {
    question: "Do we have to tidy up our files first?",
    answer:
      "No. Point Pulse at your files as they are. Nothing to rewrite, rename, or move.",
  },
  {
    question: "Does Pulse remember what we talked about?",
    answer:
      "Yes. It keeps track within a conversation and can bring back relevant earlier exchanges, so you do not have to explain the situation again.",
  },
  {
    question: "Does Pulse make decisions on its own?",
    answer:
      "No. Pulse prepares the work and a person approves it. When it has something to suggest, it puts it in front of you to accept, change, or ignore. Messages, calendar changes, and company records stay under your team's control.",
  },
  {
    question: "Who can see our information?",
    answer:
      "Each company gets its own separate space. Your files, conversations, and history are kept apart from every other company using Pulse, and are never combined with anyone else's.",
  },
  {
    question: "Where is our information kept?",
    answer: "Pulse builds its search on your own systems.",
  },
  {
    question: "Who can use Pulse at our company?",
    answer:
      "Only people you approve. Sign-in goes through your company's Google or Microsoft accounts, using a list your company controls.",
  },
] as const;

export function FAQSection() {
  return (
    <section id="faq" className="pulse-faq" aria-labelledby="faq-title">
      <div className="pulse-faq-inner">
        <header className="pulse-faq-heading">
          <p className="pulse-kicker">FAQ</p>
          <h2 id="faq-title">Frequently asked questions</h2>
          <p>Clear answers to the questions teams ask before meeting Pulse.</p>
        </header>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="pulse-faq-accordion"
        >
          {frequentlyAskedQuestions.map(({ question, answer }, index) => (
            <AccordionItem
              value={`item-${index + 1}`}
              key={question}
              className="pulse-faq-item"
            >
              <AccordionTrigger className="pulse-faq-trigger focus-ring">
                {question}
              </AccordionTrigger>
              <AccordionContent className="pulse-faq-answer">
                <p>{answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="pulse-faq-contact">
          Still have a question?{" "}
          <a href="mailto:pulse@elchaigroup.com?subject=Elchai%20Pulse%20question">
            Contact the Pulse team
          </a>
        </p>
      </div>
    </section>
  );
}
